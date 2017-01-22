import _ from 'lodash';

_.set(process.env, 'NODE_ENV', 'production');

module.exports = {
    name: 'production',
    build: {
        debug: false,
        minify: true
    },
    test: {
        singleRun: true
    }
};
