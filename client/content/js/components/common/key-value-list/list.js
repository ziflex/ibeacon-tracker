import React from 'react/addons';
import Item from './list-item';
import isEmpty from 'lodash/lang/isEmpty';
import isString from 'lodash/lang/isString';
import NotificationActions from '../../../actions/notification';

export default React.createClass({
    propTypes: {
        items: React.PropTypes.object,
        types: React.PropTypes.object,
        onChange: React.PropTypes.func,
        valueLink: React.PropTypes.object
    },

    getInitialState() {
        return {
            items: this.props.items,
            types: this.props.types
        };
    },

    render() {
        let index = -1;

        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                        {this._renderHeader()}
                    </thead>
                    <tbody>
                        {this.state.items.toSeq().map((v, k) => {
                            index += 1;
                            return (
                                <Item
                                    key={index}
                                    index={index}
                                    types={this.props.types}
                                    itemKey={k}
                                    itemValue={v}
                                    itemType={this._getItemType(v)}
                                    onSave={this._onSave}
                                    onDelete={this._onDelete}
                                    />
                            );
                        }).toArray()}
                    </tbody>
                </table>
                <div>
                    <button type="button" className="btn btn-success" onClick={this._onAdd}>Add</button>
                </div>
            </div>
        );
    },

    _renderHeader() {
        const columns = [
            <th key={"key"}>Key</th>,
            <th key={"value"}>Value</th>
        ];

        if (this.props.types && this.props.types.count() > 1) {
            columns.push(<th key={"type"}>Type</th>);
        }

        columns.push(<th key={"edit-save"}></th>);
        columns.push(<th key={"remove-cancel"}></th>);

        return <tr>{columns}</tr>;
    },

    _onAdd() {
        if (this._hasEmptyRow()) {
            return;
        }

        this.setState({
            items: this.state.items.set('', '')
        });
    },

    _onSave(options) {
        let {key, value, type} = options;
        let items = this.state.items;

        if (this._hasEmptyRow()) {
            items = items.remove('');
        }

        if (isEmpty(key) || isEmpty(value)) {
            this.setState({
                items: items
            });

            return;
        }

        if (type === 'json') {
            if (isString(value)) {
                try {
                    value = JSON.parse(value);
                } catch (ex) {
                    NotificationActions.error('Invalid type format');
                    return;
                }
            }
        }

        items = items.set(key, value);

        this.setState({
            items: items
        });

        this._onChange(items);
    },

    _onDelete(key) {
        const items = this.state.items.remove(key);

        this.setState({
            items: items
        });

        this._onChange(items);
    },

    _onChange(items) {
        if (this.props.onChange) {
            this.props.onChange(items);
        }

        if (this.props.valueLink) {
            this.props.valueLink.requestChange(items);
        }
    },

    _hasEmptyRow() {
        return this.state.items.has('');
    },

    _getItemType(value) {
        return isString(value) ? 'string' : 'json';
    }
});
