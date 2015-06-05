import React from 'react/addons';
import LinkedImmutableStateMixin from 'reactlink-immutable';
import Dropdown from '../../../../common/dropdown';
import DynamicEventsMixin from '../../../../../mixins/dynamic-events-mixin';
import subscriberMethods from '../../../../../enums/subscriber-methods';
import trackerEvents from '../../../../../enums/tracker-events';
import utils from '../../../../../utils/components';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        LinkedImmutableStateMixin,
        DynamicEventsMixin
    ],

    propTypes: {
        index: React.PropTypes.number.isRequired,
        item: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func,
        onCancel: React.PropTypes.func
    },

    getInitialState() {
        return {
            item: this.props.item
        };
    },

    render() {
        const events = utils.createDropdownList(trackerEvents, this.state.item.event);
        const methods = utils.createDropdownList(subscriberMethods, this.state.item.method);
        const num = this.props.index + 1;

        return (
            <tr>
                <td>
                    {num}
                </td>
                <td>
                    <input className="form-control" type="text" valueLink={this.linkImmutableState(['item', 'name'])} />
                </td>
                <td>
                    <Dropdown items={events} valueLink={this.linkImmutableState(['item', 'event'])} />
                </td>
                <td>
                    <Dropdown items={methods} valueLink={this.linkImmutableState(['item', 'method'])} />
                </td>
                <td>
                    <input className="form-control" type="text" valueLink={this.linkImmutableState(['item', 'url'])} />
                </td>
                <td>
                    <button type="button" className="btn btn-success" onClick={this.emitAs('onSave', () => this.state.item)}>Save</button>
                </td>
                <td>
                    <button type="button" className="btn btn-default" onClick={this.emitAs('onCancel')}>Cancel</button>
                </td>
            </tr>
        );
    }
});
