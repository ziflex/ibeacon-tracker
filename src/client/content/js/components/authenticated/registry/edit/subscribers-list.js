import React from 'react/addons';
import Form from './subscriber-form';
import Item from './subscribers-list-item';
import Subscriber from '../../../../models/subscriber';

export default React.createClass({
    propTypes: {
        items: React.PropTypes.object,
        onSave: React.PropTypes.func,
        onDelete: React.PropTypes.func
    },
    mixins: [
        React.addons.PureRenderMixin
    ],
    getInitialState() {
        return {
            editIndex: null
        };
    },
    _onAdd() {
        this.setState({
            editIndex: this.props.items.count(),
            editItem: new Subscriber()
        });
    },
    _onDelete(index) {
        if (this.props.onDelete) {
            this.props.onDelete(index);
        }
    },
    _onEdit(index) {
        this.setState({
            editIndex: index,
            editItem: this.props.items.get(index)
        });
    },
    _onSave(options) {
        this._onCancel();

        if (this.props.onSave) {
            this.props.onSave(options);
        }
    },
    _onCancel() {
        this.setState({
            editIndex: -1,
            editItem: null
        });
    },
    _renderModal() {
        let result = <span></span>;

        if (this.state.editItem) {
            result = (
                <Form
                    show={true}
                    index={this.state.editIndex}
                    item={this.state.editItem}
                    onSave={this._onSave}
                    onCancel={this._onCancel}
                    />
            );
        }

        return result;
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
                                    key={index}
                                    index={index}
                                    item={i}
                                    onEdit={this._onEdit}
                                    onDelete={this._onDelete}
                                />
                            );
                        }).toArray()}
                    </tbody>
                </table>
                <button type="button" className="btn btn-success" onClick={this._onAdd}>Add</button>
                {this._renderModal()}
            </div>
        );
    }
});
