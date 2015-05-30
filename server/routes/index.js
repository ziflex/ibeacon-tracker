import settings from '../settings';
import path from 'path';
import fs from 'fs';

const content = fs.readFileSync(path.resolve('../public/index.html'), {encoding: 'utf8'});
const route = '/';

export default {
    use(router) {
        router.post(settings.server.api + route, (req, res) => {
            registry.update(() => {
                res.write(content);
                res.end();
            });
        });
    }
};
