export default {
    createDropdownList(items, value) {
        const currentValue = value ? value.toLowerCase().trim() : '';

        return items.toSeq().map((val, key) => {
            const normalized = val.toLowerCase();
            return {
                text: key.toUpperCase(),
                value: val.toLowerCase(),
                selected: currentValue === normalized
            };
        }).toList();
    }
};
