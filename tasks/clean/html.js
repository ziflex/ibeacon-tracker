module.exports = function factory($, env) {
    return function(done) {
        return $.delete([env.paths.output.root + '/*.html', env.paths.output.wwwroot + 'index.html'], done);
    };
};