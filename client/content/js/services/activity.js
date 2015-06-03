import client from 'superagent';
import Promise from 'bluebird';
import map from 'lodash/collection/map';
import Immutable from 'immutable';
import settings from '../settings';
import utils from '../utils/models';

class ActivityService {

    findAsync() {
        return new Promise((resolve, reject) => {
            client.get(settings.endpoint + '/activity')
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
