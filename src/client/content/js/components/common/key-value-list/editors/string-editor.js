import React from 'react/addons';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin
    ],

    propTypes: {
        valueLink: React.PropTypes.object.isRequired
    },

    getInitialState() {
        const initialValue = this.props.valueLink.value;
        return {
            value: initialValue ? initialValue.toString() : ''
        };
    },

    render() {
        return (
            <input className="form-control"
                   type="text"
                   placeholder="value"
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
