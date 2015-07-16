'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _immutable = require('immutable');

var Enum = (0, _immutable.Record)({
    FOUND: 'beacon:found',
    LOST: 'beacon:lost'
});

exports['default'] = new Enum();
module.exports = exports['default'];