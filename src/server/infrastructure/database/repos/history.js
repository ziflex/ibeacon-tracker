import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import mongoose from 'mongoose';
import RepoMixin from './mixins/repo-mixin';

const HistorySchema = new mongoose.Schema({
    date: { type: Date, index: true },
    name: { type: String, index: true },
    event: String
});

const FIELDS = {
    model: Symbol('model')
};

const HistoryRepository = composeClass({
    mixins: [
        RepoMixin(FIELDS.model)
    ],

    constructor() {
        this[FIELDS.model] = Promise.promisifyAll(
            mongoose.model('History', HistorySchema)
        );
    }
});

export default function create(...args) {
    return new HistoryRepository(...args);
}
