import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import mongoose from 'mongoose';
import RepoMixin from './mixins/repo-mixin';

const SettingsSchema = new mongoose.Schema({
    enabled: Boolean,
    tracking: {
        ttl: Number,
        interval: Number
    }
});

const FIELDS = {
    model: Symbol('model')
};

const BeaconRepository = composeClass({
    mixins: [
        RepoMixin(FIELDS.model)
    ],

    constructor() {
        this[FIELDS.model] = Promise.promisifyAll(
            mongoose.model('Settings', SettingsSchema)
        );
    }
});

export default function create(...args) {
    return new BeaconRepository(...args);
}
