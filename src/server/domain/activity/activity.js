import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import EventEmitter from 'eventemitter3';
import ObservableMixin from 'observable-mixin';
import Promise from 'bluebird';
import { requires, assert } from '../../../common/utils/contracts';
import { generate as Guid } from '../../../common/utils/guid';

const TYPE_NAME = '[activity service]';
const ERR_START = `${TYPE_NAME} Already started`;
const ERR_STOP = `${TYPE_NAME} Already stopped`;

const FIELDS = {
    logger: Symbol('logger'),
    beaconRepository: Symbol('beaconRepository'),
    tracker: Symbol('tracker')
};

function createItem(item) {
    
}

const ActivityService = composeClass({
    constructor(logger, beaconRepository, tracker) {
        requires('logger', logger);
        requires('beacon repository', beaconRepository);
        requires('tracker', tracker);

        this[FIELDS.logger] = logger;
        this[FIELDS.beaconRepository] = beaconRepository;
        this[FIELDS.tracker] = tracker;
    },

    find(query = {}) {
        const detected = this[FIELDS.tracker].find({
            reduce: {
                initialValue: {},
                iteratee: (res, item) => {
                    const items = res;

                    items[Guid(item)] = item;

                    return res;
                }
            }
        });

        return this[FIELDS.beaconRepository].find({
            uuid: { $in: _.map(detected, (i) => i.uuid) },
            major: { $in: _.map(detected, (i) => i.major) },
            minor: { $in: _.map(detected, (i) => i.minor) }
        }, { skip: query.skip, limit: query.limit }).then((found) => {

        });
    }

    findAll(callback) {
        // Callback is used to keep consistency throughout the services
        const registered = new Promise((resolve, reject) => {
            this.find(true, (err, items) => {
                if (err) return reject(err);
                resolve(items);
            });
        });

        const unregistered = new Promise((resolve, reject) => {
            this.find(false, (err, items) => {
                if (err) return reject(err);
                resolve(items);
            });
        });

        Promise.props({
            registered,
            unregistered
        }).then((props) => callback(null, props)).catch((reason) => callback(reason, null));
    },

    find(registered, callback) {
        const detected = tracker.getList();
        const query = BeaconModel.find({
            uuid: { $in: _.map(detected, (i) => i.uuid) },
            major: { $in: _.map(detected, (i) => i.major) },
            minor: { $in: _.map(detected, (i) => i.minor) }
        });

        query.exec((err, items) => {
            if (err) {
                return callback(err, null);
            }

            const generate = _.bind(uuid.generate, uuid);
            const result = [];
            const registry = _.indexBy(items, generate);
            _.forEach(detected, (i) => {
                const match = registry[generate(i)];
                const isRegistered = !_.isUndefined(match);

                if (isRegistered === registered) {
                    result.push({
                        name: _.get(match, 'name'),
                        uuid: uuid.normalize(i),
                        major: i.major,
                        minor: i.minor,
                        proximity: i.proximity,
                        accuracy: i.accuracy,
                        measuredPower: i.measuredPower,
                        lastSeen: i.lastSeen
                    });
                }
            });

            return callback(null, result);
        });
    }
});

export default function create(...args) {
    return new ActivityService(...args);
}
