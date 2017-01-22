export default function factory($, env) {
    return function task(done) {
        if (!env.paths.input.client.images) {
            return done();
        }

        return $.delete([env.paths.output.client.images], done);
    };
}
