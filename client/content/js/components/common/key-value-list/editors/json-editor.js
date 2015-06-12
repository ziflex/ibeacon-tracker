import React from 'react/addons';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin
    ],

    propTypes: {
        valueLink: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            value: JSON.stringify(this.props.valueLink.value)
        };
    },

    render() {
        return (
            <textarea ref="editor"
                      className="form-control"
                      rows="10"
                      placeholder="value"
                      value={this.state.value}
                      onChange={this._onChange}
                />
        );
    },

    _onChange() {
        const value = event.target.value;

        this.setState({value: value});

        if (this.props.valueLink) {
            this.props.valueLink.requestChange(value);
        }
    }
});
