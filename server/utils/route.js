import logger from '../services/logger';

export default {
    isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.status(401).end();
    },

    ok(res) {
        return res.status(200).end();
    },

    bad(res, msg = '') {
        return res.status(400).json({message: msg});
    },

    error(res, err) {
        logger.error(err);
        return res.status(500).end();
    }
};
