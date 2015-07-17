import client from 'superagent';
import Promise from 'bluebird';
import map from 'lodash/collection/map';
import Immutable from 'immutable';
import Activity from '../models/activity';
import settings from '../settings';

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

                        result.registered = Immutable.List(map((res.body || {}).registered, i => {
                            return new Activity(i);
                        }));

                        result.unregistered = Immutable.List(map((res.body || {}).unregistered, i => {
                            return new Activity(i);
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
                        resolve(Immutable.List(map(res.body || [], i => {
                            return new Activity(i);
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
                        resolve(Immutable.List(map(res.body || [], i => {
                            return new Activity(i);
                        })));
                    } else {
                        reject(err);
                    }
                });
        });
    }
}

export default new ActivityService();
