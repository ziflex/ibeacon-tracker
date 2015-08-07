import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    date: Date,
    event: String,
    uuid: String,
    major: Number,
    minor: Number
});

schema.index({ uuid: 1, major: -1, minor: -1 });

export default mongoose.model('History', schema);
