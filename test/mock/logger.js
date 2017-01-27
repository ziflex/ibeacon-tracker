import noop from 'lodash/noop';

export default function create() {
    return {
        info: noop,
        log: noop,
        debug: noop,
        warn: noop,
        error: noop
    };
}
