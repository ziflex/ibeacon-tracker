import urlJoin from 'url-join';
import { requires } from '../../../common/utils/contracts';
import {
    isAuthenticated,
    error
} from './helpers/route';

const BASE_ROUTE = '/activity';

function handle(req, res, promise) {
    promise.then((result) => {
        return res.json(result);
    }).catch((err) => {
        return error(req, res, err);
    });
}

export default function create(activity) {
    requires('activity service', activity);

    function getActivityAll(req, res) {
        handle(req, res, activity.findAll());
    }

    function getActiveRegistered(req, res) {
        handle(req, res, activity.find(true));
    }

    function getActiveUnregistered(req, res) {
        handle(req, res, activity.find(false));
    }

    return function ActivityRoutes(server) {
        requires('server', server);

        const apiEndpoint = server.get('api.route');

        server.get(
            urlJoin(apiEndpoint, BASE_ROUTE),
            isAuthenticated,
            getActivityAll
        );

        server.get(
            urlJoin(apiEndpoint, BASE_ROUTE, 'registered'),
            isAuthenticated,
            getActiveRegistered
        );

        server.get(
            urlJoin(apiEndpoint, BASE_ROUTE, 'unregistered'),
            isAuthenticated,
            getActiveUnregistered
        );
    };
}
