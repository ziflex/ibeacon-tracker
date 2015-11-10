import React from 'react';
import {Link, State} from 'react-router';
import any from 'lodash/collection/any';

export default React.createClass({
    propTypes: {
        to: React.PropTypes.string.isRequired,
        params: React.PropTypes.object,
        query: React.PropTypes.object,
        children: React.PropTypes.any,
        nested: React.PropTypes.array
    },
    mixins: [
        State
    ],
    render() {
        let isActive = this.isActive(this.props.to, this.props.params, this.props.query);

        if (!isActive && this.props.nested) {
            let to = this.props.to;

            isActive = any(this.props.nested, (part) => {
                let result = false;
                to += '/' + part;

                // super ugly
                try {
                    const href = this.context.router.makeHref(to, this.props.params, this.props.query);
                    result = this.isActive(href, this.props.params, this.props.query);
                } catch (ex) {
                    result = false;
                }

                return result;
            });
        }

        return (
            <li className={isActive ? 'active' : null}>
                <Link {...this.props}>{this.props.children}</Link>
            </li>
        );
    }
});
