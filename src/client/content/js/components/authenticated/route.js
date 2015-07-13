import React from 'react/addons';
import {State, RouteHandler} from 'react-router';
import Header from './header';
import Sidebar from './sidebar';
import AuthenticationStore from '../../stores/authentication';

export default React.createClass({
    mixins: [
        State
    ],

    statics: {
        willTransitionTo: (transition, params, query, callback) => {
            if (!AuthenticationStore.getState().get('done')) {
                transition.redirect('login');
            }

            callback();
        }
    },

    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3 col-md-2">
                            <Sidebar />
                        </div>
                        <div className="col-sm-9 col-sm-offset-3 col-md-10  col-md-offset-2 main">
                            <RouteHandler />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
