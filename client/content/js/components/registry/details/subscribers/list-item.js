import React from 'react/addons';
import View from './list-item-view';
import Editor from './list-item-editor';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        React.addons.LinkedStateMixin
    ],

    propTypes: {
        isNew: React.PropTypes.bool.isRequired,
        number: React.PropTypes.number.isRequired,
        method: React.PropTypes.string,
        name: React.PropTypes.string,
        url: React.PropTypes.string
    },

    getInitialState() {
        return {
            edit: false
        };
    },

    render() {
        let control;

        if (!this.state.edit && !this.props.isNew) {
            control = (<View {...this.props}
                number={this.props.number}
                name={this.props.name}
                method={this.props.method}
                url={this.props.url}
                onEdit={this._onStartEdit}
                onDelete={this._onDelete}
                />);
        } else {
            control = (<Editor
                number={this.props.number}
                name={this.props.name}
                method={this.props.method}
                url={this.props.url}
                onSave={this._onSave}
                onCancel={this._onCancelEdit}
                />);
        }

        return control;
    },

    _onStartEdit() {
        this.setState({
            edit: true
        });
    },

    _onCancelEdit() {
        this.setState({
            edit: false
        });
    },

    _onSave(value) {
        if (this.props.onSave) {
            this.props.onSave(this.props.number - 1, value.toJSON(), this.isNew);
        }
    },

    _onDelete(index) {
        if (this.props.onDelete) {
            this.props.onDelete(index);
        }
    }
});
