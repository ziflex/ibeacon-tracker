import Immutable from 'immutable';
import app from '../app';
import RegistryActions from '../actions/registry';

class RegistryStore {
    constructor() {
        this.bindListeners({
            onFindComplete: RegistryActions.findComplete,
            onFindFail: RegistryActions.findFail,
            onSaveComplete: RegistryActions.saveComplete,
            onDeleteComplete: RegistryActions.deleteComplete
        });

        this.state = Immutable.Map();
    }

    onFindComplete(entries) {
        this.setState(entries);
    }

    onFindFail() {
        this.setState(Immutable.Map());
    }

    onSaveComplete(updatedEntry) {
        this.setState(this.state.set(updatedEntry.id, updatedEntry));
    }

    onDeleteComplete(id) {
        this.setState(this.state.remove(id));
    }
}

export default app.createStore(RegistryStore);
