import React from 'react/addons';
import AuthenticationActions from '../../actions/authentication';

export default React.createClass({
    propTypes: {
        disabled: React.PropTypes.bool
    },
    mixins: [
        React.addons.LinkedStateMixin
    ],
    getInitialState() {
        return {
            username: '',
            password: ''
        };
    },
    _onSubmit(event) {
        event.preventDefault();
        AuthenticationActions.login(this.state.username, this.state.password);
    },
    render() {
        const attrs = {};

        if (this.props.disabled) {
            attrs.disabled = true;
        }

        return (
            <form className="form-login" onSubmit={this._onSubmit}>
                <label htmlFor="inputUsername" className="sr-only">Username</label>
                <input
                    type="text"
                    id="inputUsername"
                    className="form-control"
                    placeholder="Username" required=""
                    autoFocus=""
                    valueLink={this.linkState('username')}
                    {...attrs}
                />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required=""
                    valueLink={this.linkState('password')}
                    {...attrs}
                />
                <button className="btn btn-lg btn-primary btn-block" type="submit" {...attrs}>
                    {this.disabled ? 'Wait...' : 'Login'}
                </button>
            </form>
        );
    }
});
