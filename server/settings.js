export default {
    name: 'beacon-tracker',
    endpoint: 'api',
    server: {
        port: 8080
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
                stream: process.stdout            // log INFO and above to stdout
            },
            {
                level: 'error',
                path: '/var/tmp/beacon-tracker.log'  // log ERROR and above to a file
            }
        ]
    }
};
