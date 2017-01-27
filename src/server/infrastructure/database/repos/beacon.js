import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import mongoose from 'mongoose';
import RepoMixin from './mixins/repo-mixin';

const BeaconSchema = new mongoose.Schema({
    uuid: String,
    major: Number,
    minor: Number,
    name: String,
    subscribers: Array,
    enabled: Boolean
});

BeaconSchema.index({ uuid: 1, major: -1, minor: -1 });

const FIELDS = {
    model: Symbol('model')
};

const BeaconRepository = composeClass({
    mixins: [
        RepoMixin(FIELDS.model)
    ],

    constructor() {
        this[FIELDS.model] = Promise.promisifyAll(
            mongoose.model('Beacon', BeaconSchema)
        );
    }
});

export default function create(...args) {
    return new BeaconRepository(...args);
}
