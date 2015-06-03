import Immutable from 'immutable';
import app from '../app';
import ActivityActions from '../actions/activity';

class ActivityStore {
    constructor() {
        this.bindListeners({
            onFind: ActivityActions.find,
            onFindComplete: ActivityActions.findComplete,
            onFindFail: ActivityActions.findFail
        });

        this.state = Immutable.Map();
    }

    onFind() {
        this.setState(Immutable.Map());
    }

    onFindComplete(entries) {
        this.setState(entries);
    }

    onFindFail() {
        this.setState(Immutable.Map());
    }
}

export default app.createStore(ActivityStore);
