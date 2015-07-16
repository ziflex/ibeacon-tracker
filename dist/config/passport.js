'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _modelsUser = require('../models/user');

var _modelsUser2 = _interopRequireDefault(_modelsUser);

exports['default'] = {
    configure: function configure(passport) {
        passport.use(_modelsUser2['default'].createStrategy());
        passport.serializeUser(_modelsUser2['default'].serializeUser());
        passport.deserializeUser(_modelsUser2['default'].deserializeUser());
    }
};
module.exports = exports['default'];