import Immutable from 'immutable';
import app from '../app';
import ActivityActions from '../actions/activity';

class ActivityStore {
    constructor() {
        this.bindListeners({
            onFindAllComplete: ActivityActions.findAllComplete,
            onFindAllFail: ActivityActions.findAllFail,
            onFindRegisteredComplete: ActivityActions.findRegisteredComplete,
            onFindRegisteredFail: ActivityActions.findRegisteredFail,
            onFindUnregisteredComplete: ActivityActions.findUnregisteredComplete,
            onFindUnregisteredFail: ActivityActions.findUnregisteredFail
        });

        this.state = Immutable.Map();
    }

    onFindAllComplete(entries) {
        this.setState(this.state.set('registered', entries.registered));
        this.setState(this.state.set('unregistered', entries.unregistered));
    }

    onFindAllFail() {
        this.setState(this.state.set('registered', Immutable.Map()));
        this.setState(this.state.set('unregistered', Immutable.Map()));
    }

    onFindRegisteredComplete(entries) {
        this.setState(this.state.set('registered', entries));
    }

    onFindRegisteredFail() {
        this.setState(this.state.set('registered', Immutable.Map()));
    }

    onFindUnregisteredComplete(entries) {
        this.setState(this.state.set('unregistered', entries));
    }

    onFindUnregisteredFail() {
        this.setState(this.state.set('unregistered', Immutable.Map()));
    }
}

export default app.createStore(ActivityStore);
