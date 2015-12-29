import Promise from 'bluebird';
import UserModel from '../models/user';

function initializeUsers() {
    return new Promise((resolve, reject) => {
        UserModel.findByUsername('admin', (err, user) => {
            if (!err) {
                if (!user) {
                    return UserModel.register(new UserModel({ username: 'admin' }), 'admin', (regErr) => {
                        if (!regErr) {
                            return resolve();
                        }

                        return reject(regErr);
                    });
                }

                return resolve();
            }

            return reject(err);
        });
    });
}

export default {
    initialize(callback) {
        initializeUsers().then(callback).catch(callback);
    }
};
