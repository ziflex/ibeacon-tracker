import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    uuid: String,
    major: Number,
    minor: Number,
    name: String,
    subscribers: Array,
    enabled: Boolean
});

schema.index({ uuid: 1, major: -1, minor: -1 });

export default mongoose.model('Beacon', schema);
