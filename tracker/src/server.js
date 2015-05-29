import restify from 'restify';
import logger from './services/logger';
import settings from './settings';
import Application from './app';
import router from './router';

const errorHandler = (err, cb) => {
    logger.error(err);
    return cb ? cb() : null;
};
const server = restify.createServer({
    name: settings.name,
    log: logger
});

server.on('uncaughtException', function ServerUncaughtExceptionHandler(req, res, err, cb) {
    return errorHandler(err, cb);
});

process.on('uncaughtException', function ProcessUncaughtExceptionHandler(err) {
    return errorHandler(err, () => {
        process.exit(1);
    });
});

const app = new Application();
app.run();
router.registerRoutes(server);
server.listen(settings.server.port);

logger.info('Listening on port', settings.server.port);
