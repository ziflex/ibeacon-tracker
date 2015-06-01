import React from 'react';
import {Link, State} from 'react-router';

export default React.createClass({
    mixins: [State],
    propTypes: {
        to: React.PropTypes.string.isRequired,
        params: React.PropTypes.object,
        query: React.PropTypes.object,
        children: React.PropTypes.string
    },
    render() {
        const isActive = this.isActive(this.props.to, this.props.params, this.props.query);
        return (
            <li className={isActive ? 'active' : null}>
                <Link {...this.props}>{this.props.children}</Link>
            </li>
        );
    }
});
