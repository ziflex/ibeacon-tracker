import settings from '../settings';
import registry from '../services/registry';

const route = 'registry';

export default {
    use(server) {
        server.post(settings.endpoint + route + '/update', () => {
            registry.update();
        });
    }
};
