import Immutable from 'immutable';
import app from '../app';

const Notification = Immutable.Record({
    message: '',
    level: 'info'
});

class NotificationStore {
    constructor() {
        this.state = new Notification();
    }

    onInfo(message) {
        this.setState(this.state.merge({
            message: message,
            level: 'info'
        }));
    }

    onError(message) {
        this.setState(this.state.merge({
            message: message,
            level: 'error'
        }));
    }
}

export default app.createStore(NotificationStore);
