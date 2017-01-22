import path from 'path';

export default function factory($, env) {
    return function task() {
        const src = path.join(env.paths.input.server.scripts, '**/*.js');

        return $.gulp
            .src(src)
            .pipe($.if(env.build.debug, $.sourcemaps.init()))
            .pipe($.babel())
            .pipe($.if(env.build.debug, $.sourcemaps.write()))
            .pipe($.gulp.dest(env.paths.output.server.scripts));
    };
}
