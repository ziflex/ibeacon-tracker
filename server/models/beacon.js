import mongoose from 'mongoose';

export default mongoose.model('Beacon', {
    uuid: String,
    major: Number,
    minor: Number,
    subscribers: Array
});
