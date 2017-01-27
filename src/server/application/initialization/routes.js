import forEach from 'lodash/forEach';

export default function create(server, routes) {
    return function routesInitializer() {
        forEach(routes, route => route(server));
    };
}
