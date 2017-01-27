import urlJoin from 'url-join';
import get from 'lodash/get';
import map from 'lodash/map';
import { requires } from '../../../common/utils/contracts';
import {
    isAuthenticated,
    error
} from './helpers/route';


// import _ from 'lodash';
// import pipeline from 'piperline';
// import hub from '../services/event-hub';
// import settings from '../settings';
// import routeUtil from '../utils/route';
// import BeaconModel from '../models/beacon';
// import events from '../enums/registry-events';
// import util from '../utils/route';
// import validator from '../shared/utils/validator';
// import logger from '../services/logger';

function notify() {
    logger.info('Registry has been updated.');
    hub.emit(events.CHANGED);
}

function serializeRecord(entry = {}) {
    return {
        id: entry._id,
        name: entry.name,
        uuid: entry.uuid,
        major: entry.major,
        minor: entry.minor,
        subscribers: entry.subscribers || [],
        enabled: entry.enabled
    };
}

function saveRegistry(req, res) {
    pipeline.create()
        .pipe(function validate(entry, next, done) { // validation
            if (!entry) {
                return done({ success: false, data: 'Missed parameters' });
            }

            const validation = validator.validate(entry);

            if (validation) {
                return done({ success: false, data: validation });
            }

            if (!entry.id) {
                return BeaconModel.findOne({
                    uuid: entry.uuid,
                    major: entry.major,
                    minor: entry.minor
                }, (err, found) => {
                    if (!err) {
                        if (found) {
                            return done({ success: true, data: 'Beacon is not unique!' });
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
                return BeaconModel.update({ _id: entry.id }, _.omit(entry, 'id'), (err) => {
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
                    return next({ success: true, data: toPlainObject(data) });
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

// export default {
//     use(router) {

//
//         router.delete(settings.server.apiEndpoint + route, util.isAuthenticated, deleteRegistry);
//     }
// };

const BASE_ROUTE = '/registry';

export default function create(logger, registry) {
    requires('logger', logger);

    function getRecords(req, res) {
        registry.query({
            count: get(req, 'query.count', 10),
            offset: get(req, 'query.offset', 0)
        }).then((records) => {
            return res.json(map(records, serializeRecord));
        }).catch((err) => {
            return error(req, res, err);
        });
    }

    function createOrUpdateRecord() {}

    return function RegistryRoutes(server) {
        requires('server', server);

        const apiEndpoint = server.get('api.route');

        server.get(
            urlJoin(apiEndpoint, BASE_ROUTE),
            isAuthenticated,
            getRecords
        );

        server.post(
            urlJoin(apiEndpoint, BASE_ROUTE),
            isAuthenticated,
            createOrUpdateRecord
        );
    };
}
