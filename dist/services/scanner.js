'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _bleacon = require('bleacon');

var _bleacon2 = _interopRequireDefault(_bleacon);

var _symbol = require('symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _eventHub = require('./event-hub');

var _eventHub2 = _interopRequireDefault(_eventHub);

var _notification = require('./notification');

var _notification2 = _interopRequireDefault(_notification);

var _tracker = require('./tracker');

var _tracker2 = _interopRequireDefault(_tracker);

var _registry = require('./registry');

var _registry2 = _interopRequireDefault(_registry);

var _enumsTrackingEvents = require('../enums/tracking-events');

var _enumsTrackingEvents2 = _interopRequireDefault(_enumsTrackingEvents);

var IS_RUNNING = (0, _symbol2['default'])('IS_RUNNING');
var ON_DISCOVER = (0, _symbol2['default'])('ON_DISCOVER');
var ON_FOUND = (0, _symbol2['default'])('ON_FOUND');
var ON_LOST = (0, _symbol2['default'])('ON_LOST');

var ScanningService = (function () {
    function ScanningService() {
        _classCallCheck(this, ScanningService);

        process.env.NOBLE_REPORT_ALL_HCI_EVENTS = 1;
        this[IS_RUNNING] = false;
        this[ON_DISCOVER] = function (peripheral) {
            process.nextTick(function onDiscover() {
                _tracker2['default'].track(peripheral);
            });
        };
        this[ON_FOUND] = function (beacon) {
            process.nextTick(function onFound() {
                _registry2['default'].find(beacon, function onEntryFound(entry) {
                    if (entry) {
                        _notification2['default'].notify('found', entry);
                    }
                });
            });
        };
        this[ON_LOST] = function (beacon) {
            process.nextTick(function onLost() {
                _registry2['default'].find(beacon, function onEntryFound(entry) {
                    if (entry) {
                        _notification2['default'].notify('lost', entry);
                    }
                });
            });
        };
    }

    _createClass(ScanningService, [{
        key: 'startScanning',
        value: function startScanning() {
            var _this = this;

            if (this[IS_RUNNING]) {
                throw new Error('Service is already running');
            }

            this[IS_RUNNING] = true;

            _registry2['default'].update(function () {
                _eventHub2['default'].on(_enumsTrackingEvents2['default'].FOUND, _this[ON_FOUND]);
                _eventHub2['default'].on(_enumsTrackingEvents2['default'].LOST, _this[ON_LOST]);
                _bleacon2['default'].on('discover', _this[ON_DISCOVER]);
                _bleacon2['default'].startScanning();
            });
        }
    }, {
        key: 'stopScanning',
        value: function stopScanning() {
            if (!this[IS_RUNNING]) {
                throw new Error('Service is already stopped');
            }

            _bleacon2['default'].stopScanning();
            _bleacon2['default'].removeListener('discover', this[ON_DISCOVER]);
            _eventHub2['default'].off(_enumsTrackingEvents2['default'].FOUND, this[ON_FOUND]);
            _eventHub2['default'].off(_enumsTrackingEvents2['default'].LOST, this[ON_LOST]);
            this[IS_RUNNING] = false;
        }
    }]);

    return ScanningService;
})();

exports['default'] = new ScanningService();
module.exports = exports['default'];