import Path from 'path';
import _ from 'lodash';
import FS from 'fs';
import Console from 'console';
// import remixCli from 'remix-cli';
import Promise from 'bluebird';

const fsPromise = Promise.promisifyAll(FS);

export default function factory($, env, extraOptions) {
    const params = extraOptions || {};

    return function task(done) {
        const options = {
            reporter: env.test.report || 'spec',
            watch: params.watch || false,
            debug: params.debug || false,
            recursive: true,
            port: env.test.port
        };

        const src = env.paths.applications;
        const validated = false;

        fsPromise.readdirAsync(src).then((files) => {
            return Promise.all(_.map(files, (file) => {
                if (!_.isNil(env.application) && file !== env.application) {
                    return Promise.resolve();
                }

                const target = Path.join(src, file);

                return fsPromise.statAsync(target).then((stat) => {
                    if (!stat.isDirectory()) {
                        return;
                    }

                    debugger;

                    return remixCli(['', '', 'validate', '-d', target]);
                });
            }));
        }).catch((err) => {
            if (err) {
                Console.log(err.message);
            }
        }).finally(() => {
            done();
        });
    };
}
