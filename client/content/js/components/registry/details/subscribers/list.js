import React from 'react/addons';
import Item from './list-item';
import DynamicEventsMixin from '../../../../mixins/dynamic-events-mixin';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        DynamicEventsMixin
    ],

    propTypes: {
        items: React.PropTypes.object,
        onChange: React.PropTypes.func
    },

    render() {
        let index = -1;

        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Event</th>
                            <th>Method</th>
                            <th>Url</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.items.toSeq().map(i => {
                            index += 1;
                            return (<Item
                                    key={i.toJSON()}
                                    index={index}
                                    item={i}
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
    }
});
