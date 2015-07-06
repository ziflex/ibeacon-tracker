import {Record, Map} from 'immutable';
import methods from '../enums/subscriber-methods';

export default Record({
    name: '',
    event: '',
    method: methods.GET,
    url: '',
    headers: Map(),
    params: Map(),
    data: Map()
});
