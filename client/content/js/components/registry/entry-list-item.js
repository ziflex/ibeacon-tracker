import React from 'react/addons';
import {Navigation} from 'react-router';
import RegistryActions from '../../actions/registry';

export default React.createClass({
    mixins: [React.addons.PureRenderMixin, Navigation],
    propTypes: {
        number: React.PropTypes.number.isRequired,
        item: React.PropTypes.object.isRequired
    },
    render() {
        const subscribers = this.props.item.subscribers;
        const subNum = subscribers ? subscribers.length : 0;
        return (
            <tr>
                <td>{this.props.number}</td>
                <td>{this.props.item.uuid}</td>
                <td>{this.props.item.name}</td>
                <td>{subNum}</td>
                <td><button type="button" className="btn btn-primary" onClick={this._onEdit}>Edit</button></td>
                <td><button type="button" className="btn btn-danger" onClick={this._onDelete}>Delete</button></td>
            </tr>
        );
    },
    _onEdit() {
        this.transitionTo('/registry/edit/:id', { id: this.props.item.id });
    },
    _onDelete() {
        RegistryActions.deleteAsync(this.props.item.id);
    }
});
