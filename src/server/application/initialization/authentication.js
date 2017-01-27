import passport from 'passport';

export default function create(userRepository) {
    return function authenticationInitializer() {
        passport.use(userRepository.createStrategy());
        passport.serializeUser(userRepository.serializeUser());
        passport.deserializeUser(userRepository.deserializeUser());
    };
}
