/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import runSequence from 'run-sequence';
import loadPlugins from 'gulp-load-plugins';
import registerTasks from 'gulp-tasks-registrator';
import Env from 'env-manager';

const $ = loadPlugins({
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
        'mochify'
    ],
    replaceString: /^gulp(-|\.)/,
    rename: {
        'merge-stream': 'mergeStream',
        del: 'delete',
        'gulp-cssnano': 'cssnano'
    }
});

const env = Env({
    argv: process.argv,
    dir: path.join(__dirname, 'environments'),
    base: 'base.js',
    pattern: '{env}.js',
    defaults: {
        env: 'development'
    }
});

$.util.log($.util.colors.magenta(`Running in ${env.name} environment`));

registerTasks({
    gulp: $.gulp,
    dir: path.join(__dirname, 'tasks'),
    args: [$, env],
    verbose: true,
    panic: true,
    group: true
});

$.gulp.task('clean', ['clean:server', 'clean:client'], (done) => {
    done();
});

$.gulp.task('validate', (done) => {
    return runSequence(
        'validate:run',
        done
    );
});

$.gulp.task('build', (done) => {
    return runSequence(
        'lint',
        'clean',
        'build:server',
        'build:client:images',
        'build:client:fonts',
        [
            'build:client:scripts',
            'build:client:styles'
        ],
        'build:client:html',
        done
    );
});

$.gulp.task('default', (done) => {
    runSequence('build', ['serve', 'watch'], done);
});
