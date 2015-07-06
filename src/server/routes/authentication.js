import settings from '../settings';
import passport from 'passport';
import util from '../utils/route';
const route = '/auth';

function login(req, res) {
    util.ok(res);
}

function logout(req, res) {
    req.logout();
    util.ok(res);
}

export default {
    use(router) {
        router.post(settings.server.apiEndpoint + route + '/login', passport.authenticate('local'), login);
        router.post(settings.server.apiEndpoint + route + '/logout', logout);
    }
};
