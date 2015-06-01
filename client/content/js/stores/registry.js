import Immutable from 'immutable';
import collectionMap from 'lodash/collection/map';
import app from '../app';
import RegistryActions from '../actions/registry';

class RegistryStore {
    constructor() {
        this.bindListeners({
            onFindAsync: RegistryActions.findAsync,
            onFindComplete: RegistryActions.findComplete,
            onSaveComplete: RegistryActions.saveComplete,
            onDeleteComplete: RegistryActions.deleteComplete
        });
        this.entries = Immutable.Map();
    }

    onFindAsync() {
        this.setState({
            entries: Immutable.Map()
        });
    }

    onFindComplete(entries) {
        this.setState({
            entries: Immutable.Map(collectionMap(entries, (entry) => {
                return [entry.id, entry];
            }))
        });
    }

    onSaveComplete(updatedEntry) {
        this.setState({
            entries: this.entries.set(updatedEntry.id, updatedEntry)
        });
    }

    onDeleteComplete(id) {
        this.setState({
            entries: this.entries.remove(id)
        });
    }
}

export default app.createStore(RegistryStore);
