import service from '../services/registry';
import app from '../app';

class RegistryActions {
    find() {
        service.findAsync()
            .then(result => this.actions.findComplete(result))
            .catch(reason => this.actions.findFail(reason));
    }

    findComplete(entires) {
        this.dispatch(entires);
    }

    findFail(reason) {
        this.dispatch(reason);
    }

    save(entry) {
        service.saveAsync(entry)
            .then(result => this.actions.saveComplete(result))
            .catch(reason => this.actions.saveFail(reason));
    }

    saveComplete(updatedEntry) {
        this.dispatch(updatedEntry);
    }

    saveFail(reason) {
        this.dispatch(reason);
    }

    delete(id) {
        service.deleteAsync(id)
            .then(result => this.actions.deleteComplete(result))
            .catch(reason => this.actions.deleteFail(reason));
    }

    deleteComplete(result) {
        this.dispatch(result);
    }

    deleteFail(reason) {
        this.dispatch(reason);
    }
}

export default app.createActions(RegistryActions);
