import app from '../app';
import service from '../services/authentication';
import router from '../router';

class AuthenticationActions {
    login(username, password) {
        this.dispatch();
        service.login(username, password)
            .then(() => this.actions.loginComplete(username))
            .catch((reason) => this.actions.loginFail(reason));
    }

    loginComplete(username) {
        this.dispatch(username);
        router.transitionTo('activity');
    }

    loginFail(reason) {
        this.dispatch(reason);
    }

    logout() {
        service.logout()
            .then(() => this.actions.logoutComplete())
            .catch((reason) => this.actions.logoutFail(reason));
    }

    logoutComplete() {
        this.dispatch();
    }

    logoutFail(reason) {
        this.dispatch(reason);
    }
}

export default app.createActions(AuthenticationActions);
