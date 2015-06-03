import client from 'superagent';
import Promise from 'bluebird';
import map from 'lodash/collection/map';
import set from 'lodash/object/set';
import Immutable from 'immutable';
import settings from '../settings';
import Beacon from '../models/beacon';
import Subscriber from '../models/subscriber';

function createSubscriber(entry) {
    return new Subscriber(entry);
}

function createBeacon(entry) {
    const subscribers = Immutable.List(map(entry.subscribers, createSubscriber));
    return new Beacon(set(entry, 'subscribers', subscribers));
}

class RegistryService {

    findAsync() {
        return new Promise((resolve, reject) => {
            client.get(settings.endpoint + '/registry')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (!err) {
                        resolve(Immutable.Map(map(res.body || [], i => {
                            return [i.id, createBeacon(i)];
                        })));
                    } else {
                        reject(err);
                    }
                });
        });
    }

    saveAsync(entry) {
        return new Promise((resolve, reject) => {
            client.post(settings.endpoint + '/registry')
                .send(entry.toJSON())
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (!err) {
                        resolve(createBeacon(res.body));
                    } else {
                        reject(err);
                    }
                });
        });
    }

    deleteAsync(id) {
        return new Promise((resolve, reject) => {
            client.del(settings.endpoint + '/registry')
                .send({id: id})
                .set('Accept', 'application/json')
                .end((err) => {
                    if (!err) {
                        resolve(id);
                    } else {
                        reject(err);
                    }
                });
        });
    }
}

export default new RegistryService();
