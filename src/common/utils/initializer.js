import Promise from 'bluebird';

export default function create(logger) {
    return function initializer(target, initializers) {
        return Promise.try(() => {
            return Promise.map(initializers, (init) => {
                return Promise.resolve(init(target));
            });
        }).tap(() => {
            logger.debug('Initialization successfully completed.');
        }).catch((err) => {
            logger.debug('Initialization failed:', err.message);

            if (err.stack) {
                logger.debug(err.stack);
            }

            return Promise.reject(err);
        });
    };
}
