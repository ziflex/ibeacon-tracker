import Symbol from 'symbol';
import _ from 'lodash-node';
import logger from './logger';
import BeaconModel from '../models/beacon';
import utils from '../utils';
import Queue from '../queue';

const IS_EMPTY = Symbol('IS_EMPTY');
const CACHE = Symbol('CACHE');
const QUEUE = Symbol('QUEUE');
const IS_UPDATING = Symbol('IS_UPDATING');

class RegistryService {
    constructor() {
        this[CACHE] = {};
        this[IS_EMPTY] = true;
        this[QUEUE] = new Queue();
        this[IS_UPDATING] = false;
    }

    find(beacon, callback) {
        if (!beacon) {
            return;
        }

        const find = (b, cb) => {
            const guid = utils.generateGuid(b);
            const found = this[CACHE][guid];

            if (found) {
                cb(found);
            }
        };

        if (this[IS_UPDATING]) {
            this[QUEUE].enqueue(_.bind(find, this, beacon, callback));
            return;
        }

        if (this[IS_EMPTY]) {
            this.update(() => {
                find(beacon, callback);
            });
        } else {
            find(beacon, callback);
        }
    }

    update(callback) {
        this[IS_UPDATING] = true;
        logger.info('Updating registry...');
        BeaconModel.find({}, (err, data) => {
            let result = null;
            let isEmpty = true;

            if (!err) {
                result = _.reduce(data, (res, i) => {
                    res[utils.generateGuid(i)] = i;
                    return res;
                }, {});
                logger.info('Registry is updated.');
            } else {
                logger.error(err);
            }

            this[CACHE] = result;
            this[IS_EMPTY] = isEmpty;
            this[IS_UPDATING] = false;
            this[QUEUE].each(i => i());

            if (callback) {
                callback(err, result);
            }
        });
    }
}

export default new RegistryService();
