import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import Promise from 'bluebird';
import isFunction from 'lodash/isFunction';
import { requires, assert } from '../../common/utils/contracts';
import Container from './container';

const TYPE_NAME = '[platform]';
const INITIALIZER_TYPE_ERR = `${TYPE_NAME} "initalizer" must be a function`;
const START_ERR = `${TYPE_NAME} Application is already started`;
const CUSTOM_INITIALIZERS = [];

const FIELDS = {
    container: Symbol('container'),
    isRunning: Symbol('isRunning')
};

const Application = composeClass({
    constructor(params) {
        this[FIELDS.container] = Container(params);
        this[FIELDS.isRunning] = false;
    },

    isRunning() {
        return this[FIELDS.isRunning];
    },

    run() {
        return Promise.try(() => {
            assert(START_ERR, !this.isRunning());

            this[FIELDS.isRunning] = true;

            const container = this[FIELDS.container];
            const eventHub = container.getEventHub();
            const manager = container.getInitializetionManager();
            const coreInitializers = container.getAllInitializers();
            const initializers = coreInitializers.concat(CUSTOM_INITIALIZERS);

            eventHub.emit('initialize:begin');

            return manager(this, initializers);
        }).then(() => {
            const container = this[FIELDS.container];
            const eventHub = container.getEventHub();

            eventHub.emit('initialize:complete');

            return container.getServer().run();
        }).then(() => {
            this[FIELDS.container].getEventHub().emit('start');

            return this;
        }).catch((reason) => {
            this[FIELDS.container].getLogger().error(reason);
            this[FIELDS.container].getEventHub().emit('error', reason);
            this[FIELDS.isRunning] = false;

            return Promise.reject(reason);
        });
    }
});

export default {
    create(settings) {
        return new Application(settings);
    },

    initializer(initalizer) {
        requires(TYPE_NAME, 'initalizer', initalizer);
        assert(INITIALIZER_TYPE_ERR, isFunction(initalizer));

        CUSTOM_INITIALIZERS.push(initalizer);

        return this;
    }
};
