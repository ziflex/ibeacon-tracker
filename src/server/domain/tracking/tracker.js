import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import EventEmitter from 'eventemitter3';
import ObservableMixin from 'observable-mixin';
import Interval from 'pinterval';
import isNil from 'lodash/isNil';
import get from 'lodash/get';
import set from 'lodash/set';
import forEach from 'lodash/forEach';
import { Map } from 'immutable';
import { requires, assert } from '../../../common/utils/contracts';
import { generate as Guid } from '../../../common/utils/guid';
import Metadata from '../../../common/models/metadata';

const TYPE_NAME = '[tracker]';
const ERR_START = `${TYPE_NAME} Already started`;
const ERR_STOP = `${TYPE_NAME} Already stopped`;
const ERR_ADD_STOPPED = `${TYPE_NAME} Stopped`;

const FIELDS = {
    logger: Symbol('logger'),
    emitter: Symbol('emitter'),
    items: Symbol('items'),
    settings: Symbol('settings'),
    interval: Symbol('interval'),
    isRunning: Symbol('isRunning')
};

function createItems() {
    return Map();
}

function checkTTL() {
    let newItems = createItems();
    const timestamp = new Date().getTime();
    const ttl = this[FIELDS.settings].ttl;

    const isLost = (item) => {
        return (timestamp - item.lastSeen.getTime()) > ttl;
    };

    forEach(this[FIELDS.items], (metadata) => {
        if (!isLost(metadata)) {
            newItems = newItems.get(metadata.guid, metadata);
        } else {
            this[FIELDS.logger].info('Lost', metadata);
            this[FIELDS.emitter].emit('lost', metadata);
        }
    });

    this[FIELDS.items] = newItems;
}

function createInterval(instance) {
    return Interval({
        func: checkTTL.bind(instance),
        time: instance[FIELDS.settings].interval
    });
}

const Tracker = composeClass({
    mixins: [
        ObservableMixin(FIELDS.emitter)
    ],

    constructor(logger, settings) {
        requires('logger', logger);
        requires('settings', settings);
        requires('settings.ttl', settings.ttl);
        requires('settings.interval', settings.interval);

        this[FIELDS.logger] = logger;
        this[FIELDS.emitter] = new EventEmitter();
        this[FIELDS.settings] = settings;
        this[FIELDS.items] = null;
        this[FIELDS.isRunning] = false;
        this[FIELDS.interval] = createInterval(this);
    },

    isRunning() {
        return this[FIELDS.isRunning];
    },

    settings(key, value) {
        const currentValue = get(this[FIELDS.settings], key);

        if (!value) {
            return currentValue;
        }

        assert(`Invalid settings key: ${key}`, !isNil(currentValue));
        assert(`Invalid settings value: ${typeof value}`, typeof value !== typeof currentValue);

        set(this[FIELDS.settings], key, value);

        // recreate interval with new settings
        this[FIELDS.interval].stop();
        this[FIELDS.interval] = createInterval(this);

        return value;
    },

    items() {
        return this[FIELDS.items];
    },

    start() {
        assert(ERR_START, !this.isRunning());

        this[FIELDS.isRunning] = true;
        this[FIELDS.items] = createItems();
        this[FIELDS.emitter].emit('start');
        this[FIELDS.interval].start();

        return this;
    },

    stop() {
        assert(ERR_STOP, this.isRunning());

        this[FIELDS.isRunning] = false;
        this[FIELDS.emitter].emit('stop');
        this[FIELDS.interval].stop();

        return this;
    },

    add(peripheral) {
        assert(ERR_ADD_STOPPED, this.isRunning());

        const guid = Guid(peripheral);

        if (!this[FIELDS.items].has(guid)) {
            const newItem = Metadata(peripheral);

            this[FIELDS.items] = this[FIELDS.items].set(guid, newItem);

            this[FIELDS.logger].info('Found', newItem);
            this[FIELDS.emitter].emit('found', newItem);
        } else {
            this[FIELDS.items] = this[FIELDS.items].updateIn(guid, (found) => {
                return found.set('lastSeen', new Date());
            });
        }

        return this;
    }
});

export default function create(...args) {
    return new Tracker(...args);
}
