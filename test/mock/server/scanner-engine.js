import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import EventEmitter from 'eventemitter3';
import noop from 'lodash/noop';
import uuid from 'uuid';
import random from 'lodash/random';
import { assert } from '../../../src/common/utils/contracts';

const PROXIMITIES = [
    'unknown',
    'immediate',
    'near',
    'far'
];

const FIELDS = {
    onStart: Symbol('onStart'),
    onStop: Symbol('onStop'),
    emitter: Symbol('emitter'),
    isRunning: Symbol('isRunning')
};

const ScannerEngineMock = composeClass({
    mixins: [
        new EventEmitter()
    ],

    constructor(params = {}) {
        this[FIELDS.onStart] = params.onStart || noop;
        this[FIELDS.onStop] = params.onStop || noop;
        this[FIELDS.emitter] = new EventEmitter();
        this[FIELDS.isRunning] = false;
    },

    emitDiscover(id, major, minor) {
        this.emit('discover', {
            uuid: id || uuid.v4(),
            major: major || random(0, 99),
            minor: minor || random(0, 99),
            measuredPower: random(0, 1, true),
            proximity: PROXIMITIES[random(0, PROXIMITIES.length - 1)]
        });
    },

    startScanning() {
        assert('Engine is already running', !this[FIELDS.isRunning]);

        this[FIELDS.isRunning] = true;
        this[FIELDS.onStart]();
    },

    stopScanning() {
        assert('Engine is already stopped', this[FIELDS.isRunning]);

        this[FIELDS.isRunning] = false;
        this[FIELDS.onStop]();
    }
});

export default function create(...args) {
    return new ScannerEngineMock(...args);
}
