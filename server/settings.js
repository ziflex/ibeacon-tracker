import PrettyStream from 'bunyan-prettystream';

const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

export default {
    name: 'beacon-tracker',
    server: {
        port: 8080,
        apiEndpoint: '/api'
    },
    database: {
        connectionString: 'mongodb://localhost:27017/beacon-tracker'
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
                path: '/var/tmp/beacon-tracker.log'  // log ERROR and above to a file
            }
        ]
    }
};