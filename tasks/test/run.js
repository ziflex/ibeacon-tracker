import path from 'path';

export default function factory($, env, extraOptions) {
    const params = extraOptions || {};

    return function task(done) {
        const options = {
            reporter: env.test.report || 'spec',
            watch: params.watch || false,
            debug: params.debug || false,
            recursive: true,
            port: env.test.port
        };

        const src = path.join(env.paths.tests, '/unit/**/*.js');

        $.mochify(src, options)
            .transform('babelify')
            .plugin('mochify-istanbul', {
                // Plugin options
                instrumenter: 'babel-istanbul',
                // Reporter options
                report: env.coverage.report,
                dir: env.paths.coverage
            })
            .on('error', done)
            .on('end', () => done())
            .bundle(); // bundle at the VERY end after listeners
    };
}
