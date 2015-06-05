import React from 'react';
import {State} from 'react-router';
import NavLink from '../common/nav-link';

export default React.createClass({
    mixins: [State],

    render() {
        return (
            <div className="sidebar">
                <ul className="nav nav-sidebar">
                    <li><NavLink to="/home/activity">Activity</NavLink></li>
                    <li><NavLink to="/home/registry" nested={['edit', ':id']} params={this.getParams()}>Registry</NavLink></li>
                </ul>
            </div>
        );
    }
});
