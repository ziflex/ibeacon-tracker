import noble from 'noble';
import Symbol from 'symbol';
import Promise from 'bluebird';
import _ from 'lodash-node';
import mongoose from 'mongoose';
import settings from './settings';
import Beacon from './models/beacon';
import utils from './utils';
import notificationSrvc from './services/notification';

const nobleStates = {
    UNKNOWN: 'unknown',
    RESETTING: 'resetting',
    UNSUPPORTED: 'unsupported',
    UNAUTHORIZED: 'unauthorized',
    POWERED_OFF: 'poweredOff',
    POWERED_ON: 'poweredOn'
};
const IS_RUNNING = Symbol('IS_RUNNING');
const ON_DISCOVER = Symbol('ON_DISCOVER');
const BEACONS = Symbol('BEACONS');
const INIT_NOBLE = Symbol('INIT_NOBLE');
const FIND_ALL_BEACONS = Symbol('FIND_ALL_BEACONS');

export default class Application {
    constructor() {
        this[IS_RUNNING] = false;
        this[BEACONS] = {};
        this[ON_DISCOVER] = (peripheral) => {
            notificationSrvc.notify(peripheral);
        };
        this[INIT_NOBLE] = () => {
            return new Promise((resolve) => {
                noble.on('discover', this[ON_DISCOVER]);

                if (noble.state === nobleStates.POWERED_ON) {
                    noble.startScanning();
                    resolve();
                } else {
                    const onStateChange = (state) => {
                        if (state === nobleStates.POWERED_ON) {
                            noble.startScanning();
                            noble.removeListener('stateChange', onStateChange);
                            resolve();
                        }
                    };

                    noble.on('stateChange', onStateChange);
                }
            });
        };
        this[FIND_ALL_BEACONS] = () => {
            return new Promise((resolve, reject) => {
                Beacon.find({}, (err, beacons) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(beacons);
                });
            });
        };
    }

    run() {
        if (this.isRunning) {
            throw new Error('Survice is already running');
        }

        this[IS_RUNNING] = true;

        mongoose.connect(settings.database);

        return this[FIND_ALL_BEACONS]().then(beacons => {
            this[BEACONS] = {};

            _.forEach(beacons, b => {
                this[BEACONS][utils.generateGuid(b)] = b;
            });

            return this[INIT_NOBLE]();
        });
    }

    stop() {
        if (!this.isRunning) {
            throw new Error('Survice is already stopped');
        }

        mongoose.disconnect();
        noble.stopScanning();
        noble.removeListener('discover', this[ON_DISCOVER]);
        this[IS_RUNNING] = false;
    }
}
