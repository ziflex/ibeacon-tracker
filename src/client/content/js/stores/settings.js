import { Map } from 'immutable';
import app from '../app';
import asyncStates from '../enums/async-states';
import SettingsActions from '../actions/settings';

class SettingsStore {
    constructor() {
        this.bindActions(SettingsActions);
        this.state = Map([
            ['async-state', asyncStates.IDLE]
        ]);
    }

    onChangePassword() {
        this.setState(this.state.set('async-state', asyncStates.PENDING));
    }

    onChangePasswordComplete() {
        this.setState(this.state.set('async-state', asyncStates.IDLE));
    }

    onChangePasswordFail() {
        this.setState(this.state.set('async-state', asyncStates.IDLE));
    }
}

export default app.createStore(SettingsStore);
