'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

var _utilsRoute = require('../utils/route');

var _utilsRoute2 = _interopRequireDefault(_utilsRoute);

var _modelsUser = require('../models/user');

var _modelsUser2 = _interopRequireDefault(_modelsUser);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var route = '/settings';

function changePassword(req, res) {
    if (_lodash2['default'].isEmpty(req.body)) {
        return _utilsRoute2['default'].bad(res);
    }

    var _req$body = req.body;
    var username = _req$body.username;
    var newPassword = _req$body.newPassword;

    if (_lodash2['default'].isEmpty(username) || _lodash2['default'].isEmpty(newPassword)) {
        return _utilsRoute2['default'].bad(res);
    }

    _modelsUser2['default'].findByUsername(username, function (err, user) {
        if (!err) {
            if (user) {
                return user.setPassword(newPassword, function (setPasswordErr) {
                    if (!setPasswordErr) {
                        return user.save(function (saveErr) {
                            if (!saveErr) {
                                return _utilsRoute2['default'].ok(res);
                            }

                            return _utilsRoute2['default'].error(res, saveErr);
                        });
                    }

                    return _utilsRoute2['default'].error(res, setPasswordErr);
                });
            }

            return _utilsRoute2['default'].bad(res, 'Invalid username');
        }

        return _utilsRoute2['default'].error(res, err);
    });
}

exports['default'] = {
    use: function use(router) {
        router.post(_settings2['default'].server.apiEndpoint + route + '/user/password', _utilsRoute2['default'].isAuthenticated, changePassword);
    }
};
module.exports = exports['default'];