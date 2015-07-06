import bleacon from 'bleacon';
import Symbol from 'symbol';
import hub from './event-hub';
import notification from './notification';
import tracker from './tracker';
import registry from './registry';
import trackingEvents from '../enums/tracking-events';

const IS_RUNNING = Symbol('IS_RUNNING');
const ON_DISCOVER = Symbol('ON_DISCOVER');
const ON_FOUND = Symbol('ON_FOUND');
const ON_LOST = Symbol('ON_LOST');

class ScanningService {
    constructor() {
        process.env.NOBLE_REPORT_ALL_HCI_EVENTS = 1;
        this[IS_RUNNING] = false;
        this[ON_DISCOVER] = (peripheral) => {
            process.nextTick(function onDiscover() {
                tracker.track(peripheral);
            });
        };
        this[ON_FOUND] = (beacon) => {
            process.nextTick(function onFound() {
                registry.find(beacon, function onEntryFound(entry) {
                    if (entry) {
                        notification.notify('found', entry);
                    }
                });
            });
        };
        this[ON_LOST] = (beacon) => {
            process.nextTick(function onLost() {
                registry.find(beacon, function onEntryFound(entry) {
                    if (entry) {
                        notification.notify('lost', entry);
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
        hub.off(trackingEvents.FOUND, this[ON_FOUND]);
        hub.off(trackingEvents.LOST, this[ON_LOST]);
        this[IS_RUNNING] = false;
    }
}

export default new ScanningService();
