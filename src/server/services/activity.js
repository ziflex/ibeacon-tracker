import Promise from 'bluebird';
import _ from 'lodash';
import BeaconModel from '../models/beacon';
import tracker from './tracker';
import uuid from '../shared/utils/uuid';

class ActivityService {

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
            registered: registered,
            unregistered: unregistered
        }).then((props) => callback(null, props)).catch((reason) => callback(reason, null));
    }

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
}

export default new ActivityService();
