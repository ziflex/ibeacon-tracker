'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _servicesLogger = require('../services/logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

exports['default'] = {
    isAuthenticated: function isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.status(401).end();
    },

    ok: function ok(res) {
        return res.status(200).end();
    },

    bad: function bad(res) {
        var msg = arguments.length <= 1 || arguments[1] === undefined ? 'Bad request' : arguments[1];

        return res.status(400).json({ message: msg });
    },

    error: function error(res, err) {
        _servicesLogger2['default'].error(err);
        return res.status(500).end();
    }
};
module.exports = exports['default'];