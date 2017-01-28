import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';

/**
 *  Normalizes Beacon's guid, removing dash characters.
 */
export function normalize(beacon) {
    if (!beacon) {
        return '';
    }

    return (beacon.guid || '').replace(/-/g, '').toLowerCase();
}

/**
 * Generates new guid based on guid, major and minor numbers.
 */
export function generate(beacon) {
    if (!beacon) {
        return '';
    }

    return `${normalize(beacon)}:${beacon.major}:${beacon.minor}`.toLowerCase();
}

/*
* Splits guid into chunks.
*/
export function split(guid) {
    return !isEmpty(guid) ? guid
        .replace(/-/g, '')
        .match(/^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/i)
        .splice(1) : [];
}

/*
* Join guid chunks.
*/
export function join(values = []) {
    return values.join('');
}

/*
* Formats guid for ui.
*/
export function format(guid = []) {
    let arr = guid;

    if (isString(guid)) {
        arr = this.split(guid);
    }

    return arr.join('-');
}
