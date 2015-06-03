import superagent from 'superagent';
import querystring from 'querystring';
import _ from 'lodash';
import logger from './logger';

class NotificationService {
    notify(event, beacon) {
        if (!beacon || !beacon.subscribers || !beacon.subscribers.length) {
            return;
        }

        const data = {
            event: event,
            uuid: beacon.uuid,
            major: beacon.major,
            minor: beacon.minor
        };
        const query = querystring.stringify(data);

        _.forEach(beacon.subscribers, (subscriber) => {
            if (subscriber && !_.isEmpty(subscriber.url)) {
                if (!subscriber.event || subscriber.event === event) {
                    let method = (subscriber.method || 'get').toLowerCase();
                    let request = null;

                    if (method === 'post') {
                        request = superagent.post(subscriber.url).send(data);
                    } else {
                        request = superagent.get(subscriber.url + '/?' + query);
                    }

                    request.end((err) => {
                        if (!err) {
                            logger.info('Sent', event, 'notification to', subscriber.url);
                        } else {
                            logger.warn(new Error('Failed to send notification to ' + subscriber.url + '. ' + err.toString()));
                        }
                    });
                }
            }
        });
    }
}

export default new NotificationService();
