import React from 'react/addons';
import Dropdown from '../../../common/dropdown';
import DynamicEventsMixin from '../../../../mixins/dynamic-events-mixin';
import Subscriber from '../../../../models/subscriber';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        React.addons.LinkedStateMixin,
        DynamicEventsMixin
    ],
    propTypes: {
        number: React.PropTypes.number.isRequired,
        method: React.PropTypes.string,
        name: React.PropTypes.string,
        url: React.PropTypes.string
    },
    getInitialState() {
        return {
            name: this.props.name || '',
            method: this.props.method || '',
            url: this.props.url || ''
        };
    },
    render() {
        const method = (this.props.method || '').toLowerCase();
        const methods = [
            {
                text: 'GET',
                value: 'GET',
                selected: method === 'get'
            },
            {
                text: 'POST',
                value: 'POST',
                selected: method === 'post'
            }
        ];

        return (
            <tr>
                <td>
                    {this.props.number}
                </td>
                <td>
                    <input className="form-control" type="text" valueLink={this.linkState('name')} />
                </td>
                <td>
                    <Dropdown items={methods} />
                </td>
                <td>
                    <input className="form-control" type="text" valueLink={this.linkState('url')} />
                </td>
                <td>
                    <button type="button" className="btn btn-success" onClick={this.emitAs('onSave', () => new Subscriber(this.state))}>Save</button>
                </td>
                <td>
                    <button type="button" className="btn btn-default" onClick={this.emitAs('onCancel')}>Cancel</button>
                </td>
            </tr>
        );
    }
});
