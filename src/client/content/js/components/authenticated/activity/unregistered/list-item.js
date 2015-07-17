import React from 'react/addons';
import {Navigation} from 'react-router';
import uuid from '../../../../../../../shared/utils/uuid';
import moment from 'moment';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        Navigation
    ],

    propTypes: {
        index: React.PropTypes.number.isRequired,
        item: React.PropTypes.object.isRequired
    },

    render() {
        const number = this.props.index + 1;

        return (
            <tr>
                <td>{number}</td>
                <td>{uuid.format(this.props.item.uuid)}</td>
                <td>{this.props.item.major}</td>
                <td>{this.props.item.minor}</td>
                <td>{this.props.item.proximity}</td>
                <td>{this.props.item.accuracy.toFixed(4)}</td>
                <td>{this.props.item.measuredPower}</td>
                <td>{moment(this.props.item.lastSeen).fromNow()}</td>
                <td><button type="button" className="btn btn-success" onClick={this._onRegister}>Register</button></td>
            </tr>
        );
    },

    _onRegister() {
        this.transitionTo('registry-new', null, {
            uuid: this.props.item.uuid,
            major: this.props.item.major,
            minor: this.props.item.minor
        });
    }
});
