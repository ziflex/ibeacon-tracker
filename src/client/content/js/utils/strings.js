export default {
    isJSON(value) {
        let result = true;

        try {
            JSON.parse(value);
        } catch (ex) {
            result = false;
        }

        return result;
    }
};
