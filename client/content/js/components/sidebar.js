import React from 'react';
import NavLink from './nav-link';

export default React.createClass({
    render() {
        return (
            <div className="sidebar">
                <ul className="nav nav-sidebar">
                    <li><NavLink to="/">Activity</NavLink></li>
                    <li><NavLink to="/registry">Registry</NavLink></li>
                </ul>
            </div>
        );
    }
});
