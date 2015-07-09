'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

var _servicesActivity = require('../services/activity');

var _servicesActivity2 = _interopRequireDefault(_servicesActivity);

var _utilsRoute = require('../utils/route');

var _utilsRoute2 = _interopRequireDefault(_utilsRoute);

var route = '/activity';

function getActivityAll(req, res) {
    _servicesActivity2['default'].findAll(function (items) {
        res.json(items);
    });
}

function getActiveRegistered(req, res) {
    _servicesActivity2['default'].findRegistered(function (items) {
        res.json(items);
    });
}

function getActiveUnregistered(req, res) {
    _servicesActivity2['default'].findUnregistered(function (items) {
        res.json(items);
    });
}

exports['default'] = {
    use: function use(router) {
        router.get(_settings2['default'].server.apiEndpoint + route, _utilsRoute2['default'].isAuthenticated, getActivityAll);
        router.get(_settings2['default'].server.apiEndpoint + route + '/registered', _utilsRoute2['default'].isAuthenticated, getActiveRegistered);
        router.get(_settings2['default'].server.apiEndpoint + route + '/unregistered', _utilsRoute2['default'].isAuthenticated, getActiveUnregistered);
    }
};
module.exports = exports['default'];