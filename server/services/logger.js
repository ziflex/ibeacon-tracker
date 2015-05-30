import bunyan from 'bunyan';
import _ from 'lodash-node';
import settings from '../settings';

export default bunyan.createLogger(_.defaults(settings.logger, {name: settings.name}));
