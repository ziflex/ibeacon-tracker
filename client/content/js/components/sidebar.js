import React from 'react';
import {State} from 'react-router';
import NavLink from './nav-link';

export default React.createClass({
    mixins: [State],

    render() {
        return (
            <div className="sidebar">
                <ul className="nav nav-sidebar">
                    <li><NavLink to="/">Activity</NavLink></li>
                    <li><NavLink to="/registry" nested={['edit', ':id']} params={this.getParams()}>Registry</NavLink></li>
                </ul>
            </div>
        );
    }
});
