import hub from 'event-hub';
import HistoryModel from '../models/history';
import Symbol from 'es6-symbol';
import _ from 'lodash';
import events from '../enums/tracking-events';

const IS_STARTED = Symbol('IS_STARTED');
const ON_FOUND = Symbol('ON_FOUND');
const ON_LOST = Symbol('ON_LOST');
const CREATE = Symbol('CREATE');

class HistoryService {
    constructor() {
        this[CREATE] = _.bind(function create(event, beacon) {
            HistoryModel.create({
                date: new Date(),
                event: event,
                uuid: beacon.uuid,
                major: beacon.major,
                minor: beacon.minor
            });
        }, this);

        this[ON_FOUND] = _.bind(function onFound(beacon) {
            this[CREATE](events.FOUND, beacon);
        }, this);

        this[ON_LOST] = _.bind(function onLost(beacon) {
            this[CREATE](events.LOST, beacon);
        }, this);

        this[IS_STARTED] = false;
    }

    start() {
        if (this[IS_STARTED]) {
            throw new Error('Service has been already started');
        }

        this[IS_STARTED] = true;
        hub.on(events.FOUND, this[ON_FOUND]);
        hub.on(events.LOST, this[ON_LOST]);
    }

    stop() {
        if (!this[IS_STARTED]) {
            throw new Error('Service has been already stopped');
        }

        hub.off(events.FOUND, this[ON_FOUND]);
        hub.off(events.LOST, this[ON_LOST]);
        this[IS_STARTED] = false;
    }
}

export default new HistoryService();
