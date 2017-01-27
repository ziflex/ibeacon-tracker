import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import ObservableMixin from 'observable-mixin';
import Promise from 'bluebird';
import Express from 'express';
import Session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { requires } from '../../../common/utils/contracts';

const FIELDS = {
    engine: Symbol('engine'),
    settings: Symbol('settings')
};

const Server = composeClass({
    mixins: [
        ObservableMixin(FIELDS.engine)
    ],

    constructor(settings) {
        requires('settings', settings);
        requires('settings.session', settings.session);

        const staticsRoute = settings.getIn(['statics', 'route']);
        const staticsDir = settings.getIn(['statics', 'directory']);

        this[FIELDS.settings] = settings;
        this[FIELDS.engine] = Express();
        this[FIELDS.engine].use(staticsRoute, Express.static(staticsDir));
        this[FIELDS.engine].use(bodyParser.json());
        this[FIELDS.engine].use(bodyParser.urlencoded({ extended: false }));
        this[FIELDS.engine].use(cookieParser());
        this[FIELDS.engine].use(Session(settings.get('session')));
        this[FIELDS.engine].use(passport.initialize());
        this[FIELDS.engine].use(passport.session());

        this[FIELDS.engine].set('api.route', settings.getIn(['api', 'route']));
        this[FIELDS.engine].set('statics.route', staticsRoute);
        this[FIELDS.engine].set('statics.directory', staticsDir);
    },

    get(...args) {
        this[FIELDS.engine].get(...args);

        return this;
    },

    post(...args) {
        this[FIELDS.engine].post(...args);
    },

    put(...args) {
        this[FIELDS.engine].put(...args);

        return this;
    },

    delete(...args) {
        this[FIELDS.engine].delete(...args);

        return this;
    },

    use(...args) {
        this[FIELDS.engine].use(...args);

        return this;
    },

    run() {
        return Promise.fromCallback((done) => {
            this[FIELDS.engine].listen(this[FIELDS.settings].port, done);
        });
    }
});

export default function create(...args) {
    return new Server(...args);
}
