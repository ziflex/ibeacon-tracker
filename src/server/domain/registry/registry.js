import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import EventEmitter from 'eventemitter3';
import ObservableMixin from 'observable-mixin';
import Promise from 'bluebird';
import superagent from 'superagent';
import forEach from 'lodash/forEach';
import map from 'lodash/map';

const FIELDS = {
    logger: Symbol('logger'),
    beaconRepository: Symbol('beaconRepository')
};

const BeaconRegistry = composeClass({
    constructor(logger, beaconRepository) {
        this[FIELDS.logger] = logger;
        this[FIELDS.beaconRepository] = beaconRepository;
    }
});

export default function create(...args) {
    return new BeaconRegistry(...args);
}
