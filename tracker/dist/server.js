'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var server = _restify2['default'].createServer({
    name: 'beacon-tracker'
});

server.listen(8080);