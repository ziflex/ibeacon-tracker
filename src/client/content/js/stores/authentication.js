import { Map } from 'immutable';
import app from '../app';
import asyncStates from '../enums/async-states';
import AuthenticationActions from '../actions/authentication';

class AuthenticationStore {
    constructor() {
        this.bindActions(AuthenticationActions);
        this.state = Map([
            ['done', false],
            ['username', ''],
            ['async-state', asyncStates.IDLE],
            ['error', '']
        ]);
    }

    onLogin() {
        this.setState(this.state.set('async-state', asyncStates.PENDING));
    }

    onLoginComplete(username) {
        this.setState(this.state.merge(Map([
            ['done', true],
            ['username', username],
            ['async-state', asyncStates.IDLE]
        ])));
    }

    onLoginFail() {
        this.setState(this.state.merge(Map([
            ['done', false],
            ['async-state', asyncStates.IDLE]
        ])));
    }

    onLogoutComplete() {
        this.setState(this.state.merge(Map([
            ['done', false],
            ['username', ''],
            ['async-state', asyncStates.IDLE]
        ])));
    }
}

export default app.createStore(AuthenticationStore);
