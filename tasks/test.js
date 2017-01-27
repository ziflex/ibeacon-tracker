import _ from 'lodash';
import path from 'path';

export default function create($, env) {
    return function task(done) {
        const complete = _.once(done);

        $.gulp
            .src(path.join(env.paths.tests, 'unit/**/*.js'), { read: false })
            .pipe($.mocha({ reporter: 'spec' }))
            .once('error', complete)
            .once('end', complete);
    };
}
