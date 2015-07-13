'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _utilsRoute = require('../utils/route');

var _utilsRoute2 = _interopRequireDefault(_utilsRoute);

var route = '/auth';

function login(req, res) {
    _utilsRoute2['default'].ok(res);
}

function logout(req, res) {
    req.logout();
    _utilsRoute2['default'].ok(res);
}

exports['default'] = {
    use: function use(router) {
        router.post(_settings2['default'].server.apiEndpoint + route + '/login', _passport2['default'].authenticate('local'), login);
        router.post(_settings2['default'].server.apiEndpoint + route + '/logout', logout);
    }
};
module.exports = exports['default'];