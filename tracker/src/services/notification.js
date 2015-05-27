class NotificationService {
    notify(beacon) {
        console.info('found device: ', beacon.uuid);
    }
}

export default new NotificationService();
