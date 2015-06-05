import React from 'react';
import {State, RouteHandler} from 'react-router';
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
            entries: ActivityStore
        },

        willTransitionTo: (transition, params, query, callback) => {
            ActivityActions.find();
            callback();
        }
    },

    render() {
        return (
            <RouteHandler {...this.state} />
        );
    }
});
