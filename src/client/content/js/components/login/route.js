import React from 'react/addons';
import { State, Navigation } from 'react-router';
import ReactStateMagicMixin from 'alt/mixins/ReactStateMagicMixin';
import AuthenticationStore from '../../stores/authentication';
import Container from './container';

export default React.createClass({
    mixins: [
        ReactStateMagicMixin,
        Navigation,
        State
    ],

    statics: {
        registerStores: {
            authentication: AuthenticationStore
        },

        willTransitionTo: (transition, params, query, callback) => {
            if (AuthenticationStore.getState().get('done')) {
                transition.redirect('activity');
            }

            callback();
        }
    },

    render() {
        return (
            <Container {...this.state} />
        );
    }
});
