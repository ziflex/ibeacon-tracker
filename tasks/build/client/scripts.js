import path from 'path';
import _ from 'lodash';

export default function factory($, env) {
    const customOpts = {
        entries: [path.join(env.paths.input.client.scripts, 'index.js')],
        debug: env.build.debug
    };
    const opts = _.assign({}, _.get($, 'watchify.args'), customOpts);
    let b;

    if (env.development.watch) {
        b = $.watchify($.browserify(opts));
    } else {
        b = $.browserify(opts);
    }

    function bundle() {
        return b
            .bundle()
            .on('error', (err) => {
                $.util.log($.util.colors.red(err.toString()));
                process.exit(1);
            })
            .pipe($.vinylSourceStream('bundle.js'))
            .pipe($.vinylBuffer())
            .pipe($.if(env.build.minify, $.uglify()))
            .pipe($.gulp.dest(env.paths.output.client.scripts));
    }

    b.on('update', bundle); // on any dep update, runs the bundler
    b.on('log', $.util.log); // output build logs to terminal

    return bundle;
}
