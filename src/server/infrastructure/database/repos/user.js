import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import RepoMixin from './mixins/repo-mixin';

const UserSchema = new mongoose.Schema({});
UserSchema.plugin(passportLocalMongoose);

const FIELDS = {
    model: Symbol('model')
};

const UserRepository = composeClass({
    mixins: [
        RepoMixin(FIELDS.model)
    ],

    constructor() {
        this[FIELDS.model] = Promise.promisifyAll(
          mongoose.model('User', UserSchema)
        );
    },

    findByUsername(username) {
        return this[FIELDS.model].findByUsernameAsync(username);
    },

    register(user) {
        if (!user) {
            return Promise.reject(new Error('"user" is required'));
        }

        const Model = this[FIELDS.model];

        return Model.registerAsync(new Model({ username: user.username }), user.password);
    },

    createStrategy() {
        return this[FIELDS.model].createStrategy();
    },

    serializeUser() {
        return this[FIELDS.model].serializeUser();
    },

    deserializeUser() {
        return this[FIELDS.model].deserializeUser();
    }
});

export default function create(...args) {
    return new UserRepository(...args);
}
