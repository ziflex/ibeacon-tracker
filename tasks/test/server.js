export default function factory($, env) {
    return function task() {
        return $.gulp.src(env.paths.test.server)
                .pipe($.mocha())
                .once('error', () => {
                    process.exit(1);
                })
                .once('end', () => {
                    process.exit();
                });
    };
}
