import React from 'react';
import { State, RouteHandler } from 'react-router';
import ReactStateMagicMixin from 'alt/mixins/ReactStateMagicMixin';
import ActivityStore from '../../../stores/activity';
import ActivityActions from '../../../actions/activity';

export default React.createClass({
    mixins: [
        ReactStateMagicMixin,
        State
    ],

    statics: {
        registerStores: {
            items: ActivityStore
        },

        willTransitionTo: (transition, params, query, callback) => {
            ActivityActions.findAll();
            callback();
        }
    },

    render() {
        return (
            <RouteHandler {...this.state} />
        );
    }
});
