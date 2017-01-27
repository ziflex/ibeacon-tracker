import path from 'path';

function ErrorHandlerDev(err, req, res) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
}

function ErrorHandler(err, req, res) {
    res.status(err.status || 500).end();
}

export default function create() {
    return function DefaultRoutes(server) {
        // catch 404 and forward to error handler
        server.use('/api/*', (req, res) => {
            res.status(404).end();
        });

        const staticsDir = server.get('statics.directory');
        server.use('/*', (req, res) => {
            res.sendFile(path.join(staticsDir, '/index.html'));
        });

        // error handlers
        // development error handler
        // will print stacktrace
        if (server.get('env') === 'development') {
            server.use(ErrorHandlerDev);
        }

        // production error handler
        // no stacktraces leaked to user
        server.use(ErrorHandler);
    };
}
