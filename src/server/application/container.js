import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import ContainerEngine from 'namespaces-js';
import bunyan from 'bunyan';
import EventEmitter from 'eventemitter3';
import upperCase from 'lodash/upperCase';
import bleacon from 'bleacon';
import Logger from '../../common/logging/logger';
import Initializer from '../../common/utils/initializer';
import Server from '../infrastructure/http/server';
import UserRepository from '../infrastructure/database/repos/user';
import RegistryRepository from '../infrastructure/database/repos/registry';
import HistoryRepository from '../infrastructure/database/repos/history';
import Scanner from '../domain/tracking/scanner';
import Tracker from '../domain/tracking/tracker';
import DefaultRoutes from './routes/default';
import Settings from './settings';

const SEPARATOR = '.';
const NAMESPACES = ContainerEngine.map({
    system: ['tracking'],
    http: ['routes'],
    database: ['repositories'],
    initialization: ['initializers']
}, SEPARATOR);

const FIELDS = {
    engine: Symbol('engine')
};

const Container = composeClass({
    constructor(params) {
        const engine = new ContainerEngine({ separator: SEPARATOR, panic: false });

        engine.const('settings', Settings(params));

        engine.factory('log', [
            'settings'
        ], (settings) => {
            bunyan.createLogger(settings.logging);
        });

        engine.factory('logger:factory', [
            'log'
        ], (log) => {
            return function loggerFactory(prefix) {
                return Logger(log, { prefix: `[${upperCase(prefix)}]` });
            };
        });

        engine.service('event-hub', EventEmitter);

        engine.namespace(NAMESPACES.database.repositories()).factory('user', UserRepository);
        engine.namespace(NAMESPACES.database.repositories()).factory('registry', RegistryRepository);
        engine.namespace(NAMESPACES.database.repositories()).factory('history', HistoryRepository);

        engine.namespace(NAMESPACES.system.tracking()).factory('scanner', [
            'logger:factory'
        ], (createLogger) => {
            process.env.NOBLE_REPORT_ALL_HCI_EVENTS = 1;

            return Scanner(
                createLogger('scanner'),
                bleacon
            );
        });

        engine.namespace(NAMESPACES.system.tracking()).factory('tracker', [
            'logger:factory',
            'settings'
        ], (createLogger, settings) => {
            return Tracker(
                createLogger('tracker'),
                settings.get('tracking').toJS()
            );
        });

        engine.namespace(NAMESPACES.http()).factory('server', [
            'settings'
        ], (settings) => {
            return Server(settings.http);
        });

        engine.namespace(NAMESPACES.http.routes()).factory('default', DefaultRoutes);

        engine.namespace(NAMESPACES.initialization()).factory('manager', [
            'logger:factory'
        ], (createLogger) => {
            return Initializer(createLogger('initializer'));
        });

        this[FIELDS.engine] = engine;
    },

    createLogger(prefix) {
        return this[FIELDS.engine].resolve('logger:factory')(prefix);
    },

    getEventHub() {
        return this[FIELDS.engine].resolve('event-hub');
    },

    getServer() {
        return this[FIELDS.engine].resolve(NAMESPACES.http('server'));
    },

    getAllRoutes() {
        return this[FIELDS.engine].resolveAll(NAMESPACES.http.routes());
    },

    getInitializetionManager() {
        return this[FIELDS.engine].resolve(NAMESPACES.initialization('manager'));
    },

    getAllInitializers() {
        return this[FIELDS.engine].resolveAll(NAMESPACES.initialization.initializers());
    }
});

export default function create(params) {
    return new Container(params);
}
