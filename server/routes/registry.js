import _ from 'lodash';
import hub from '../services/event-hub';
import settings from '../settings';
import routeUtil from '../utils/route';
import BeaconModel from '../models/beacon';
import events from '../enums/registry-events';

const route = '/registry';

function toJSON(entry = {}) {
    return {
        id: entry._id,
        name: entry.name,
        uuid: entry.uuid,
        major: entry.major,
        minor: entry.minor,
        subscribers: entry.subscribers || []
    };
}

// TODO: ADD 'routeUtil.isAuthenticated' for all route handlers
export default {
    use(router) {
        const emit = () => hub.emit(events.CHANGED);

        router.get(settings.server.api + route, (req, res) => {
            BeaconModel.find({}, (err, data) => {
                if (!err) {
                    res.json(_.map(data || [], toJSON));
                } else {
                    routeUtil.error(res, err);
                }
            });
        });

        router.post(settings.server.api + route, (req, res) => {
            const entry = req.body;

            if (entry) {
                if (entry.id) {
                    BeaconModel.update({_id: entry.id}, _.omit(entry, 'id'), (err) => {
                        if (!err) {
                            emit();
                            res.json(entry);
                        } else {
                            routeUtil.error(res, err);
                        }
                    });
                } else {
                    BeaconModel.create(entry, (err, data) => {
                        if (!err) {
                            emit();
                            res.json(toJSON(data));
                        } else {
                            routeUtil.error(res, err);
                        }
                    });
                }
            } else {
                routeUtil.bad(res, 'Missed parameters');
            }
        });

        router.delete(settings.server.api + route, (req, res) => {
            if (req.body) {
                BeaconModel.remove({ _id: req.body.id }, (err) => {
                    if (!err) {
                        emit();
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
