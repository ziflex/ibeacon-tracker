export default function factory($, env) {
    return function task() {
        return $.gulp.src(env.paths.input.scripts.shared + '/**/*.js')
            .pipe($.babel())
            .pipe($.gulp.dest(env.paths.output.scripts.shared));
    };
}
