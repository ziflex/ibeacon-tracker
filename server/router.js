import fs from 'fs';
import path from 'path';
import express from 'express';

const router = express.Router();
const normalizedPath = path.join(__dirname, 'routes');

fs.readdirSync(normalizedPath).forEach((file) => {
    let route = require('./routes/' + file);

    if (route.use) {
        route.use(router);
    }
});

export default router;
