import {Strategy} from 'passport-local';
import UserModel from '../models/user';

export default {
    strategy: new Strategy(UserModel.authenticate()),
    serializeUser: UserModel.serializeUser(),
    deserializeUser: UserModel.deserializeUser()
};
