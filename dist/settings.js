'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bunyanPrettystream = require('bunyan-prettystream');

var _bunyanPrettystream2 = _interopRequireDefault(_bunyanPrettystream);

var prettyStdOut = new _bunyanPrettystream2['default']();
prettyStdOut.pipe(process.stdout);

exports['default'] = {
    name: 'ibeacon-tracker',
    server: {
        port: 8080,
        apiEndpoint: '/api'
    },
    database: {
        host: 'localhost',
        port: 27017,
        name: 'ibeacon-tracker'
    },
    pool: {
        timeout: 10000,
        interval: 10000
    },
    logger: {
        stream: prettyStdOut
    }
};
module.exports = exports['default'];