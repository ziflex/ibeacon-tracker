import path from 'path';
import runSequence from 'run-sequence';
import plugins from 'gulp-load-plugins';
import tasks from 'gulp-tasks-registrator';
import getEnv from 'env-manager';

const $ = plugins({
    pattern: [
        'gulp',
        'gulp-*',
        'gulp.*',
        'merge-stream',
        'del',
        'browserify',
        'watchify',
        'vinyl-source-stream',
        'vinyl-transform',
        'vinyl-buffer',
        'glob',
        'lodash',
        'less-plugin-*'
    ],
    replaceString: /^gulp(-|\.)/,
    rename: {
        'merge-stream': 'mergeStream',
        'del': 'delete'
    }
});

const env = getEnv({
    argv: process.argv,
    dir: path.join(__dirname, 'environments'),
    base: 'base.js',
    pattern: '{env}.js',
    defaults: {
        'env': 'dev'
    }
});

tasks({
    gulp: $.gulp,
    dir: path.join(__dirname, 'tasks'),
    args: [$, env],
    verbose: true,
    panic: true
});

$.gulp.task('clean', function task(done) {
    return runSequence('clean:scripts:client', 'clean:scripts:shared', 'clean:scripts:server', 'clean:styles', 'clean:html', done);
});

$.gulp.task('lint', ['lint:scripts:shared', 'lint:scripts:client', 'lint:scripts:server'], function task(done) {
    done();
});

$.gulp.task('build', function task(done) {
    return runSequence(
        'lint',
        'clean',
        [
            'build:scripts:server',
            'build:scripts:shared',
            'build:scripts:client',
            'build:styles'
        ],
        'build:html',
        done
    );
});

$.gulp.task('doc', function task(done) {
    return runSequence('clean:doc', 'build:doc', done);
});

$.gulp.task('doc:watch', function task() {
    if (env.build.watch) {
        $.gulp.watch(env.paths.input.scripts.server + '/**/*.js', ['build:doc']);
        $.gulp.watch(env.paths.input.scripts.client + '/**/*.js', ['build:doc']);
        $.gulp.watch(env.paths.input.scripts.shared + '/**/*.js', ['build:doc']);
    }
});

$.gulp.task('doc:serve', ['doc', 'doc:watch'], function task() {
    $.gulp.src(env.paths.doc)
        .pipe($.webserver({
            livereload: true,
            port: 8888,
            open: '/index.html'
        }));
});

$.gulp.task('deploy:commit', function task(done) {
    $.exec('slc build --install --scripts --bundle --commit', function onExec(err) {
        done(err);
    });
});

$.gulp.task('deploy:pack', function task(done) {
    $.exec('slc build --install --scripts --bundle --pack', function onExec(err) {
        done(err);
    });
});

$.gulp.task('deploy', function task(done) {
    return runSequence('deploy:pack', 'deploy:commit', done);
});

$.gulp.task('watch', function task() {
    if (env.build.watch) {
        $.gulp.watch(env.paths.input.scripts.server + '/**/*.js', ['build:scripts:server']);
        $.gulp.watch(env.paths.input.styles + '/**/*.less', ['build:styles']);
        $.gulp.watch(env.paths.input.html + '/**/*.html', ['build:html']);
    }
});

$.gulp.task('serve', function task() {
    process.NOBLE_REPORT_ALL_HCI_EVENTS = 1;
    return $.nodemon({
        script: env.paths.output.scripts.server + '/server.js'
    });
});

$.gulp.task('default', function task(done) {
    runSequence('build', ['serve', 'watch'], done);
});
