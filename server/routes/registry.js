import _ from 'lodash';
import settings from '../settings';
import routeUtil from '../utils/route';
import BeaconModel from '../models/beacon';

const route = '/registry';

function toJSON(entries) {
    return _.map(entries, (entry) => {
        return {
            id: entry._id,
            name: entry.name,
            uuid: entry.uuid,
            major: entry.major,
            minor: entry.minor,
            subscribers: entry.subscribers || []
        };
    });
}

// TODO: ADD 'routeUtil.isAuthenticated' for all route handlers
export default {
    use(router) {
        router.get(settings.server.api + route + '/find', (req, res) => {
            BeaconModel.find({}, (err, data) => {
                if (!err) {
                    res.json(toJSON(data));
                } else {
                    routeUtil.error(res, err);
                }
            });
        });

        router.post(settings.server.api + route + '/save', (req, res) => {
            const entry = req.body;
            if (entry) {
                BeaconModel.findByIdAndUpdate(entry.id, _.omit(entry, 'id'), {
                    new: _.isUndefined(entry.id),
                    upsert: true
                }, (err, data) => {
                    if (!err) {
                        req.json(_.first(toJSON([data])));
                    } else {
                        routeUtil.error(res, err);
                    }
                });
            } else {
                routeUtil.bad(res, 'Missed parameters');
            }
        });

        router.post(settings.server.api + route + '/delete', (req, res) => {
            if (req.body) {
                BeaconModel.remove({ id: req.body.id }, (err) => {
                    if (!err) {
                        routeUtil.ok(res);
                    } else {
                        routeUtil.error(res, err);
                    }
                });
            } else {
                routeUtil.bad(res, 'Missed id');
            }
        });
    }
};
