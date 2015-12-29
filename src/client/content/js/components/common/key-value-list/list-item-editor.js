import React from 'react/addons';
import LinkedImmutableStateMixin from 'reactlink-immutable';
import DynamicEventsMixin from '../../../mixins/dynamic-events-mixin';
import Dropdown from '../dropdown';
import StringEditor from './editors/string-editor';
import JsonEditor from './editors/json-editor';
import utils from '../../../utils/components';
import Input from '../form/input';
import ValidationError from '../../../mixins/validation-mixin';
import isEmpty from 'lodash/lang/isEmpty';
import isString from 'lodash/lang/isString';

export default React.createClass({
    propTypes: {
        index: React.PropTypes.number.isRequired,
        types: React.PropTypes.object,
        item: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func,
        onCancel: React.PropTypes.func
    },
    mixins: [
        React.addons.PureRenderMixin,
        LinkedImmutableStateMixin,
        DynamicEventsMixin,
        ValidationError
    ],
    getInitialState() {
        return {
            item: this.props.item,
            validationErrors: null
        };
    },

    _renderItemValueEditor() {
        let editor = null;

        if (this.state.item.type === 'string') {
            editor = (
                <StringEditor
                    validationError={this.getValidationError('value')}
                    valueLink={this.linkImmutableState(['item', 'value'])}
                />
            );
        } else {
            editor = (
                <JsonEditor
                    validationError={this.getValidationError('value')}
                    valueLink={this.linkImmutableState(['item', 'value'])}
                />
            );
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
            let errors = null;
            let item = this.state.item;

            if (isEmpty(item.key)) {
                errors = {
                    'key': '`key` is required'
                };
            }

            if (isEmpty(item.value)) {
                if (!errors) {
                    errors = {};
                }

                errors.value = '`value` is required';
            } else {
                if (item.type === 'json') {
                    if (isString(item.value)) {
                        try {
                            item = item.set('value', JSON.parse(item.value));
                        } catch (ex) {
                            if (!errors) {
                                errors = {};
                            }

                            errors.value = 'Invalid format!';
                        }
                    }
                }
            }

            if (!errors) {
                if (this.state.validationErrors) {
                    this.setState({
                        validationErrors: null
                    });
                }

                this.props.onSave({
                    index: this.props.index,
                    item
                });
            } else {
                this.setState({
                    validationErrors: errors
                });
            }
        }
    },
    render() {
        return (
            <tr>
                <td>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="key"
                        validationError={this.getValidationError('key')}
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
    }
});
