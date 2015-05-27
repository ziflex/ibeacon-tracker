import fs from 'fs';
import path from 'path';

export default {
    registerRoutes(server) {
        const normalizedPath = path.join(__dirname, 'routes');

        fs.readdirSync(normalizedPath).forEach((file) => {
            let route = require('./routes/' + file);

            if (route.use) {
                route.use(server);
            }
        });
    }
};
