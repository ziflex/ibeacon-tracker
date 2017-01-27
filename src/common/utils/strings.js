import camelCase from 'lodash/string/camelCase';
import capitalize from 'lodash/string/capitalize';
import reduce from 'lodash/collection/reduce';

export default {
    camelize(...args) {
        return camelCase(reduce(args, (previous, word) => {
            return previous + capitalize(word);
        }, ''));
    }
};
