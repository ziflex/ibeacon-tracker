import React from 'react';
import {Link, State} from 'react-router';
import any from 'lodash/collection/any';

export default React.createClass({
    mixins: [State],
    propTypes: {
        to: React.PropTypes.string.isRequired,
        params: React.PropTypes.object,
        query: React.PropTypes.object,
        children: React.PropTypes.string,
        nested: React.PropTypes.array
    },
    render() {
        let isActive = this.isActive(this.props.to, this.props.params, this.props.query);

        if (!isActive && this.props.nested) {
            let to = this.props.to;

            isActive = any(this.props.nested, (part) => {
                to += '/' + part;
                let href = this.context.router.makeHref(to, this.props.params, this.props.query);
                return this.isActive(href, this.props.params, this.props.query);
            });
        }

        return (
            <li className={isActive ? 'active' : null}>
                <Link {...this.props}>{this.props.children}</Link>
            </li>
        );
    }
});
