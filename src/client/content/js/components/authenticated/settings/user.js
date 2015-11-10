import React from 'react';
import SettingsActions from '../../../actions/settings';

export default React.createClass({
    propTypes: {
        disabled: React.PropTypes.bool,
        username: React.PropTypes.string
    },
    mixins: [
        React.addons.LinkedStateMixin
    ],
    getInitialState() {
        return {
            newPassword: ''
        };
    },
    _onSubmit(event) {
        event.preventDefault();
        SettingsActions.changePassword(this.props.username, this.state.newPassword);
    },
    render() {
        const attrs = {};

        if (this.props.disabled) {
            attrs.disabled = true;
        }

        return (
            <div>
                <h1>Change password</h1>
                <form className="form-horizontal" onSubmit={this._onSubmit}>
                    <div className="form-group">
                        <label htmlFor="inputPassword" className="col-sm-2 control-label">New Password</label>
                        <div className="col-sm-10">
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                placeholder="Password"
                                valueLink={this.linkState('newPassword')}
                                {...attrs}
                                />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <div className="btn-group pull-right">
                                <button type="submit" className="btn btn-success" {...attrs}>Change</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
});
