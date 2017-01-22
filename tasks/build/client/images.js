import fs from 'fs.extra';

export default function factory($, env) {
    return function task(done) {
        if (!env.paths.input.client.images) {
            done();
            return;
        }

        fs.copyRecursive(
            env.paths.input.client.images,
            env.paths.output.client.images,
            done
        );
    };
}
