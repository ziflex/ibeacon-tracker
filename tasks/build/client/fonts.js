import path from 'path';
import _ from 'lodash';

export default function factory($, env) {
    return function task(done) {
        if (!env.paths.input.client.fonts) {
            done();
            return;
        }

        const src = _.map(env.paths.input.client.fonts, i => path.join(i, '/**/*.*'));

        $.gulp.src(src)
            .pipe($.gulp.dest(env.paths.output.client.fonts))
            .on('error', err => done(err))
            .on('finish', () => done());
    };
}
