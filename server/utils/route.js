import logger from '../services/logger';

export default {
    isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.status(401).end();
    },

    onError(req, res, err) {
        logger.error(err);
        res.status(500).end();
    }
};
