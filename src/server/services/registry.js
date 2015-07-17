import Symbol from 'symbol';
import _ from 'lodash';
import hub from './event-hub';
import logger from './logger';
import BeaconModel from '../models/beacon';
import uuid from '../shared/utils/uuid';
import Queue from '../utils/queue';
import events from '../enums/registry-events';

const IS_EMPTY = Symbol('IS_EMPTY');
const CACHE = Symbol('CACHE');
const QUEUE = Symbol('QUEUE');
const IS_UPDATING = Symbol('IS_UPDATING');
const ENSURE = Symbol('ENSURE');

class RegistryService {
    constructor() {
        this[CACHE] = {};
        this[IS_EMPTY] = true;
        this[QUEUE] = new Queue();
        this[IS_UPDATING] = false;
        this[ENSURE] = (callback) => {
            if (callback) {
                if (this[IS_UPDATING]) {
                    this[QUEUE].enqueue(callback);
                    return;
                }

                if (this[IS_EMPTY]) {
                    this.update(() => {
                        callback();
                    });
                } else {
                    callback();
                }
            }
        };

        hub.on(events.CHANGED, () => {
            this.update();
        });
    }

    find(beacon, callback) {
        if (!beacon) {
            callback(null);
        }

        this[ENSURE](_.bind((b, cb, sym) => {
            const guid = uuid.generate(b);

            cb(this[sym][guid]);
        }, this, beacon, callback, CACHE));
    }

    update(callback) {
        if (!this[IS_UPDATING]) {
            this[IS_UPDATING] = true;

            BeaconModel.find({ enabled: true }, (err, data) => {
                let result = null;
                let isEmpty = true;

                if (!err) {
                    result = _.reduce(data, (res, i) => {
                        isEmpty = false;
                        res[uuid.generate(i)] = i;
                        return res;
                    }, {});
                } else {
                    logger.error(err);
                }

                this[CACHE] = result;
                this[IS_EMPTY] = isEmpty;
                this[IS_UPDATING] = false;
                this[QUEUE].each(i => i(err, result));

                if (callback) {
                    callback(err, result);
                }
            });
        } else {
            this[QUEUE].enqueue(callback);
        }
    }
}

export default new RegistryService();
