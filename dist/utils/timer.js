'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

exports['default'] = {
    setInterval: function setInterval(callback, wait, times) {
        var interval = (function wrapInterval(cb, w, t) {
            var timesLeft = t;

            return function onTimeout() {
                if (_lodash2['default'].isUndefined(timesLeft) || timesLeft-- > 0) {
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
module.exports = exports['default'];