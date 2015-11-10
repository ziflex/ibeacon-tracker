import React from 'react/addons';
import Item from './list-item';
import isEmpty from 'lodash/lang/isEmpty';
import isString from 'lodash/lang/isString';
import isUndefined from 'lodash/lang/isUndefined';
import isNull from 'lodash/lang/isNull';
import KeyValuePair from '../../../models/key-value-pair';

export default React.createClass({
    propTypes: {
        items: React.PropTypes.object,
        types: React.PropTypes.object,
        onChange: React.PropTypes.func,
        valueLink: React.PropTypes.object
    },
    getInitialState() {
        return {
            types: this.props.types,
            items: this._convertPropItems(this.props.items)
        };
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
        this.setState({
            items: this.state.items.set(this.state.items.size, new KeyValuePair())
        });
    },

    _onSave(options) {
        const {index, item} = options;
        let items = this.state.items;
        let valueIsEmpty = false;

        if (isString(item.value)) {
            valueIsEmpty = isEmpty(item.value);
        } else {
            valueIsEmpty = isUndefined(item.value) || isNull(item.value);
        }

        if (isEmpty(item.key) || valueIsEmpty) {
            this.setState({
                items: items.remove(index)
            });

            return;
        }

        items = items.set(index, item);

        this.setState({
            items: items
        });

        this._onChange(this._convertStateItems(items));
    },

    _onDelete(index) {
        const items = this.state.items.remove(index);

        this.setState({
            items: items
        });

        this._onChange(this._convertStateItems(items));
    },

    _onChange(items) {
        if (this.props.onChange) {
            this.props.onChange(items);
        }

        if (this.props.valueLink) {
            this.props.valueLink.requestChange(items);
        }
    },

    _convertStateItems(items) {
        return items.toSeq().mapEntries((entry) => {
            const pair = entry[1];
            return [pair.key, pair.value];
        }).toMap();
    },

    _convertPropItems(items) {
        return items.toSeq().mapEntries((entry, index) => {
            const [key, value] = entry;
            return [index, new KeyValuePair({
                key: key,
                value: value,
                type: isString(value) ? 'string' : 'json',
                isNew: false
            })];
        }).toMap();
    },
    render() {
        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                        {this._renderHeader()}
                    </thead>
                    <tbody>
                        {this.state.items.toSeq().map((item, index) => {
                            return (
                                <Item
                                    key={index}
                                    index={index}
                                    types={this.props.types}
                                    item={item}
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
    }
});
