import Symbol from 'symbol';
import {EventEmitter} from 'events';
import _ from 'lodash-node';
import utils from '../utils';
import settings from '../settings';

const EVENTS = {
    LOST: 'lost',
    FOUND: 'found'
};
const POOL = Symbol('POOL');
const NOTIFY = Symbol('NOTIFY');

class PoolService extends EventEmitter {
    constructor() {
        super();
        this[POOL] = {};
        this[NOTIFY] = (event, data) => {
            let func;

            if (_.isArray(data)) {
                func = () => _.forEach(data, i => this.emit(event, i));
            } else {
                func = () => this.emit(event, data);
            }

            process.nextTick(func);
        };
        setInterval(() => {
            const newPool = {};
            const lost = [];
            const timestamp = new Date().getTime();
            const timeout = settings.pool.timeout;
            const isLost = (b) => {
                return (timestamp - b.lastSeen.getTime()) > timeout;
            };

            _.forEach(this[POOL], (beacon) => {
                if (isLost(beacon)) {
                    lost.push(beacon);
                } else {
                    newPool[utils.generateGuid(beacon)] = beacon;
                }
            });

            this[POOL] = newPool;
            this[NOTIFY](EVENTS.LOST, lost);
        }, settings.pool.interval || 5000);
    }

    add(beacon) {
        const guid = utils.generateGuid(beacon);
        const found = this[POOL][guid];

        if (!found) {
            beacon.lastSeen = new Date();
            this[POOL][guid] = beacon;
            this[NOTIFY](EVENTS.FOUND, [beacon]);
        } else {
            found.lastSeen = new Date();
        }
    }
}

export default new PoolService();
