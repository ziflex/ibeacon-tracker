import service from '../services/activity';
import app from '../app';

class ActivityActions {
    findAll() {
        this.dispatch();

        service.findAllAsync()
            .then(result => this.actions.findAllComplete(result))
            .catch(reason => this.actions.findAllFail(reason));
    }

    findAllComplete(entries) {
        this.dispatch(entries);
    }

    findAllFail(reason) {
        this.dispatch(reason);
    }

    findRegistered() {
        this.dispatch();

        service.findRegisteredAsync()
            .then(result => this.actions.findRegisteredComplete(result))
            .catch(reason => this.actions.findRegisteredFail(reason));
    }

    findRegisteredComplete(entries) {
        this.dispatch(entries);
    }

    findRegisteredFail(reason) {
        this.dispatch(reason);
    }

    findUnregistered() {
        this.dispatch();
        service.findUnregisteredAsync()
            .then(result => this.actions.findUnregisteredComplete(result))
            .catch(reason => this.actions.findUnregisteredFail(reason));
    }

    findUnregisteredComplete(entries) {
        this.dispatch(entries);
    }

    findUnregisteredFail(reason) {
        this.dispatch(reason);
    }
}

export default app.createActions(ActivityActions);
