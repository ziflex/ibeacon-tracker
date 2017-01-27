import Promise from 'bluebird';
import isNil from 'lodash/isNil';

export function assert(message, condition) {
    if (!condition) {
        throw new Error(message);
    }
}

export function assertAsync(message, condition) {
    if (!condition) {
        return Promise.reject(new Error(message));
    }

    return null;
}

export function requires(name, value) {
    assert(`${name} is required!`, !isNil(value));
}

export function requiresAsync(name, value) {
    return assertAsync(`${name} is required!`, !isNil(value));
}
