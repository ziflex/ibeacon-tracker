import UserModel from '../models/user';

export default {
    configure(passport) {
        passport.use(UserModel.createStrategy());
        passport.serializeUser(UserModel.serializeUser());
        passport.deserializeUser(UserModel.deserializeUser());
    }
};
