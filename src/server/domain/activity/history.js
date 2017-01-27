import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import EventEmitter from 'eventemitter3';
import ObservableMixin from 'observable-mixin';
import { requires, requiresAsync } from '../../../common/utils/contracts';

const FIELDS = {
    logger: Symbol('logger'),
    repository: Symbol('repository'),
    emitter: Symbol('emitter')
};

const ActivityHistory = composeClass({
    mixins: [
        ObservableMixin(FIELDS.emitter)
    ],

    constructor(logger, repository) {
        requires('logger', logger);
        requires('repository', repository);

        this[FIELDS.logger] = logger;
        this[FIELDS.repository] = repository;
        this[FIELDS.emitter] = new EventEmitter();
    },

    write(entry) {
        let err = requiresAsync('entry', entry);

        if (err) {
            return err;
        }

        err = requiresAsync('entry.beacon', entry.beacon);

        if (err) {
            return err;
        }

        err = requiresAsync('entry.event', entry.event);

        if (err) {
            return err;
        }

        return this[FIELDS.repository]
            .create({
                date: new Date(),
                name: entry.beacon.name,
                event: entry.event
            })
            .tap(() => {
                this[FIELDS.emitter].emit('write');
            });
    }
});

export default function create(...args) {
    return new ActivityHistory(...args);
}
