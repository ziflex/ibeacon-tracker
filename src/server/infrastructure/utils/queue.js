import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import forEach from 'lodash/forEach';

const ITEMS = Symbol('ITEMS');

const Queue = composeClass({
    constructor() {
        this[ITEMS] = [];
    },

    enqueue(item) {
        this[ITEMS].push(item);
    },

    dequeue() {
        return this[ITEMS].shift();
    },

    each(func) {
        if (!func) {
            return;
        }

        forEach(this[ITEMS], (i) => {
            func(i);
        });

        this[ITEMS] = [];
    }
});

export default function create() {
    return new Queue();
}
