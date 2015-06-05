import _ from 'lodash';
import hub from '../services/event-hub';
import settings from '../settings';
import routeUtil from '../utils/route';
import BeaconModel from '../models/beacon';
import events from '../enums/registry-events';
import util from '../utils/route';

const route = '/registry';

function notify() {
    hub.emit(events.CHANGED);
}

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

function getRegistry(req, res) {
    BeaconModel.find({}, (err, data) => {
        if (!err) {
            res.json(_.map(data || [], toJSON));
        } else {
            routeUtil.error(res, err);
        }
    });
}

function saveRegistry(req, res) {
    const entry = req.body;
    const callback = (err, data) => {
        if (!err) {
            notify();
            res.json(data);
        } else {
            routeUtil.error(res, err);
        }
    };

    if (entry) {
        if (entry.id) {
            BeaconModel.update({_id: entry.id}, _.omit(entry, 'id'), (err) => {
                callback(err, entry);
            });
        } else {
            BeaconModel.create(entry, (err, data) => {
                callback(err, toJSON(data));
            });
        }
    } else {
        routeUtil.bad(res, 'Missed parameters');
    }
}

function deleteRegistry(req, res) {
    if (req.body) {
        BeaconModel.remove({ _id: req.body.id }, (err) => {
            if (!err) {
                notify();
                routeUtil.ok(res);
            } else {
                routeUtil.error(res, err);
            }
        });
    } else {
        routeUtil.bad(res, 'Missed id');
    }
}

export default {
    use(router) {
        router.get(settings.server.apiEndpoint + route, util.isAuthenticated, getRegistry);

        router.post(settings.server.apiEndpoint + route, util.isAuthenticated, saveRegistry);

        router.delete(settings.server.apiEndpoint + route, util.isAuthenticated, deleteRegistry);
    }
};
