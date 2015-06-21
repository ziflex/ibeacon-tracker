import isString from 'lodash/lang/isString';

export default {
    split(uuid) {
        return uuid
            .match(/^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/i)
            .splice(1);
    },

    join(values = []) {
        return values.join('');
    },

    format(uuid = []) {
        let arr = uuid;

        if (isString(uuid)) {
            arr = this.split(uuid);
        }

        return arr.join('-');
    }
};
