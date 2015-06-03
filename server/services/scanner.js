import bleacon from 'bleacon';
import Symbol from 'symbol';
import hub from './event-hub';
import notification from './notification';
import tracker from './tracker';
import registry from './registry';
import logger from './logger';
import trackingEvents from '../enums/tracking-events';

const IS_RUNNING = Symbol('IS_RUNNING');
const ON_DISCOVER = Symbol('ON_DISCOVER');
const ON_FOUND = Symbol('ON_FOUND');
const ON_LOST = Symbol('ON_LOST');

class ScanningService {
    constructor() {
        this[IS_RUNNING] = false;
        this[ON_DISCOVER] = (peripheral) => {
            tracker.track(peripheral);
        };
        this[ON_FOUND] = (beacon) => {
            logger.info('Found', beacon.uuid);

            process.nextTick(() => {
                registry.find(beacon, (info) => {
                    if (info) {
                        notification.notify('found', info);
                    }
                });
            });
        };
        this[ON_LOST] = (beacon) => {
            logger.info('Lost', beacon.uuid);

            process.nextTick(() => {
                registry.find(beacon, (info) => {
                    if (info) {
                        notification.notify('lost', info);
                    }
                });
            });
        };
    }

    startScanning() {
        if (this[IS_RUNNING]) {
            throw new Error('Service is already running');
        }

        this[IS_RUNNING] = true;

        registry.update(() => {
            hub.on(trackingEvents.FOUND, this[ON_FOUND]);
            hub.on(trackingEvents.LOST, this[ON_LOST]);
            bleacon.on('discover', this[ON_DISCOVER]);
            bleacon.startScanning();
        });
    }

    stopScanning() {
        if (!this[IS_RUNNING]) {
            throw new Error('Service is already stopped');
        }

        bleacon.stopScanning();
        bleacon.removeListener('discover', this[ON_DISCOVER]);
        hub.removeListener(trackingEvents.FOUND, this[ON_FOUND]);
        hub.removeListener(trackingEvents.LOST, this[ON_LOST]);
        this[IS_RUNNING] = false;
    }
}

export default new ScanningService();
