import React from 'react/addons';
import DynamicEventsMixin from '../../../mixins/dynamic-events-mixin';
import Dropdown from '../dropdown';
import StringEditor from './editors/string-editor';
import JsonEditor from './editors/json-editor';
import utils from '../../../utils/components';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        React.addons.LinkedStateMixin,
        DynamicEventsMixin
    ],

    propTypes: {
        types: React.PropTypes.object,
        itemKey: React.PropTypes.string.isRequired,
        itemValue: React.PropTypes.any.isRequired,
        itemType: React.PropTypes.string.isRequired,
        onSave: React.PropTypes.func,
        onCancel: React.PropTypes.func
    },

    getInitialState() {
        return {
            itemKey: this.props.itemKey,
            itemValue: this.props.itemValue,
            itemType: this.props.itemType || 'string'
        };
    },

    render() {
        return (
            <tr>
                <td>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="key"
                        valueLink={this.linkState('itemKey')}
                        />
                </td>
                {this._renderItemValueEditor()}
                {this._renderItemTypeEditor()}
                <td>
                    <button type="button" className="btn btn-success" onClick={this._onSave}>Save</button>
                </td>
                <td>
                    <button type="button" className="btn btn-default" onClick={this.emitAs('onCancel')}>Cancel</button>
                </td>
            </tr>
        );
    },

    _renderItemValueEditor() {
        let editor = null;

        if (this.state.itemType === 'string') {
            editor = (<StringEditor valueLink={this.linkState('itemValue')} />);
        } else {
            editor = (<JsonEditor valueLink={this.linkState('itemValue')} />);
        }

        return <td>{editor}</td>;
    },

    _renderItemTypeEditor() {
        let editor = null;

        if (this.props.types && this.props.types.count() > 1) {
            editor = (
                <td>
                    <Dropdown items={utils.createDropdownList(this.props.types, this.state.itemType)} valueLink={this.linkState('itemType')} />
                </td>
            );
        }

        return editor;
    },

    _onSave() {
        if (this.props.onSave) {
            this.props.onSave({
                key: this.state.itemKey,
                value: this.state.itemValue,
                type: this.state.itemType
            });
        }
    }
});
