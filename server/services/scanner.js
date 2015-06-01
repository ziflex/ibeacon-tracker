import bleacon from 'bleacon';
import Symbol from 'symbol';
import mongoose from 'mongoose';
import settings from '../settings';
import notification from './notification';
import tracker from './tracker';
import registry from './registry';

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
            process.nextTick(() => {
                registry.find(beacon, (info) => {
                    notification.notify('found', info);
                });
            });
        };
        this[ON_LOST] = (beacon) => {
            process.nextTick(() => {
                registry.find(beacon, (info) => {
                    notification.notify('lost', info);
                });
            });
        };
    }

    startScanning() {
        if (this.isRunning) {
            throw new Error('Service is already running');
        }

        this[IS_RUNNING] = true;

        mongoose.connect(settings.database.connectionString);
        tracker.on('found', this[ON_FOUND]);
        tracker.on('lost', this[ON_LOST]);
        bleacon.on('discover', this[ON_DISCOVER]);
        bleacon.startScanning();
    }

    stopScanning() {
        if (!this.isRunning) {
            throw new Error('Service is already stopped');
        }

        mongoose.disconnect();
        bleacon.stopScanning();
        bleacon.removeListener('discover', this[ON_DISCOVER]);
        tracker.removeListener('found', this[ON_FOUND]);
        tracker.removeListener('lost', this[ON_LOST]);
        this[IS_RUNNING] = false;
    }
}

export default new ScanningService();
