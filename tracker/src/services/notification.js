import restify from 'restify';
import querystring from 'querystring';
import _ from 'lodash-node';

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
                    let client = restify.createStringClient({
                        url: subscriber.url
                    });

                    let method = (subscriber.method || 'get').toLowerCase();
                    let args = null;
                    let callback = () => {};

                    if (method === 'post' || method === 'put' || method === 'patch') {
                        args = ['/', data, callback];
                    } else {
                        args = ['/?' + query, callback];
                    }

                    client[method].apply(client, args);
                }
            }
        });
    }
}

export default new NotificationService();
