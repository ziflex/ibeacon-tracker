import React from 'react';
import {RouteHandler} from 'react-router';
import Header from './header';
import Sidebar from './sidebar';
import Notification from './notification';

export default React.createClass({
    render() {
        return (
            <div>
                <Header />
                <div className="col-sm-3 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-sm-9 col-sm-offset-3 col-md-10  col-md-offset-2 main">
                    <RouteHandler />
                </div>
                <Notification />
            </div>
        );
    }
});
