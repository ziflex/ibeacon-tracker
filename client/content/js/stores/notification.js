import {Map} from 'immutable';
import app from '../app';
import levels from '../enums/notification-levels';
import NotificationActions from '../actions/notification';
import AuthenticationActions from '../actions/authentication';
import RegistryActions from '../actions/registry';
import ActivityActions from '../actions/activity';

class NotificationStore {
    constructor() {
        this.bindListeners({
            onInfo: NotificationActions.info,
            onError: NotificationActions.error,
            onSuccess: NotificationActions.success,
            onGetListError: [
                RegistryActions.findFail,
                ActivityActions.findFail
            ],
            onAuthenticationError: AuthenticationActions.loginFail,
            onRegistrySaveSuccess: RegistryActions.saveComplete,
            onRegistrySaveError: RegistryActions.saveFail,
            onRegistryDeleteSuccess: RegistryActions.deleteComplete,
            onRegistryDeleteError: RegistryActions.deleteFail
        });

        this.state = Map([
            ['message', ''],
            ['level', levels.INFO]
        ]);
    }

    setMessage(level, message) {
        this.setState(this.state.merge({
            message: message,
            level: level
        }));
    }

    onAuthenticationError() {
        this.setMessage(levels.ERROR, 'Invalid username or password');
    }

    onRegistrySaveSuccess() {
        this.setMessage(levels.SUCCESS, 'Entry is successfully saved');
    }

    onRegistrySaveError() {
        this.setMessage(levels.ERROR, 'Failed to save entry');
    }

    onRegistryDeleteSuccess() {
        this.setMessage(levels.SUCCESS, 'Entry is successfully deleted');
    }

    onRegistryDeleteError() {
        this.setMessage(levels.ERROR, 'Failed to delete entry');
    }

    onGetListError() {
        this.setMessage(levels.ERROR, 'Failed to fetch the list');
    }

    onInfo(message) {
        this.setMessage(levels.INFO, message);
    }

    onSuccess(message) {
        this.setMessage(levels.SUCCESS, message);
    }

    onError(message) {
        this.setMessage(levels.ERROR, message);
    }
}

export default app.createStore(NotificationStore);
