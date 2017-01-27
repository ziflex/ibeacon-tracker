import { Record } from 'immutable';
import { generate as Guid } from '../utils/guid';

const Metadata = Record({
    guid: '',
    uuid: '',
    major: 0,
    minor: 0,
    proximity: 0,
    accuracy: 0,
    measuredPower: 0,
    lastSeen: null
});

export default function create(values) {
    return new Metadata({
        guid: Guid(values),
        lastSeen: new Date(),
        ...values
    });
}
