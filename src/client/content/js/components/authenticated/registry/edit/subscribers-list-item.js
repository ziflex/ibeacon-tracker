import React from 'react/addons';
import DynamicEventsMixin from '../../../../mixins/dynamic-events-mixin';
import subscriberMethods from '../../../../enums/subscriber-methods';
import trackerEvents from '../../../../enums/tracker-events';

export default React.createClass({
    propTypes: {
        index: React.PropTypes.number.isRequired,
        item: React.PropTypes.object.isRequired,
        onEdit: React.PropTypes.func,
        onDelete: React.PropTypes.func
    },
    mixins: [
        React.addons.PureRenderMixin,
        DynamicEventsMixin
    ],
    render() {
        const num = this.props.index + 1;
        const event = trackerEvents.keyOf((this.props.item.event || '').toLowerCase());
        const method = subscriberMethods.keyOf((this.props.item.method || '').toLowerCase());

        return (
            <tr>
                <td>
                    {num}
                </td>
                <td>
                    {this.props.item.name}
                </td>
                <td>
                    {event}
                </td>
                <td>
                    {method}
                </td>
                <td>
                    {this.props.item.url}
                </td>
                <td>
                    <button type="button" className="btn btn-success" onClick={this.emitAs('onEdit', () => this.props.index)}>Edit</button>
                </td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={this.emitAs('onDelete', () => this.props.index)}>Delete</button>
                </td>
            </tr>
        );
    }
});
