import service from '../services/activity';
import app from '../app';

class ActivityActions {
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
}

export default app.createActions(ActivityActions);
