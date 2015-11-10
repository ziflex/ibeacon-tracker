module.exports = function($, env) {
    return function(done) {
        return $.delete([env.paths.doc], done);
    };
};