import bunyan from 'bunyan';
import _ from 'lodash';
import settings from '../settings';

export default bunyan.createLogger(_.defaults(settings.logger, { name: settings.name }));
