'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _noble = require('noble');

var _noble2 = _interopRequireDefault(_noble);

var _symbol = require('symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodashNode = require('lodash-node');

var _lodashNode2 = _interopRequireDefault(_lodashNode);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _modelsBeacon = require('./models/beacon');

var _modelsBeacon2 = _interopRequireDefault(_modelsBeacon);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _servicesNotification = require('./services/notification');

var _servicesNotification2 = _interopRequireDefault(_servicesNotification);

var nobleStates = {
    UNKNOWN: 'unknown',
    RESETTING: 'resetting',
    UNSUPPORTED: 'unsupported',
    UNAUTHORIZED: 'unauthorized',
    POWERED_OFF: 'poweredOff',
    POWERED_ON: 'poweredOn'
};
var IS_RUNNING = (0, _symbol2['default'])('IS_RUNNING');
var ON_DISCOVER = (0, _symbol2['default'])('ON_DISCOVER');
var BEACONS = (0, _symbol2['default'])('BEACONS');
var INIT_NOBLE = (0, _symbol2['default'])('INIT_NOBLE');
var FIND_ALL_BEACONS = (0, _symbol2['default'])('FIND_ALL_BEACONS');

var Application = (function () {
    function Application() {
        var _this = this;

        _classCallCheck(this, Application);

        this[IS_RUNNING] = false;
        this[BEACONS] = {};
        this[ON_DISCOVER] = function (peripheral) {
            _servicesNotification2['default'].notify(peripheral);
        };
        this[INIT_NOBLE] = function () {
            return new _bluebird2['default'](function (resolve) {
                _noble2['default'].on('discover', _this[ON_DISCOVER]);

                if (_noble2['default'].state === nobleStates.POWERED_ON) {
                    _noble2['default'].startScanning();
                    resolve();
                } else {
                    (function () {
                        var onStateChange = function onStateChange(state) {
                            if (state === nobleStates.POWERED_ON) {
                                _noble2['default'].startScanning();
                                _noble2['default'].removeListener('stateChange', onStateChange);
                                resolve();
                            }
                        };

                        _noble2['default'].on('stateChange', onStateChange);
                    })();
                }
            });
        };
        this[FIND_ALL_BEACONS] = function () {
            return new _bluebird2['default'](function (resolve, reject) {
                _modelsBeacon2['default'].find({}, function (err, beacons) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(beacons);
                });
            });
        };
    }

    _createClass(Application, [{
        key: 'run',
        value: function run() {
            var _this2 = this;

            if (this.isRunning) {
                throw new Error('Survice is already running');
            }

            this[IS_RUNNING] = true;

            _mongoose2['default'].connect(_settings2['default'].database);

            return this[FIND_ALL_BEACONS]().then(function (beacons) {
                _this2[BEACONS] = {};

                _lodashNode2['default'].forEach(beacons, function (b) {
                    _this2[BEACONS][_utils2['default'].generateGuid(b)] = b;
                });

                return _this2[INIT_NOBLE]();
            });
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (!this.isRunning) {
                throw new Error('Survice is already stopped');
            }

            _mongoose2['default'].disconnect();
            _noble2['default'].stopScanning();
            _noble2['default'].removeListener('discover', this[ON_DISCOVER]);
            this[IS_RUNNING] = false;
        }
    }]);

    return Application;
})();

exports['default'] = Application;
module.exports = exports['default'];