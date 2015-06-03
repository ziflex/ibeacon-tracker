import _ from 'lodash';
import Symbol from 'symbol';
import eventHub from './event-hub';
import events from '../enums/tracking-events';
import uuid from '../utils/uuid';
import settings from '../settings';

const POOL = Symbol('POOL');
const NOTIFY = Symbol('NOTIFY');

class TrackingService {
    constructor() {
        this[POOL] = Object.create(null);
        this[NOTIFY] = (event, data) => {
            let func;

            if (_.isArray(data)) {
                func = () => _.forEach(data, i => eventHub.emit(event, i));
            } else {
                func = () => eventHub.emit(event, data);
            }

            process.nextTick(func);
        };
        setInterval(() => {
            const newPool = Object.create(null);
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
                    newPool[uuid.generate(beacon)] = beacon;
                }
            });

            this[POOL] = newPool;
            this[NOTIFY](events.LOST, lost);
        }, settings.pool.interval || 5000);
    }

    track(beacon) {
        const guid = uuid.generate(beacon);
        const found = this[POOL][guid];

        if (!found) {
            beacon.lastSeen = new Date();
            this[POOL][guid] = beacon;
            this[NOTIFY](events.FOUND, [beacon]);
        } else {
            found.lastSeen = new Date();
        }
    }

    getList() {
        return _.map(this[POOL], i => _.clone(i));
    }
}

export default new TrackingService();
