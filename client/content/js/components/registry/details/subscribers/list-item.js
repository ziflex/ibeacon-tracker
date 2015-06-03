import React from 'react/addons';
import View from './list-item-view';
import Editor from './list-item-editor';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        React.addons.LinkedStateMixin
    ],

    propTypes: {
        index: React.PropTypes.number.isRequired,
        item: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            edit: false
        };
    },

    render() {
        let control;

        if (!this.state.edit && !this.props.isNew) {
            control = (<View
                index={this.props.index}
                item={this.props.item}
                onEdit={this._onStartEdit}
                onDelete={this._onDelete}
                />);
        } else {
            control = (<Editor
                index={this.props.index}
                item={this.props.item}
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
            this.props.onSave({
                index: this.props.index,
                value: value,
                isNew: this.isNew
            });
        }

        this._onCancelEdit();
    },

    _onDelete(index) {
        if (this.props.onDelete) {
            this.props.onDelete(index);
        }
    }
});
