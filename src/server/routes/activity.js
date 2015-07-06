import settings from '../settings';
import activity from '../services/activity';
import util from '../utils/route';

const route = '/activity';

function getActivityAll(req, res) {
    activity.findAll(items => {
        res.json(items);
    });
}

function getActiveRegistered(req, res) {
    activity.findRegistered(items => {
        res.json(items);
    });
}

function getActiveUnregistered(req, res) {
    activity.findUnregistered(items => {
        res.json(items);
    });
}

export default {
    use(router) {
        router.get(settings.server.apiEndpoint + route, util.isAuthenticated, getActivityAll);
        router.get(settings.server.apiEndpoint + route + '/registered', util.isAuthenticated, getActiveRegistered);
        router.get(settings.server.apiEndpoint + route + '/unregistered', util.isAuthenticated, getActiveUnregistered);
    }
};
