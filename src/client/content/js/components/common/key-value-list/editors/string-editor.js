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
        const initialValue = this.props.valueLink.value;
        return {
            value: initialValue ? initialValue.toString() : ''
        };
    },

    render() {
        return (
            <Input className="form-control"
                   type="text"
                   placeholder="value"
                   value={this.state.value}
                   validationError={this.props.validationError}
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
