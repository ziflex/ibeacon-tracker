'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

exports['default'] = _mongoose2['default'].model('Beacon', {
    uuid: String,
    major: Number,
    minor: Number,
    name: String,
    subscribers: Array
});
module.exports = exports['default'];