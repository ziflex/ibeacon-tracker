import Alt from 'alt';
import immutableUtil from 'alt/utils/ImmutableUtil';

class Application extends Alt {
    constructor(config = {}) {
        super(config);
    }

    createStore(model) {
        return super.createStore(immutableUtil(model));
    }
}

export default new Application();
