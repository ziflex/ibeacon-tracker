import passport from 'passport';
import urlJoin from 'url-join';
import { requires } from '../../../common/utils/contracts';
import {
    ok
} from './helpers/route';

const BASE_ROUTE = '/auth';

export default function create(logger) {
    requires('logger', logger);

    function logout(req, res) {
        req.logout();
        return ok(req, res);
    }

    return function AuthenticationRoutes(server) {
        requires('server', server);

        const apiEndpoint = server.get('api.route');

        // TODO: Log authenticated users
        server.post(
            urlJoin(apiEndpoint, BASE_ROUTE, 'login'),
            passport.authenticate('local'),
            ok
        );

        server.post(
            urlJoin(apiEndpoint, BASE_ROUTE, 'logout'),
            logout
        );
    };
}
