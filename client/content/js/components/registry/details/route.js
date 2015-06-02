import React from 'react';
import {State, RouteHandler} from 'react-router';
import ReactStateMagicMixin from 'alt/mixins/ReactStateMagicMixin';
import RegistryStore from '../../../stores/registry';

export default React.createClass({
    mixins: [ReactStateMagicMixin, State],
    statics: {
        registerStores: {
            entries: RegistryStore
        }
    },
    render() {
        return (
            <RouteHandler {...this.state} />
        );
    }
});
