import settings from '../settings';
import util from '../utils/route';
import UserModel from '../models/user';
import _ from 'lodash';

const route = '/settings';

function changePassword(req, res) {
    if (_.isEmpty(req.body)) {
        return util.bad(res);
    }

    const { username, newPassword } = req.body;

    if (_.isEmpty(username) || _.isEmpty(newPassword)) {
        return util.bad(res);
    }

    UserModel.findByUsername(username, (err, user) => {
        if (!err) {
            if (user) {
                return user.setPassword(newPassword, (setPasswordErr) => {
                    if (!setPasswordErr) {
                        return user.save(saveErr => {
                            if (!saveErr) {
                                return util.ok(res);
                            }

                            return util.error(res, saveErr);
                        });
                    }

                    return util.error(res, setPasswordErr);
                });
            }

            return util.bad(res, 'Invalid username');
        }

        return util.error(res, err);
    });
}

export default {
    use(router) {
        router.post(settings.server.apiEndpoint + route + '/user/password', util.isAuthenticated, changePassword);
    }
};
