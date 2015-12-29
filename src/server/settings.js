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
        port: 30251,
        name: 'ibeacon-tracker'
    },
    pool: {
        timeout: 10000,
        interval: 10000
    },
    logger: {
        stream: prettyStdOut
    }
};
