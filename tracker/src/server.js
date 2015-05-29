import restify from 'restify';
import settings from './settings';
import Application from './app';

const server = restify.createServer({
    name: 'beacon-tracker'
});

const app = new Application();
app.run();

server.listen(settings.server.port);
