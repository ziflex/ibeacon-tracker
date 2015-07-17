'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _configPassport = require('./config/passport');

var _configPassport2 = _interopRequireDefault(_configPassport);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _servicesLogger = require('./services/logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _servicesScanner = require('./services/scanner');

var _servicesScanner2 = _interopRequireDefault(_servicesScanner);

var _configInitializer = require('./config/initializer');

var _configInitializer2 = _interopRequireDefault(_configInitializer);

function connectionString() {
    return 'mongodb://' + _settings2['default'].database.host + ':' + _settings2['default'].database.port + '/' + _settings2['default'].database.name;
}

_mongoose2['default'].connect(connectionString(), function (err) {
    if (err) {
        _servicesLogger2['default'].error('Failed to connect to database!\n', err.toString());
    }
});

var server = (0, _express2['default'])();
server.use('/', _express2['default']['static'](_path2['default'].join(__dirname, '/public')));
server.use('/content', _express2['default']['static'](_path2['default'].join(__dirname, '/public/content')));
server.use(_bodyParser2['default'].json());
server.use(_bodyParser2['default'].urlencoded({ extended: false }));
server.use((0, _cookieParser2['default'])());
server.use((0, _expressSession2['default'])({
    secret: 'infusion-ibeacon-tracker',
    cookie: {
        maxAge: null
    },
    resave: false,
    saveUninitialized: false
}));
server.use(_passport2['default'].initialize());
server.use(_passport2['default'].session());
_configPassport2['default'].configure(_passport2['default']);

server.use(_router2['default']);

// catch 404 and forward to error handler
server.use('/api/*', function (req, res) {
    res.status(404).end();
});
server.use('/*', function (req, res) {
    res.sendFile(_path2['default'].join(__dirname, '/public/index.html'));
});

// error handlers

// development error handler
// will print stacktrace
if (server.get('env') === 'development') {
    server.use(function ErrorHandler(err, req, res) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
server.use(function ErrorHandler(err, req, res) {
    res.status(err.status || 500).end();
});

_configInitializer2['default'].initialize(function onInitialization(err) {
    if (!err) {
        _servicesScanner2['default'].startScanning();
        server.listen(_settings2['default'].server.port);
        _servicesLogger2['default'].info('Listening on port', _settings2['default'].server.port);
    } else {
        _servicesLogger2['default'].error(err.toString());
    }
});