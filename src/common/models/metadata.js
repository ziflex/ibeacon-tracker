import get from 'lodash/get';
import { generate as Guid } from '../utils/guid';

export default function create(values) {
    return {
        guid: Guid(values),
        uuid: get(values, 'uuid'),
        major: get(values, 'major'),
        minor: get(values, 'minor'),
        proximity: get(values, 'proximity'),
        accuracy: get(values, 'accuracy'),
        measuredPower: get(values, 'measuredPower'),
        lastSeen: new Date()
    };
}
