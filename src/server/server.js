import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import passportConfig from './config/passport';
import mongoose from 'mongoose';
import logger from './services/logger';
import router from './router';
import settings from './settings';
import scanner from './services/scanner';
import initializer from './config/initializer';

function connectionString() {
    return 'mongodb://' + settings.database.host + ':' + settings.database.port + '/' + settings.database.name;
}

mongoose.connect(connectionString(), (err) => {
    if (err) {
        logger.error('Failed to connect to database!\n', err.toString());
    }
});

const server = express();
server.use('/', express.static(path.join(__dirname, '/public')));
server.use('/content', express.static(path.join(__dirname, '/public/content')));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(session({
    secret: 'infusion-ibeacon-tracker',
    cookie: {
        maxAge: null
    },
    resave: false,
    saveUninitialized: false
}));
server.use(passport.initialize());
server.use(passport.session());
passportConfig.configure(passport);

server.use(router);

// catch 404 and forward to error handler
server.use('/api/*', (req, res) => {
    res.status(404).end();
});
server.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
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

initializer.initialize(function onInitialization(err) {
    if (!err) {
        scanner.startScanning();
        server.listen(settings.server.port);
        logger.info('Listening on port', settings.server.port);
    } else {
        logger.error(err.toString());
    }
});
