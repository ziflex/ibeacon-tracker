'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _servicesLogger = require('./services/logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var errorHandler = function errorHandler(err, cb) {
    _servicesLogger2['default'].error(err);
    return cb ? cb() : null;
};
var server = _restify2['default'].createServer({
    name: _settings2['default'].name,
    log: _servicesLogger2['default']
});

server.on('uncaughtException', function ServerUncaughtExceptionHandler(req, res, err, cb) {
    return errorHandler(err, cb);
});

process.on('uncaughtException', function ProcessUncaughtExceptionHandler(err) {
    return errorHandler(err, function () {
        process.exit(1);
    });
});

var app = new _app2['default']();
app.run();
server.listen(_settings2['default'].server.port);

_servicesLogger2['default'].info('Listening on port', _settings2['default'].server.port);