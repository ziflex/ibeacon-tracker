import client from 'superagent';
import Promise from 'bluebird';
import settings from '../settings';

class AuthenticationService {

    login(username, password) {
        return new Promise((resolve, reject) => {
            client.post(settings.endpoint + '/auth/login')
                .send({ username, password })
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

    logout() {
        return new Promise((resolve, reject) => {
            client.post(settings.endpoint + '/auth/logout')
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

export default new AuthenticationService();
