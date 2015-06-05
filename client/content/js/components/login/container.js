import React from 'react/addons';
import Form from './form';
import AsyncState from '../../enums/async-states';

export default React.createClass({
    propTypes: {
        authentication: React.PropTypes.object.isRequired
    },

    render() {
        const pending = this.props.authentication.get('async-state') === AsyncState.PENDING;

        return (
            <div className="container login-page">
                <Form disabled={pending} />
            </div>
        );
    }
});
