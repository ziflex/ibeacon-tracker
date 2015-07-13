import _ from 'lodash';
import pipeline from 'piperline';
import hub from '../services/event-hub';
import settings from '../settings';
import routeUtil from '../utils/route';
import BeaconModel from '../models/beacon';
import events from '../enums/registry-events';
import util from '../utils/route';
import validator from '../shared/utils/validator';

const route = '/registry';

function notify() {
    hub.emit(events.CHANGED);
}

function toPlainObject(entry = {}) {
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
            res.json(_.map(data || [], toPlainObject));
        } else {
            routeUtil.error(res, err);
        }
    });
}

function saveRegistry(req, res) {
    pipeline.create()
        .pipe(function validate(entry, next, done) { // validation
            if (!entry) {
                return done({success: false, data: 'Missed parameters'});
            }

            const validation = validator.validate(entry);

            if (validation) {
                return done({success: false, data: validation});
            }

            if (!entry.id) {
                return BeaconModel.findOne({
                    uuid: entry.uuid,
                    major: entry.major,
                    minor: entry.minor
                }, (err, found) => {
                    if (!err) {
                        if (found) {
                            return done({success: true, data: 'Beacon is not unique!'});
                        }

                        return next(entry);
                    }

                    return done(err);
                });
            }

            return next(entry);
        })
        .pipe(function update(entry, next, done) { // update
            if (entry.id) {
                return BeaconModel.update({_id: entry.id}, _.omit(entry, 'id'), (err) => {
                    if (!err) {
                        return done({ success: true, data: entry });
                    }

                    return done(err);
                });
            }

            next(entry);
        })
        .pipe(function create(entry, next, done) { // creation
            BeaconModel.create(entry, (err, data) => {
                if (!err) {
                    return next({success: true, data: toPlainObject(data)});
                }

                done(err);
            });
        })
        .on('error', (err) => {
            routeUtil.error(res, err);
        })
        .on('done', (result) => {
            if (result.success) {
                notify();

                if (result.data) {
                    return res.json(result.data);
                }

                return routeUtil.ok(res);
            }

            return routeUtil.bad(res, JSON.stringify(result.data));
        })
        .run(req.body);
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
