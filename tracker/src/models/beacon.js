import mongoose from 'mongoose';

export default mongoose.model('Beacon', {
    uuid: String,
    major: String,
    minor: String,
    lastSeen: { type: Date, 'default': Date.now },
    subscribers: Array
});
