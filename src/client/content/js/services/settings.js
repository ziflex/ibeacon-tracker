import client from 'superagent';
import Promise from 'bluebird';
import settings from '../settings';

class SettingsService {

    changePasswordAsync(username, newPassword) {
        return new Promise((resolve, reject) => {
            client.post(settings.endpoint + '/settings/user/password')
                .send({ username, newPassword })
                .set('Accept', 'application/json')
                .end((err) => {
                    if (!err) {
                        resolve();
                    } else {
                        reject(err);
                    }
                });
        });
    }
}

export default new SettingsService();
