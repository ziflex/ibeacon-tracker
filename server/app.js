import bleacon from 'bleacon';
import Symbol from 'symbol';
import mongoose from 'mongoose';
import settings from './settings';
import notification from './services/notification';
import pool from './services/pool';
import registry from './services/registry';

const IS_RUNNING = Symbol('IS_RUNNING');
const ON_DISCOVER = Symbol('ON_DISCOVER');
const ON_FOUND = Symbol('ON_FOUND');
const ON_LOST = Symbol('ON_LOST');

export default class Application {
    constructor() {
        this[IS_RUNNING] = false;
        this[ON_DISCOVER] = (peripheral) => {
            pool.add(peripheral);
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

    run() {
        if (this.isRunning) {
            throw new Error('Survice is already running');
        }

        this[IS_RUNNING] = true;

        mongoose.connect(settings.database.connectionString);
        pool.on('found', this[ON_FOUND]);
        pool.on('lost', this[ON_LOST]);
        bleacon.on('discover', this[ON_DISCOVER]);
        bleacon.startScanning();
    }

    stop() {
        if (!this.isRunning) {
            throw new Error('Survice is already stopped');
        }

        mongoose.disconnect();
        bleacon.stopScanning();
        bleacon.removeListener('discover', this[ON_DISCOVER]);
        pool.removeListener('found', this[ON_FOUND]);
        pool.removeListener('lost', this[ON_LOST]);
        this[IS_RUNNING] = false;
    }
}
