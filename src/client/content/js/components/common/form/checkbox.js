import React from 'react/addons';
import cn from 'classnames';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin
    ],

    propTypes: {
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        checked: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        valueLink: React.PropTypes.object
    },

    getInitialState() {
        let checked = true;

        if (this.props.valueLink) {
            checked = this.props.valueLink.value;
        } else {
            checked = this.props.checked;
        }

        return {
            checked: checked || false
        };
    },

    render() {
        const id = this.props.id;
        const name = this.props.name;
        const className = cn({
            'toggle': true,
            'btn': true,
            'btn-primary': true,
            'off': !this.state.checked
        });
        return (
            <div className={className} data-toggle="toggle">
                <input
                    id={id}
                    name={name}
                    type="checkbox"
                    checked={this.state.checked}
                    data-toggle="toggle"
                    />
                <div className="toggle-group">
                    <label className="btn btn-primary toggle-on" onClick={this._onToggle}>On</label>
                    <label className="btn btn-default active toggle-off" onClick={this._onToggle}>Off</label>
                    <span className="toggle-handle btn btn-default"></span>
                </div>
            </div>
        );
    },

    _onToggle() {
        const checked = !this.state.checked;

        if (this.props.valueLink) {
            this.props.valueLink.requestChange(checked);
        }

        if (this.props.onChange) {
            this.props.onChange(checked);
        }

        this.setState({checked: checked});
    }
});
