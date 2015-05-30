import settings from '../settings';
import registry from '../services/registry';
import routeUtil from '../utils/route';

const route = '/registry';

export default {
    use(router) {
        router.post(settings.server.api + route + '/update', routeUtil.isAuthenticated, (req, res) => {
            registry.update(() => {
                res.status(200).end();
            });
        });
    }
};
