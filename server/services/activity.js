import _ from 'lodash';
import Promise from 'bluebird';
import registry from './registry';
import tracker from './tracker';
import uuid from '../utils/uuid';

class ActivityService {

    findAll(callback) {
        // Callback is used to keep consistency throughout the services
        Promise.props({
            registered: new Promise(resolve => this.findRegistered(resolve)),
            unregistered: new Promise(resolve => this.findUnregistered(resolve))
        }).then(callback);
    }

    findRegistered(callback) {
        registry.findAll(tracker.getList(), (current) => {
            callback(_.map(current, (i) => {
                return i.toObject();
            }));
        });
    }

    findUnregistered(callback) {
        registry.getAll((registered) => {
            const result = [];

            _.forEach(tracker.getList(), (i) => {
                if (!registered[uuid.generate(i)]) {
                    result.push(_.clone(i));
                }
            });

            callback(result);
        });
    }
}

export default new ActivityService();
