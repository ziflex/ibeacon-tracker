import {Record} from 'immutable';

const Enum = Record({
    FOUND: 'beacon:found',
    LOST: 'beacon:lost'
});

export default new Enum();
