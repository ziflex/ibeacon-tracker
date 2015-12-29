import React from 'react/addons';
import { Navigation } from 'react-router';
import moment from 'moment';

export default React.createClass({
    propTypes: {
        index: React.PropTypes.number.isRequired,
        item: React.PropTypes.object.isRequired
    },
    mixins: [
        React.addons.PureRenderMixin,
        Navigation
    ],
    render() {
        const number = this.props.index + 1;

        return (
            <tr>
                <td>{number}</td>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.proximity}</td>
                <td>{this.props.item.accuracy.toFixed(4)}</td>
                <td>{this.props.item.measuredPower}</td>
                <td>{moment(this.props.item.lastSeen).fromNow()}</td>
            </tr>
        );
    }
});
