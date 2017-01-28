import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import EventEmitter from 'eventemitter3';
import ObservableMixin from 'observable-mixin';
import Interval from 'pinterval';
import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import get from 'lodash/get';
import set from 'lodash/set';
import forEach from 'lodash/forEach';
import cloneDeep from 'lodash/cloneDeep';
import gte from 'lodash/gte';
import { requires, assert } from '../../../common/utils/contracts';
import { generate as Guid } from '../../../common/utils/guid';
import Metadata from '../../../common/models/metadata';

const TYPE_NAME = '[tracker]';
const ERR_START = `${TYPE_NAME} Already started`;
const ERR_STOP = `${TYPE_NAME} Already stopped`;
const ERR_TTL_TYPE = `${TYPE_NAME} "ttl" must be a number`;
const ERR_TTL_RANGE = `${TYPE_NAME} "ttl" must be greater or equal to 1000`;
const ERR_INTERVAL_TYPE = `${TYPE_NAME} "interval" must be a number`;
const ERR_INTERVAL_RANGE = `${TYPE_NAME} "interval" must be greater or equal to 1000`;

const FIELDS = {
    logger: Symbol('logger'),
    emitter: Symbol('emitter'),
    items: Symbol('items'),
    settings: Symbol('settings'),
    interval: Symbol('interval'),
    isRunning: Symbol('isRunning')
};

function createItems() {
    return {};
}

function checkTTL() {
    const timestamp = new Date().getTime();
    const ttl = this[FIELDS.settings].ttl;

    const isLost = (item) => {
        return (timestamp - item.lastSeen.getTime()) > ttl;
    };

    const newItems = createItems();

    forEach(this[FIELDS.items], (metadata) => {
        if (!isLost(metadata)) {
            newItems[metadata.guid] = metadata;
        } else {
            this[FIELDS.logger].info('Lost', metadata.guid);
            this[FIELDS.emitter].emit('lost', metadata.guid);
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
        assert(ERR_TTL_TYPE, isNumber(settings.ttl));
        assert(ERR_INTERVAL_TYPE, isNumber(settings.interval));
        assert(ERR_TTL_RANGE, gte(settings.ttl, 1000));
        assert(ERR_INTERVAL_RANGE, gte(settings.interval, 1000));

        this[FIELDS.logger] = logger;
        this[FIELDS.emitter] = new EventEmitter();
        this[FIELDS.settings] = settings;
        this[FIELDS.items] = createItems();
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
        return cloneDeep(this[FIELDS.items]);
    },

    start() {
        assert(ERR_START, !this.isRunning());

        this[FIELDS.isRunning] = true;
        this[FIELDS.emitter].emit('start');
        this[FIELDS.interval].start();

        return this;
    },

    stop() {
        assert(ERR_STOP, this.isRunning());

        this[FIELDS.isRunning] = false;
        this[FIELDS.items] = createItems();
        this[FIELDS.emitter].emit('stop');
        this[FIELDS.interval].stop();

        return this;
    },

    push(peripheral) {
        if (!this.isRunning()) {
            this[FIELDS.logger].warn('Tried to track a peripheral when tracker is stopped');
            return this;
        }

        const guid = Guid(peripheral);
        const found = this[FIELDS.items][guid];

        if (!found) {
            const newItem = Metadata(peripheral);

            this[FIELDS.items][guid] = newItem;

            this[FIELDS.logger].info('Found', guid);
            this[FIELDS.emitter].emit('found', guid);
        } else {
            found.lastSeen = new Date();
        }

        return this;
    }
});

export default function create(...args) {
    return new Tracker(...args);
}
