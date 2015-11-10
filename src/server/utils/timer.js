import _ from 'lodash';

export default {
    setInterval(callback, wait, times) {
        const interval = (function wrapInterval(cb, w, t) {
            let timesLeft = t;

            return function onTimeout() {
                if (_.isUndefined(timesLeft) || timesLeft-- > 0) {
                    try {
                        cb.call(null);
                    } catch (e) {
                        timesLeft = 0;
                        throw e.toString();
                    }

                    setTimeout(interval, w);
                }
            };
        })(callback, wait, times);

        setTimeout(interval, wait);
    }
};
