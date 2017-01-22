import path from 'path';

export default function factory($, env) {
    return function task() {
        return $.nodemon({
            env: { NODE_ENV: env.name },
            script: path.join(env.paths.output.server.scripts, 'index.js'),
            ext: 'js',
            watch: [
                path.join(env.paths.input.server.scripts, '{,**/}*.js'),
                path.join(env.paths.meta, '{,**/}*.json')
            ],
            ignore: [
                path.join(env.paths.root, 'tasks/{,**/}*.*'),
                path.join(env.paths.output.server.scripts, '{,**/}*.*'),
                path.join(env.paths.input.client.scripts, '{,**/}*.*')
            ],
            tasks: [
                'build:server:scripts'
            ]
        });
    };
}
