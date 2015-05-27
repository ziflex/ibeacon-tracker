import restify from 'restify';

const server = restify.createServer({
    name: 'beacon-tracker'
});

server.listen(8080);
