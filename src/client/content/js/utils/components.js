import isArray from 'lodash/lang/isArray';
import isString from 'lodash/lang/isString';
import map from 'lodash/collection/map';
import { Map } from 'immutable';

export default {
    createDropdownList(items, value) {
        const currentValue = value ? value.toLowerCase().trim() : '';
        let collection = items;

        if (!collection.toSeq) {
            if (isArray(collection)) {
                collection = Map(map(collection, i => [i, i]));
            } else {
                collection = Map(collection);
            }
        }

        return collection.toSeq().map((val, key) => {
            const normalized = val.toLowerCase();
            return {
                text: isString(key) ? key.toUpperCase() : val.toUpperCase(),
                value: val.toLowerCase(),
                selected: currentValue === normalized
            };
        }).toList();
    }
};
