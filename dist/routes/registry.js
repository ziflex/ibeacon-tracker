'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _piperline = require('piperline');

var _piperline2 = _interopRequireDefault(_piperline);

var _servicesEventHub = require('../services/event-hub');

var _servicesEventHub2 = _interopRequireDefault(_servicesEventHub);

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

var _utilsRoute = require('../utils/route');

var _utilsRoute2 = _interopRequireDefault(_utilsRoute);

var _modelsBeacon = require('../models/beacon');

var _modelsBeacon2 = _interopRequireDefault(_modelsBeacon);

var _enumsRegistryEvents = require('../enums/registry-events');

var _enumsRegistryEvents2 = _interopRequireDefault(_enumsRegistryEvents);

var _utilsRoute3 = _interopRequireDefault(_utilsRoute);

var _sharedUtilsValidator = require('../shared/utils/validator');

var _sharedUtilsValidator2 = _interopRequireDefault(_sharedUtilsValidator);

var route = '/registry';

function notify() {
    _servicesEventHub2['default'].emit(_enumsRegistryEvents2['default'].CHANGED);
}

function toPlainObject() {
    var entry = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return {
        id: entry._id,
        name: entry.name,
        uuid: entry.uuid,
        major: entry.major,
        minor: entry.minor,
        subscribers: entry.subscribers || []
    };
}

function getRegistry(req, res) {
    _modelsBeacon2['default'].find({}, function (err, data) {
        if (!err) {
            res.json(_lodash2['default'].map(data || [], toPlainObject));
        } else {
            _utilsRoute2['default'].error(res, err);
        }
    });
}

function saveRegistry(req, res) {
    _piperline2['default'].create().pipe(function validate(entry, next, done) {
        // validation
        if (!entry) {
            return done({ success: false, data: 'Missed parameters' });
        }

        var validation = _sharedUtilsValidator2['default'].validate(entry);

        if (validation) {
            return done({ success: false, data: validation });
        }

        if (!entry.id) {
            return _modelsBeacon2['default'].findOne({
                uuid: entry.uuid,
                major: entry.major,
                minor: entry.minor
            }, function (err, found) {
                if (!err) {
                    if (found) {
                        return done({ success: true, data: 'Beacon is not unique!' });
                    }

                    return next(entry);
                }

                return done(err);
            });
        }

        return next(entry);
    }).pipe(function update(entry, next, done) {
        // update
        if (entry.id) {
            return _modelsBeacon2['default'].update({ _id: entry.id }, _lodash2['default'].omit(entry, 'id'), function (err) {
                if (!err) {
                    return done({ success: true, data: entry });
                }

                return done(err);
            });
        }

        next(entry);
    }).pipe(function create(entry, next, done) {
        // creation
        _modelsBeacon2['default'].create(entry, function (err, data) {
            if (!err) {
                return next({ success: true, data: toPlainObject(data) });
            }

            done(err);
        });
    }).on('error', function (err) {
        _utilsRoute2['default'].error(res, err);
    }).on('done', function (result) {
        if (result.success) {
            if (result.data) {
                return res.json(result.data);
            }

            return _utilsRoute2['default'].ok(res);
        }

        return _utilsRoute2['default'].bad(res, JSON.stringify(result.data));
    }).run(req.body);
}

function deleteRegistry(req, res) {
    if (req.body) {
        _modelsBeacon2['default'].remove({ _id: req.body.id }, function (err) {
            if (!err) {
                notify();
                _utilsRoute2['default'].ok(res);
            } else {
                _utilsRoute2['default'].error(res, err);
            }
        });
    } else {
        _utilsRoute2['default'].bad(res, 'Missed id');
    }
}

exports['default'] = {
    use: function use(router) {
        router.get(_settings2['default'].server.apiEndpoint + route, _utilsRoute3['default'].isAuthenticated, getRegistry);

        router.post(_settings2['default'].server.apiEndpoint + route, _utilsRoute3['default'].isAuthenticated, saveRegistry);

        router['delete'](_settings2['default'].server.apiEndpoint + route, _utilsRoute3['default'].isAuthenticated, deleteRegistry);
    }
};
module.exports = exports['default'];