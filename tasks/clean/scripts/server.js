module.exports = function factory($, env) {
    return function task(done) {
        return $.delete([
            '!' + env.paths.output.scripts.client + '/**/*.js',
            '!' + env.paths.output.scripts.shared + '/**/*.js',
            env.paths.output.scripts.server + '/**/*.js'
        ], done);
    };
};
