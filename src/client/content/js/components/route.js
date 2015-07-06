import React from 'react/addons';
import {RouteHandler, State} from 'react-router';
import Notification from './notification';

export default React.createClass({
    mixins: [
        State
    ],

    statics: {
        willTransitionTo: (transition, params, query, callback) => {
            callback();
        }
    },

    render() {
        return (
            <div>
                <RouteHandler />
                <Notification />
            </div>
        );
    }
});
