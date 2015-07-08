import React from 'react/addons';
import Input from '../../form/input';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin
    ],

    propTypes: {
        valueLink: React.PropTypes.object.isRequired,
        validationError: React.PropTypes.string
    },

    getInitialState() {
        return {
            value: JSON.stringify(this.props.valueLink.value)
        };
    },

    render() {
        return (
            <Input
                type="textarea"
                className="form-control"
                placeholder="value"
                validationError={this.props.validationError}
                value={this.state.value}
                onChange={this._onChange}
                />
        );
    },

    _onChange(event) {
        const value = event.target.value;

        this.setState({value: value});

        if (this.props.valueLink) {
            this.props.valueLink.requestChange(value);
        }
    }
});
