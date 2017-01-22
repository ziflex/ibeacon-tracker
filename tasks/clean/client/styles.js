export default function factory($, env) {
    return function task(done) {
        const styles = env.paths.input.client.styles;

        if (!styles || !styles.src) {
            return done();
        }

        return $.delete(env.paths.output.client.styles, done);
    };
}
