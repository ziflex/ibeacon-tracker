import isString from 'lodash/lang/isString';
import isNumber from 'lodash/lang/isNumber';
import isEmpty from 'lodash/lang/isEmpty';
import forEach from 'lodash/collection/forEach';
import strings from './strings';

const MIN_MAJ_MIN = 0;
const MAX_MAJ_MIN = 65535;

export default {
    name(value) {
        let result = false;
        let message = null;

        if (isString(value)) {
            result = !isEmpty(value);
        }

        if (!result) {
            message = '`name` is required!';
        }

        return { result, message };
    },

    uuid(value) {
        let result = !isEmpty(value);
        let message = null;
        const uuidLen = 32;

        if (!result) {
            message = '`uuid` is required!';
        } else {
            result = value.length === uuidLen;

            if (!result) {
                message = '`uuid` must contain ${uuidLen} characters';
            }
        }

        return { result, message };
    },

    major(value) {
        let result = false;
        let message = null;

        if (isNumber(value)) {
            result = (value >= MIN_MAJ_MIN && value <= MAX_MAJ_MIN);
        }

        if (!result) {
            message = '`major` is required and must be in range between ${MIN_MAJ_MIN} and ${MAX_MAJ_MIN}';
        }

        return {result, message};
    },

    minor(value) {
        let result = false;
        let message = null;

        if (isNumber(value)) {
            result = (value >= MIN_MAJ_MIN && value <= MAX_MAJ_MIN);
        }

        if (!result) {
            message = '`minor` is required and must be in range between ${MIN_MAJ_MIN} and ${MAX_MAJ_MIN}';
        }

        return {result, message};
    },

    subscriberName(value) {
        return this.name(value);
    },

    subscriberUrl(value) {
        let result = false;
        let message = null;

        if (isString(value)) {
            result = !isEmpty(value);
        }

        if (!result) {
            message = '`url` is required!';
        }

        return { result, message };
    },

    validate(beacon) {
        let result = null;

        forEach(beacon, (value, key) => {
            if (this[key]) {
                let validation = this[key](value);

                if (!validation.result) {
                    if (!result) {
                        result = {};
                    }

                    result[key] = validation.message;
                }
            }
        });

        return result;
    },

    validateSubscriber(subscriber) {
        const prefix = 'subscriber';
        let result = null;

        forEach(subscriber, (value, key) => {
            const methodKey = strings.camelize(prefix, key);

            if (this[methodKey]) {
                let validation = this[methodKey](value);

                if (!validation.result) {
                    if (!result) {
                        result = {};
                    }

                    result[key] = validation.message;
                }
            }
        });

        return result;
    }
};
