export default function factory($, env) {
    return function task() {
        return $.gulp.src(env.paths.input.client.styles + '/**/*.less')
            .pipe($.if(env.build.debug, $.sourcemaps.init()))
            .pipe($.lessImport('app.less'))
            .pipe($.less())
            .pipe($.if(env.build.minify, $.minifyCss()))
            .pipe($.autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe($.if(env.build.debug, $.sourcemaps.write()))
            .pipe($.gulp.dest(env.paths.output.client.styles));
    };
}
