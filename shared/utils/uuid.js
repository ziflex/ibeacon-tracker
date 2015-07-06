import isString from 'lodash/lang/isString';

export default {
    /*
    * Generates new uuid based on uuid, major and minor numbers.
    */
    generate(beacon) {
        let result = '';

        if (beacon) {
            result += this.normalize(beacon);
            result += beacon.major || 'x';
            result += beacon.minor || 'x';
        }

        return result.toLowerCase();
    },

    /*
    *  Normalizes Beacon's uuid, removing dash characters.
    */
    normalize(beacon) {
        if (!beacon) {
            return '';
        }

        return (beacon.uuid || '').replace(/-/g, '').toLowerCase();
    },

    /*
    * Splits uuid into chunks.
    */
    split(uuid) {
        return uuid
            .match(/^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/i)
            .splice(1);
    },

    /*
    * Join uuid chunks.
    */
    join(values = []) {
        return values.join('');
    },

    /*
    * Formats uuid for ui.
    */
    format(uuid = []) {
        let arr = uuid;

        if (isString(uuid)) {
            arr = this.split(uuid);
        }

        return arr.join('-');
    }
};
