import React from 'react/addons';
import cn from 'classnames';
import { Navigation } from 'react-router';
import RegistryActions from '../../../actions/registry';
import uuid from '../../../../../../shared/utils/uuid';

export default React.createClass({
    propTypes: {
        number: React.PropTypes.number.isRequired,
        item: React.PropTypes.object.isRequired
    },
    mixins: [
        React.addons.PureRenderMixin,
        Navigation
    ],
    _onEdit() {
        this.transitionTo('/home/registry/edit/:id', { id: this.props.item.id });
    },
    _onDelete() {
        RegistryActions.delete(this.props.item.id);
    },
    render() {
        const subNum = this.props.item.subscribers.count();
        const enabled = cn({
            'glyphicon-ok-circle': this.props.item.enabled,
            'glyphicon-ban-circle': !this.props.item.enabled,
            'glyphicon': true
        });

        return (
            <tr>
                <td>{this.props.number}</td>
                <td><span className={enabled} aria-hidden="true"></span></td>
                <td>{this.props.item.name}</td>
                <td>{uuid.format(this.props.item.uuid)}</td>
                <td>{this.props.item.major}</td>
                <td>{this.props.item.minor}</td>
                <td>{subNum}</td>
                <td><button type="button" className="btn btn-success" onClick={this._onEdit}>Edit</button></td>
                <td><button type="button" className="btn btn-danger" onClick={this._onDelete}>Delete</button></td>
            </tr>
        );
    }
});
