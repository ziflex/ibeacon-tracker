import Promise from 'bluebird';

export default function create(userRepository) {
    return function defaultUsersInitializer() {
        return userRepository.findByUsername('admin').then((found) => {
            if (found) {
                return Promise.resolve();
            }

            return userRepository.register({ username: 'admin', password: 'admin' });
        });
    };
}
