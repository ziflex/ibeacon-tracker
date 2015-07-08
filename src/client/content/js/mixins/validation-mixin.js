export default {
    getValidationError(key) {
        let result = null;

        if (this.state.validationErrors) {
            result = this.state.validationErrors[key];
        }

        return result;
    }
};
