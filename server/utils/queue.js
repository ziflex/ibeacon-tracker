import Symbol from 'symbol';
import _ from 'lodash';

const ITEMS = Symbol('ITEMS');

export default class Queue {
    constructor() {
        this[ITEMS] = [];
    }

    enqueue(item) {
        this[ITEMS].push(item);
    }

    dequeue() {
        return this[ITEMS].shift();
    }

    each(func) {
        if (!func) {
            return;
        }

        _.forEach(this[ITEMS], (i) => {
            func(i);
        });

        this[ITEMS] = [];
    }
}
