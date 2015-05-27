'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var server = _restify2['default'].createServer({
    name: 'beacon-tracker'
});

new _app2['default']().run().then(function () {
    server.listen(_settings2['default'].port);
    console.info('listenig port:', _settings2['default'].port, '...');
});