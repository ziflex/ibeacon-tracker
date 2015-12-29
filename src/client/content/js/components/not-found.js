import React from 'react/addons';
import { State } from 'react-router';

export default React.createClass({
    mixins: [
        State
    ],

    statics: {
        willTransitionTo: (transition, params, query, callback) => {
            transition.redirect('home');
            callback();
        }
    },

    render() {
        return (
            <h2>Oops, page not found.</h2>
        );
    }
});
