'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {
    generateGuid: function generateGuid(beacon) {
        var result = [];

        if (beacon) {
            result.push(this.formatUuid(beacon));
            result.push(beacon.major || 'x');
            result.push(beacon.minor || 'x');
        }

        return result.join('').toLowerCase();
    },

    formatUuid: function formatUuid(beacon) {
        if (!beacon) {
            return '';
        }

        return (beacon.uuid || '').replace(/:/g, '').toLowerCase();
    }
};
module.exports = exports['default'];