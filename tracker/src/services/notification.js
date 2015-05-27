import restify from 'restify';
import Promise from 'bluebird';
import settings from '../settings';

const client = restify.createStringClient({
    url: settings.email.host
});

class NotificationService {
    notify(msg) {
        return new Promise((resolve, reject) => {
            client.get('/foo/bar', function(err, req, res, data) {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    }
}

export default new NotificationService();
