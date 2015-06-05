import _ from 'lodash';
import settings from '../settings';
import tracker from '../services/tracker';
import registry from '../services/registry';
import util from '../utils/route';

const route = '/activity';

function toJSON(entry = {}) {
    return {
        id: entry._id,
        name: entry.name
    };
}

function getActivity(req, res) {
    registry.findAll(tracker.getList(), (current) => {
        res.json(_.map(current, toJSON));
    });
}

export default {
    use(router) {
        router.get(settings.server.apiEndpoint + route, util.isAuthenticated, getActivity);
    }
};
