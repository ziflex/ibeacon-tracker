'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _symbol = require('symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _eventHub = require('./event-hub');

var _eventHub2 = _interopRequireDefault(_eventHub);

var _enumsTrackingEvents = require('../enums/tracking-events');

var _enumsTrackingEvents2 = _interopRequireDefault(_enumsTrackingEvents);

var _sharedUtilsUuid = require('../shared/utils/uuid');

var _sharedUtilsUuid2 = _interopRequireDefault(_sharedUtilsUuid);

var _utilsTimer = require('../utils/timer');

var _utilsTimer2 = _interopRequireDefault(_utilsTimer);

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

var POOL = (0, _symbol2['default'])('POOL');
var NOTIFY = (0, _symbol2['default'])('NOTIFY');

var TrackingService = (function () {
    function TrackingService() {
        var _this = this;

        _classCallCheck(this, TrackingService);

        this[POOL] = Object.create(null);
        this[NOTIFY] = function (event, data) {
            var func = undefined;

            if (_lodash2['default'].isArray(data)) {
                func = function () {
                    return _lodash2['default'].forEach(data, function (i) {
                        return _eventHub2['default'].emit(event, i);
                    });
                };
            } else {
                func = function () {
                    return _eventHub2['default'].emit(event, data);
                };
            }

            process.nextTick(func);
        };

        _utilsTimer2['default'].setInterval(function () {
            var newPool = Object.create(null);
            var lost = [];
            var timestamp = new Date().getTime();
            var timeout = _settings2['default'].pool.timeout;
            var isLost = function isLost(b) {
                return timestamp - b.lastSeen.getTime() > timeout;
            };

            _lodash2['default'].forEach(_this[POOL], function (beacon) {
                if (isLost(beacon)) {
                    lost.push(beacon);
                } else {
                    newPool[_sharedUtilsUuid2['default'].generate(beacon)] = beacon;
                }
            });

            _this[POOL] = newPool;
            _this[NOTIFY](_enumsTrackingEvents2['default'].LOST, lost);
        }, _settings2['default'].pool.interval || 5000);
    }

    _createClass(TrackingService, [{
        key: 'track',
        value: function track(beacon) {
            var guid = _sharedUtilsUuid2['default'].generate(beacon);
            var found = this[POOL][guid];

            if (!found) {
                beacon.lastSeen = new Date();
                this[POOL][guid] = beacon;
                this[NOTIFY](_enumsTrackingEvents2['default'].FOUND, [beacon]);
            } else {
                found.lastSeen = new Date();
            }
        }
    }, {
        key: 'getList',
        value: function getList() {
            return _lodash2['default'].map(this[POOL], function (i) {
                return _lodash2['default'].clone(i);
            });
        }
    }]);

    return TrackingService;
})();

exports['default'] = new TrackingService();
module.exports = exports['default'];