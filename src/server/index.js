import minimist from 'minimist';
import slice from 'lodash/slice';
import Application from './application/index';

Application(minimist(slice(process.argv, 2)));
