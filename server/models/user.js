import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const User = new mongoose.Schema({});
User.plugin(passportLocalMongoose);

export default mongoose.model('User', User);
