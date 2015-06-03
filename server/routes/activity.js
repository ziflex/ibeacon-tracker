import _ from 'lodash';
import settings from '../settings';
import tracker from '../services/tracker';
import registry from '../services/registry';

const route = '/activity';

function toJSON(entry = {}) {
    return {
        id: entry._id,
        name: entry.name
    };
}

// TODO: ADD 'routeUtil.isAuthenticated' for all route handlers
export default {
    use(router) {
        router.get(settings.server.api + route, (req, res) => {
            registry.findAll(tracker.getList(), (current) => {
                res.json(_.map(current, toJSON));
            });
        });
    }
};
