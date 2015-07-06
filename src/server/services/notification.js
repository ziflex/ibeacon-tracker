import superagent from 'superagent';
import _ from 'lodash';
import logger from './logger';

function buildRequest(event, beacon, subscriber) {
    let method = (subscriber.method || 'get').toLowerCase();
    let request = null;
    const data = {
        event: event,
        uuid: beacon.uuid,
        major: beacon.major,
        minor: beacon.minor
    };

    if (method === 'post') {
        request = superagent.post(subscriber.url);
    } else {
        request = superagent.get(subscriber.url);
    }

    if (subscriber.headers) {
        _.forEach(subscriber.headers, (value, name) => {
            request.set(name, value);
        });
    }

    if (subscriber.params) {
        request.query(subscriber.params);
    }

    if (method === 'post') {
        if (subscriber.data) {
            request.send(subscriber.data);
        } else {
            request.send(data);
        }
    } else {
        request.query(data);
    }

    return request;
}

function isValid(subscriber, event) {
    return subscriber && !_.isEmpty(subscriber.url) && (!subscriber.event || subscriber.event === event);
}

class NotificationService {
    notify(event, beacon) {
        if (!beacon || !beacon.subscribers || !beacon.subscribers.length) {
            return;
        }

        _.forEach(beacon.subscribers, (subscriber) => {
            if (isValid(subscriber, event)) {
                buildRequest(event, beacon, subscriber).end((err) => {
                    if (!err) {
                        logger.info('Sent', event, 'notification to', subscriber.url);
                    } else {
                        logger.error(new Error('Failed to send notification to ' + subscriber.url + '.\n' + err.toString()));
                    }
                });
            }
        });
    }
}

export default new NotificationService();
