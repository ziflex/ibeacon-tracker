import React from 'react/addons';
import Input from '../../form/input';

export default React.createClass({
    propTypes: {
        valueLink: React.PropTypes.object.isRequired,
        validationError: React.PropTypes.string
    },
    mixins: [
        React.addons.PureRenderMixin
    ],
    getInitialState() {
        return {
            value: JSON.stringify(this.props.valueLink.value)
        };
    },
    _onChange(event) {
        const value = event.target.value;

        this.setState({ value });

        if (this.props.valueLink) {
            this.props.valueLink.requestChange(value);
        }
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
    }
});
