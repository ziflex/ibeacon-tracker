import Promise from 'bluebird';
import mongoose from 'mongoose';

function createConnectionString(settings) {
    return `mongodb://${settings.host}:${settings.port}/${settings.name}`;
}

export default function create(settings) {
    return function databaseInitializer() {
        return Promise.fromCallback((done) => {
            mongoose.connect(createConnectionString(settings), done);
        });
    };
}
