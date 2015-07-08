import React from 'react/addons';
import LinkedImmutableStateMixin from 'reactlink-immutable';
import DynamicEventsMixin from '../../../mixins/dynamic-events-mixin';
import Dropdown from '../dropdown';
import StringEditor from './editors/string-editor';
import JsonEditor from './editors/json-editor';
import utils from '../../../utils/components';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        LinkedImmutableStateMixin,
        DynamicEventsMixin
    ],

    propTypes: {
        index: React.PropTypes.number.isRequired,
        types: React.PropTypes.object,
        item: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func,
        onCancel: React.PropTypes.func
    },

    getInitialState() {
        return {
            item: this.props.item
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
                        valueLink={this.linkImmutableState(['item', 'key'])}
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

        if (this.state.item.type === 'string') {
            editor = (<StringEditor valueLink={this.linkImmutableState(['item', 'key'])} />);
        } else {
            editor = (<JsonEditor valueLink={this.linkImmutableState(['item', 'key'])} />);
        }

        return <td>{editor}</td>;
    },

    _renderItemTypeEditor() {
        let editor = null;

        if (this.props.types && this.props.types.count() > 1) {
            editor = (
                <td>
                    <Dropdown items={utils.createDropdownList(this.props.types, this.state.item.type)} valueLink={this.linkImmutableState(['item', 'type'])} />
                </td>
            );
        }

        return editor;
    },

    _onSave() {
        if (this.props.onSave) {
            this.props.onSave({
                index: this.props.index,
                item: this.state.item
            });
        }
    }
});
