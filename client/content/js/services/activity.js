import client from 'superagent';
import Promise from 'bluebird';
import map from 'lodash/collection/map';
import Immutable from 'immutable';
import settings from '../settings';
import utils from '../utils/models';

class ActivityService {

    findAllAsync() {
        return new Promise((resolve, reject) => {
            client.get(settings.endpoint + '/activity')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (!err) {
                        const result = {
                            registered: null,
                            unregistered: null
                        };

                        result.registered = Immutable.Map(map((res.body || {}).registered, i => {
                            return [i.id, utils.mapToBeacon(i)];
                        }));

                        result.unregistered = Immutable.Map(map((res.body || {}).unregistered, i => {
                            return [i.id, utils.mapToBeacon(i)];
                        }));

                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
        });
    }

    findRegisteredAsync() {
        return new Promise((resolve, reject) => {
            client.get(settings.endpoint + '/activity/registered')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (!err) {
                        resolve(Immutable.Map(map(res.body || [], i => {
                            return [i.id, utils.mapToBeacon(i)];
                        })));
                    } else {
                        reject(err);
                    }
                });
        });
    }

    findUnregisteredAsync() {
        return new Promise((resolve, reject) => {
            client.get(settings.endpoint + '/activity/unregistered')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (!err) {
                        resolve(Immutable.Map(map(res.body || [], i => {
                            return [i.id, utils.mapToBeacon(i)];
                        })));
                    } else {
                        reject(err);
                    }
                });
        });
    }
}

export default new ActivityService();
