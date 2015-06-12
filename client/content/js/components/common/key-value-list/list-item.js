import React from 'react/addons';
import View from './list-item-view';
import Editor from './list-item-editor';
import isEmpty from 'lodash/lang/isEmpty';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        React.addons.LinkedStateMixin
    ],

    propTypes: {
        itemKey: React.PropTypes.string.isRequired,
        itemValue: React.PropTypes.any.isRequired,
        itemType: React.PropTypes.string.isRequired,
        types: React.PropTypes.object
    },

    getInitialState() {
        const isNew = isEmpty(this.props.itemKey);

        return {
            edit: isNew,
            isNew: isNew
        };
    },

    render() {
        let control;

        if (!this.state.edit) {
            control = (<View
                {...this.props}
                onEdit={this._onStartEdit}
                onDelete={this._onDelete}
                />);
        } else {
            control = (<Editor
                {...this.props}
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
        if (!this.state.isNew) {
            this.setState({
                edit: false
            });
        } else {
            this._onDelete(this.props.itemKey);
        }
    },

    _onSave(options) {
        if (this.props.onSave) {
            this.props.onSave(options);
        }

        this.setState({
            edit: false
        });
    },

    _onDelete(index) {
        if (this.props.onDelete) {
            this.props.onDelete(index);
        }
    }
});
