import React from 'react/addons';
import {List} from 'immutable';
import Item from './list-item';
import DynamicEventsMixin from '../../../../mixins/dynamic-events-mixin';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        DynamicEventsMixin
    ],

    propTypes: {
        items: React.PropTypes.array,
        onChange: React.PropTypes.func
    },

    getInitialState() {
        return {
            items: this.props.items
        }
    },

    render() {
        let num = 0;

        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Method</th>
                            <th>Url</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.items.toSeq().map(item => {
                            num += 1;
                            return (<Item
                                    key={item.method + item.url + num}
                                    isNew={item.isNew || false}
                                    number={num}
                                    name={item.name}
                                    method={item.method}
                                    url={item.url}
                                    onSave={this.delegateAs('onSave')}
                                    onDelete={this.delegateAs('onDelete')}
                                />
                            );
                        }).toArray()}
                    </tbody>
                </table>
                <div className="btn-group pull-right">
                    <button type="button" className="btn btn-success" onClick={this._onAdd}>Add</button>
                </div>
            </div>
        );
    },

    _onAdd() {
        this.setState({
            items: this.state.items.push({
                isNew: true
            })
        });
    }
});
