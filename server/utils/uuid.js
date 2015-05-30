export default {
    generate(beacon) {
        let result = '';

        if (beacon) {
            result += this.format(beacon);
            result += beacon.major || 'x';
            result += beacon.minor || 'x';
        }

        return result.toLowerCase();
    },

    format(beacon) {
        if (!beacon) {
            return '';
        }

        return (beacon.uuid || '').replace(/-/g, '').toLowerCase();
    }
};
