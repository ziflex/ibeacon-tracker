export default function factory($, env) {
    return function task() {
        return $.gulp.src(env.paths.input.scripts.server + '/**/*.js')
            .pipe($.babel())
            .pipe($.gulp.dest(env.paths.output.scripts.server));
    };
}
