export default {
    generateGuid(beacon) {
        let result = '';

        if (beacon) {
            result += this.formatUuid(beacon);
            result += beacon.major || 'x';
            result += beacon.minor || 'x';
        }

        return result.toLowerCase();
    },

    formatUuid(beacon) {
        if (!beacon) {
            return '';
        }

        return (beacon.uuid || '').replace(/-/g, '').toLowerCase();
    }
};
