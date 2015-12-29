import { EventEmitter } from 'events';
import Symbol from 'symbol';

const EMITTER = Symbol('EMITTER');

class EventHubService {
    constructor() {
        this[EMITTER] = new EventEmitter();
    }

    on(eventName, handler) {
        this[EMITTER].addListener(eventName, handler);
    }

    off(eventName, handler) {
        this[EMITTER].removeListener(eventName, handler);
    }

    emit(...args) {
        process.nextTick(() => {
            this[EMITTER].emit(...args);
        });
    }
}

export default new EventHubService();
