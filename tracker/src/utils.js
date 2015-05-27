export default {
    generateGuid(beacon) {
        let result = [];

        if (beacon) {
            result.push(this.formatUuid(beacon));
            result.push(beacon.major || 'x');
            result.push(beacon.minor || 'x');
        }

        return result.join('').toLowerCase();
    },

    formatUuid(beacon) {
        if (!beacon) {
            return '';
        }

        return (beacon.uuid || '').replace(/:/g, '').toLowerCase();
    }
};
