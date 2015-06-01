import superagent from 'superagent';
import app from '../app';
import settings from '../settings';

class RegistryActions {
    findAsync() {
        superagent.get(settings.endpoint + '/registry/find')
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (!err) {
                    this.actions.findComplete(res.body);
                } else {
                    this.actions.findFail(err);
                }
            });
    }

    findComplete(entires) {
        this.dispatch(entires);
    }

    findFail(reason) {
        this.dispatch(reason);
    }

    saveAsync(entry) {
        superagent.post(settings.endpoint + '/registry/save')
            .send(entry)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (!err) {
                    this.actions.saveComplete(res.body);
                } else {
                    this.actions.saveFail(err);
                }
            });
    }

    saveComplete(updatedEntry) {
        this.dispatch(updatedEntry);
    }

    saveFail(reason) {
        this.dispatch(reason);
    }

    deleteAsync(id) {
        superagent.post(settings.endpoint + '/registry/delete')
            .send({id: id})
            .set('Accept', 'application/json')
            .end((err) => {
                if (!err) {
                    this.actions.deleteComplete(id);
                } else {
                    this.actions.deleteFail(err);
                }
            });
    }

    deleteComplete() {
        this.dispatch();
    }

    deleteFail(reason) {
        this.dispatch(reason);
    }
}

export default app.createActions(RegistryActions);
