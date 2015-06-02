import React from 'react/addons';
import DynamicEventsMixin from '../../../../mixins/dynamic-events-mixin';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        DynamicEventsMixin
    ],
    propTypes: {
        number: React.PropTypes.number.isRequired,
        method: React.PropTypes.string,
        name: React.PropTypes.string,
        url: React.PropTypes.string,
        onEdit: React.PropTypes.func,
        onDelete: React.PropTypes.func
    },
    render() {
        return (
            <tr>
                <td>
                    {this.props.number}
                </td>
                <td>
                    {this.props.name}
                </td>
                <td>
                    {this.props.method}
                </td>
                <td>
                    {this.props.url}
                </td>
                <td>
                    <button type="button" className="btn btn-success" onClick={this.emitAs('onEdit')}>Edit</button>
                </td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={this.emitAs('onDelete', () => this.props.number - 1)}>Delete</button>
                </td>
            </tr>
        );
    }
});
