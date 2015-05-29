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

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _servicesNotification = require('./services/notification');

var _servicesNotification2 = _interopRequireDefault(_servicesNotification);

var _servicesPool = require('./services/pool');

var _servicesPool2 = _interopRequireDefault(_servicesPool);

var _servicesRegistry = require('./services/registry');

var _servicesRegistry2 = _interopRequireDefault(_servicesRegistry);

var IS_RUNNING = (0, _symbol2['default'])('IS_RUNNING');
var ON_DISCOVER = (0, _symbol2['default'])('ON_DISCOVER');
var ON_FOUND = (0, _symbol2['default'])('ON_FOUND');
var ON_LOST = (0, _symbol2['default'])('ON_LOST');

var Application = (function () {
    function Application() {
        _classCallCheck(this, Application);

        this[IS_RUNNING] = false;
        this[ON_DISCOVER] = function (peripheral) {
            _servicesPool2['default'].add(peripheral);
        };
        this[ON_FOUND] = function (beacon) {
            process.nextTick(function () {
                _servicesRegistry2['default'].find(beacon, function (info) {
                    _servicesNotification2['default'].notify('found', info);
                });
            });
        };
        this[ON_LOST] = function (beacon) {
            process.nextTick(function () {
                _servicesRegistry2['default'].find(beacon, function (info) {
                    _servicesNotification2['default'].notify('lost', info);
                });
            });
        };
    }

    _createClass(Application, [{
        key: 'run',
        value: function run() {
            if (this.isRunning) {
                throw new Error('Survice is already running');
            }

            this[IS_RUNNING] = true;

            _mongoose2['default'].connect(_settings2['default'].database.connectionString);
            _servicesPool2['default'].on('found', this[ON_FOUND]);
            _servicesPool2['default'].on('lost', this[ON_LOST]);
            _bleacon2['default'].on('discover', this[ON_DISCOVER]);
            _bleacon2['default'].startScanning();
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (!this.isRunning) {
                throw new Error('Survice is already stopped');
            }

            _mongoose2['default'].disconnect();
            _bleacon2['default'].stopScanning();
            _bleacon2['default'].removeListener('discover', this[ON_DISCOVER]);
            _servicesPool2['default'].removeListener('found', this[ON_FOUND]);
            _servicesPool2['default'].removeListener('lost', this[ON_LOST]);
            this[IS_RUNNING] = false;
        }
    }]);

    return Application;
})();

exports['default'] = Application;
module.exports = exports['default'];