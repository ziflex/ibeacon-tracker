export default {
    server: {
        port: 8080
    },
    database: {
        connectionString: 'mongodb://localhost:27017/beacon-tracker'
    },
    pool: {
        timeout: 10000,
        interval: 10000
    }
};
