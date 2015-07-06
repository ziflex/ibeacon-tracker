import React from 'react';
import ReactStateMagicMixin from 'alt/mixins/ReactStateMagicMixin';
import SettingsStore from '../../../stores/settings';
import AuthenticationStore from '../../../stores/authentication';
import Container from './container';

export default React.createClass({
    mixins: [
        ReactStateMagicMixin
    ],

    statics: {
        registerStores: {
            settings: SettingsStore,
            auth: AuthenticationStore
        }
    },

    render() {
        return (
            <Container {...this.state} />
        );
    }
});
