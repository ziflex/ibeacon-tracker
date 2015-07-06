import PrettyStream from 'bunyan-prettystream';

const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

export default {
    name: 'ibeacon-tracker',
    server: {
        port: 8080,
        apiEndpoint: '/api'
    },
    database: {
        host: 'localhost',
        port: 27017,
        name: 'ibeacon-tracker'
    },
    pool: {
        timeout: 10000,
        interval: 10000
    },
    logger: {
        streams: [
            {
                level: 'info',
                stream: prettyStdOut            // log INFO and above to stdout
            },
            {
                level: 'error',
                path: '/var/tmp/ibeacon-tracker.log'  // log ERROR and above to a file
            }
        ]
    }
};
