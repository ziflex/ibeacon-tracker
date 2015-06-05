import UserModel from '../models/user';

export default {
    configure(passport, callback) {
        passport.use(UserModel.createStrategy());
        passport.serializeUser(UserModel.serializeUser());
        passport.deserializeUser(UserModel.deserializeUser());

        UserModel.findByUsername('admin', (err, user) => {
            if (!err) {
                if (!user) {
                    UserModel.register(new UserModel({username: 'admin'}), 'admin', (regErr) => {
                        callback(regErr);
                    });
                } else {
                    callback();
                }
            } else {
                callback(err);
            }
        });
    }
};
