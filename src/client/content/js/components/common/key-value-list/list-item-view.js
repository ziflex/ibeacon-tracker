import React from 'react/addons';
import DynamicEventsMixin from '../../../mixins/dynamic-events-mixin';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        DynamicEventsMixin
    ],

    propTypes: {
        index: React.PropTypes.number.isRequired,
        types: React.PropTypes.object,
        item: React.PropTypes.object,
        onEdit: React.PropTypes.func,
        onDelete: React.PropTypes.func
    },

    render() {
        let typeColumn = null;

        if (this.props.types && this.props.types.count() > 1) {
            typeColumn = (
                <td>
                    {this.props.item.type}
                </td>
            );
        }

        return (
            <tr>
                <td>
                    {this.props.item.key}
                </td>
                <td>
                    {this.props.item.value}
                </td>
                {typeColumn}
                <td>
                    <button type="button" className="btn btn-success" onClick={this.emitAs('onEdit')}>Edit</button>
                </td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={this.emitAs('onDelete', () => this.props.index)}>Delete</button>
                </td>
            </tr>
        );
    }
});
