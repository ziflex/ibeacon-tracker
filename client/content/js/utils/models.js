import map from 'lodash/collection/map';
import set from 'lodash/object/set';
import Immutable from 'immutable';
import Beacon from '../models/beacon';
import Subscriber from '../models/subscriber';

export default {
    mapToBeacon(entry) {
        const subscribers = Immutable.List(map(entry.subscribers, this.mapToSubscriber));
        return new Beacon(set(entry, 'subscribers', subscribers));
    },

    mapToSubscriber(entry) {
        return new Subscriber(entry);
    }
};
