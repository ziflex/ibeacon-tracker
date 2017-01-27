export function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.status(401).end();
}

export function ok(req, res) {
    return res.status(200).end();
}

export function bad(req, res, msg = 'Bad request') {
    return res.status(400).json({ message: msg });
}

export function error(req, res, err) {
    if (req.logger) {
        req.logger.error(err);
    }

    return res.status(500).end();
}
