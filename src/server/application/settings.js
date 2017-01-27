import path from 'path';
import get from 'lodash/get';
import PrettyStream from 'bunyan-prettystream';
import Immutable from 'immutable';

const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

export default function create(params) {
    return Immutable.fromJS({
        name: get(params, 'name', 'ibeacon-tracker'),
        http: {
            port: get(params, 'port', 8080),
            api: {
                route: '/api'
            },
            statics: {
                route: get(params, 'statics.route', '/'),
                directory: get(params, 'statics.directory.path', path.join(__dirname, 'public'))
            },
            session: {
                secret: get(params, 'session.secret', 'ibeacon-tracker'),
                rolling: get(params, 'session.rolling', false),
                store: get(params, 'session.store', null),
                cookie: {
                    path: get(params, 'session.cookie.path', '/'),
                    httpOnly: get(params, 'session.cookie.httpOnly', true),
                    secure: get(params, 'session.cookie.secure', false),
                    maxAge: get(params, 'session.cookie.maxAge', null),
                    domain: get(params, 'session.cookie.domain', null),
                    expires: get(params, 'session.cookie.expires')
                }
            }
        },
        database: {
            host: 'localhost',
            port: 30251,
            name: 'ibeacon-tracker'
        },
        tracking: {
            ttl: 10000,
            interval: 10000
        },
        logging: {
            name: get(params, 'settings.logging.name', 'ibeacon-tracker'),
            stream: prettyStdOut
        }
    });
}
