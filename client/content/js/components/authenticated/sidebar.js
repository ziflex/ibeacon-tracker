import React from 'react';
import {State} from 'react-router';
import NavLink from '../common/nav-link';

export default React.createClass({
    mixins: [State],

    render() {
        return (
            <div className="sidebar">
                <ul className="nav nav-sidebar">
                    <NavLink to="/home/activity">Activity</NavLink>
                    <NavLink to="/home/registry" nested={['edit', ':id']} params={this.getParams()}>Registry</NavLink>
                    <NavLink to="/home/settings">Settings</NavLink>
                </ul>
            </div>
        );
    }
});
