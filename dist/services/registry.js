'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _symbol = require('symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _eventHub = require('./event-hub');

var _eventHub2 = _interopRequireDefault(_eventHub);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _modelsBeacon = require('../models/beacon');

var _modelsBeacon2 = _interopRequireDefault(_modelsBeacon);

var _sharedUtilsUuid = require('../shared/utils/uuid');

var _sharedUtilsUuid2 = _interopRequireDefault(_sharedUtilsUuid);

var _utilsQueue = require('../utils/queue');

var _utilsQueue2 = _interopRequireDefault(_utilsQueue);

var _enumsRegistryEvents = require('../enums/registry-events');

var _enumsRegistryEvents2 = _interopRequireDefault(_enumsRegistryEvents);

var IS_EMPTY = (0, _symbol2['default'])('IS_EMPTY');
var CACHE = (0, _symbol2['default'])('CACHE');
var QUEUE = (0, _symbol2['default'])('QUEUE');
var IS_UPDATING = (0, _symbol2['default'])('IS_UPDATING');
var ENSURE = (0, _symbol2['default'])('ENSURE');

var RegistryService = (function () {
    function RegistryService() {
        var _this = this;

        _classCallCheck(this, RegistryService);

        this[CACHE] = {};
        this[IS_EMPTY] = true;
        this[QUEUE] = new _utilsQueue2['default']();
        this[IS_UPDATING] = false;
        this[ENSURE] = function (callback) {
            if (callback) {
                if (_this[IS_UPDATING]) {
                    _this[QUEUE].enqueue(callback);
                    return;
                }

                if (_this[IS_EMPTY]) {
                    _this.update(function () {
                        callback();
                    });
                } else {
                    callback();
                }
            }
        };

        _eventHub2['default'].on(_enumsRegistryEvents2['default'].CHANGED, function () {
            _this.update();
        });
    }

    _createClass(RegistryService, [{
        key: 'find',
        value: function find(beacon, callback) {
            var _this2 = this;

            if (!beacon) {
                callback(null);
            }

            this[ENSURE](_lodash2['default'].bind(function (b, cb, sym) {
                var guid = _sharedUtilsUuid2['default'].generate(b);

                cb(_this2[sym][guid]);
            }, this, beacon, callback, CACHE));
        }
    }, {
        key: 'findAll',
        value: function findAll(beacons, callback) {
            var _this3 = this;

            if (!beacons || !beacons.length) {
                callback([]);
                return;
            }

            this[ENSURE](_lodash2['default'].bind(function (b, cb, sym) {
                var result = [];
                _lodash2['default'].forEach(b, function (i) {
                    var guid = _sharedUtilsUuid2['default'].generate(i);
                    var found = _this3[sym][guid];

                    if (found) {
                        result.push(found);
                    }
                });

                cb(result);
            }, this, beacons, callback, CACHE));
        }
    }, {
        key: 'getAll',
        value: function getAll(callback) {
            var _this4 = this;

            this[ENSURE](_lodash2['default'].bind(function (cb, sym) {
                cb(_lodash2['default'].clone(_this4[sym]));
            }, this, callback, CACHE));
        }
    }, {
        key: 'update',
        value: function update(callback) {
            var _this5 = this;

            if (!this[IS_UPDATING]) {
                this[IS_UPDATING] = true;

                _modelsBeacon2['default'].find({}, function (err, data) {
                    var result = null;
                    var isEmpty = true;

                    if (!err) {
                        result = _lodash2['default'].reduce(data, function (res, i) {
                            isEmpty = false;
                            res[_sharedUtilsUuid2['default'].generate(i)] = i;
                            return res;
                        }, {});
                    } else {
                        _logger2['default'].error(err);
                    }

                    _this5[CACHE] = result;
                    _this5[IS_EMPTY] = isEmpty;
                    _this5[IS_UPDATING] = false;
                    _this5[QUEUE].each(function (i) {
                        return i(err, result);
                    });

                    if (callback) {
                        callback(err, result);
                    }
                });
            } else {
                this[QUEUE].enqueue(callback);
            }
        }
    }]);

    return RegistryService;
})();

exports['default'] = new RegistryService();
module.exports = exports['default'];