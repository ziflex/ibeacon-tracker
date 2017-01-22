import testTaskFactory from './run';

export default function factory($, env) {
    return testTaskFactory($, env, {
        debug: true,
        watch: true
    });
}
