import _ from 'lodash';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
const tasks = argv._;
const task = _.first(tasks);
const watch = _.isEmpty(task) || !_.startsWith(task, 'build');

module.exports = {
    name: 'development',
    build: {
        debug: true,
        minify: false
    },
    development: {
        port: 8080,
        watch
    },
    test: {
        singleRun: false
    }
};
