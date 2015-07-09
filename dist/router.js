'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var router = _express2['default'].Router();
var normalizedPath = _path2['default'].join(__dirname, 'routes');

_fs2['default'].readdirSync(normalizedPath).forEach(function (file) {
    var route = require('./routes/' + file);

    if (route.use) {
        route.use(router);
    }
});

exports['default'] = router;
module.exports = exports['default'];