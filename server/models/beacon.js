import mongoose from 'mongoose';

export default mongoose.model('Beacon', {
    uuid: String,
    major: Number,
    minor: Number,
    name: String,
    subscribers: Array
});
