'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _registry = require('./registry');

var _registry2 = _interopRequireDefault(_registry);

var _tracker = require('./tracker');

var _tracker2 = _interopRequireDefault(_tracker);

var _sharedUtilsUuid = require('../shared/utils/uuid');

var _sharedUtilsUuid2 = _interopRequireDefault(_sharedUtilsUuid);

var ActivityService = (function () {
    function ActivityService() {
        _classCallCheck(this, ActivityService);
    }

    _createClass(ActivityService, [{
        key: 'findAll',
        value: function findAll(callback) {
            var _this = this;

            // Callback is used to keep consistency throughout the services
            _bluebird2['default'].props({
                registered: new _bluebird2['default'](function (resolve) {
                    return _this.findRegistered(resolve);
                }),
                unregistered: new _bluebird2['default'](function (resolve) {
                    return _this.findUnregistered(resolve);
                })
            }).then(callback);
        }
    }, {
        key: 'findRegistered',
        value: function findRegistered(callback) {
            _registry2['default'].findAll(_tracker2['default'].getList(), function (current) {
                callback(_lodash2['default'].map(current, function (i) {
                    return i.toObject();
                }));
            });
        }
    }, {
        key: 'findUnregistered',
        value: function findUnregistered(callback) {
            _registry2['default'].getAll(function (registered) {
                var result = [];

                _lodash2['default'].forEach(_tracker2['default'].getList(), function (i) {
                    if (!registered[_sharedUtilsUuid2['default'].generate(i)]) {
                        result.push(_lodash2['default'].clone(i));
                    }
                });

                callback(result);
            });
        }
    }]);

    return ActivityService;
})();

exports['default'] = new ActivityService();
module.exports = exports['default'];