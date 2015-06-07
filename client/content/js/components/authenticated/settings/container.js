import React from 'react';
import UserSettings from './user';
import AsyncState from '../../../enums/async-states';

export default React.createClass({
    propTypes: {
        settings: React.PropTypes.object.isRequired,
        auth: React.PropTypes.object.isRequired
    },

    render() {
        const pending = this.props.settings.get('async-state') === AsyncState.PENDING;

        return (
            <div>
                <UserSettings username={this.props.auth.get('username')} disabled={pending} />
            </div>
        );
    }
});
