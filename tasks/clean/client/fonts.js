export default function factory($, env) {
    return function task(done) {
        if (!env.paths.input.client.fonts) {
            return done();
        }

        return $.delete([env.paths.output.client.fonts], done);
    };
}
