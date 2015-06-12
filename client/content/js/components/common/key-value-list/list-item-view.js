import React from 'react/addons';
import DynamicEventsMixin from '../../../mixins/dynamic-events-mixin';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        DynamicEventsMixin
    ],

    propTypes: {
        types: React.PropTypes.object,
        itemKey: React.PropTypes.string.isRequired,
        itemValue: React.PropTypes.string.isRequired,
        itemType: React.PropTypes.string.isRequired,
        onEdit: React.PropTypes.func,
        onDelete: React.PropTypes.func
    },

    render() {
        let typeColumn = null;

        if (this.props.types && this.props.types.count() > 1) {
            typeColumn = (
                <td>
                    {this.props.itemType}
                </td>
            );
        }

        return (
            <tr>
                <td>
                    {this.props.itemKey}
                </td>
                <td>
                    {this.props.itemValue}
                </td>
                {typeColumn}
                <td>
                    <button type="button" className="btn btn-success" onClick={this.emitAs('onEdit')}>Edit</button>
                </td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={this.emitAs('onDelete', () => this.props.itemKey)}>Delete</button>
                </td>
            </tr>
        );
    }
});
