import app from '../app';
import service from '../services/settings';

class SettingsActions {
    changePassword(username, newPassword) {
        this.dispatch();
        service.changePasswordAsync(username, newPassword)
            .then(() => this.actions.changePasswordComplete())
            .catch((reason) => this.actions.changePasswordFail(reason));
    }

    changePasswordComplete() {
        this.dispatch();
    }

    changePasswordFail(reason) {
        this.dispatch(reason);
    }
}

export default app.createActions(SettingsActions);
