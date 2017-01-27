import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import EventEmitter from 'eventemitter3';
import ObservableMixin from 'observable-mixin';
import Promise from 'bluebird';
import superagent from 'superagent';
import forEach from 'lodash/forEach';
import map from 'lodash/map';

const makeRequest = Promise.method((event, beacon, subscriber) => {
    const method = (subscriber.method || 'get').toLowerCase();
    let request = null;
    const data = {
        event,
        uuid: beacon.uuid,
        major: beacon.major,
        minor: beacon.minor
    };

    if (method === 'post') {
        request = superagent.post(subscriber.url);
    } else {
        request = superagent.get(subscriber.url);
    }

    if (subscriber.headers) {
        forEach(subscriber.headers, (value, name) => {
            request.set(name, value);
        });
    }

    if (subscriber.params) {
        request.query(subscriber.params);
    }

    if (method === 'post') {
        if (subscriber.data) {
            request.send(subscriber.data);
        } else {
            request.send(data);
        }
    } else {
        request.query(data);
    }

    return Promise.fromCallback(done => request.end(done));
});

const FIELDS = {
    logger: Symbol('logger'),
    emitter: Symbol('emitter')
};

const Sender = composeClass({
    mixins: [
        ObservableMixin(FIELDS.emitter)
    ],

    constructor(logger) {
        this[FIELDS.logger] = logger;
        this[FIELDS.emitter] = new EventEmitter();
    },

    notify(event, beacon) {
        if (!beacon || !beacon.subscribers || !beacon.subscribers.length) {
            return Promise.resolve();
        }

        return Promise.some(
            map(beacon.subscribers, sub => makeRequest(event, beacon, sub)),
            1 // at least 1 should be notified
        ).catch(Promise.AggregateError, (err) => {
            forEach(err, (e) => {
                this[FIELDS.logger].error(e);
            });

            return Promise.reject(new Error('Failed to notify subscriber(s)'));
        });
    }
});

export default function create(...args) {
    return new Sender(...args);
}
