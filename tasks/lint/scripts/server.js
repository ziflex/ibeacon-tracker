export default function factory($, env) {
    return function task() {
        return $.gulp.src([env.paths.input.scripts.server + '/**/*.js'])
            .pipe($.eslint())
            .pipe($.eslint.format('stylish'))
            .pipe($.eslint.failAfterError());
    };
}
