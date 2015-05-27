import restify from 'restify';
import settings from './settings';
import Application from './app';

const server = restify.createServer({
    name: 'beacon-tracker'
});

new Application().run().then(() => {
    server.listen(settings.port);
    console.info('listenig port:', settings.port, '...');
});
