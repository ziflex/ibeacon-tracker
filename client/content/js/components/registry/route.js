import React from 'react';
import {State, RouteHandler} from 'react-router';
import ReactStateMagicMixin from 'alt/mixins/ReactStateMagicMixin';
import RegistryStore from '../../stores/registry';
import RegistryActions from '../../actions/registry';

export default React.createClass({
    mixins: [ReactStateMagicMixin, State],
    statics: {
        registerStores: {
            entries: RegistryStore
        },
        willTransitionTo: (transition, params, query, callback) => {
            RegistryActions.find();
            callback();
        }
    },
    render() {
        return (
            <RouteHandler {...this.state} />
        );
    }
});
