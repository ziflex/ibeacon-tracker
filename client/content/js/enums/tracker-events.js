import {Record} from 'immutable';

const Events = Record({
    ALL: '',
    FOUND: 'found',
    LOST: 'lost'
});

export default new Events();
