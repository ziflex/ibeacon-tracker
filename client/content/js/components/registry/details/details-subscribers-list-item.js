import React from 'react';

export default React.createClass({
    mixins: [React.addons.PureRenderMixin],
    propTypes: {
        number: React.PropTypes.number.isRequired,
        method: React.PropTypes.string,
        name: React.PropTypes.string,
        url: React.PropTypes.string
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
                    <select value={this.props.method}>
                        <option value="get">GET</option>
                        <option value="post">POST</option>
                    </select>
                </td>
                <td>
                    {this.props.url}
                </td>
                <td>
                    <button type="button" className="btn btn-success" onClick={this._onEdit}>Edit</button>
                </td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={this._onDelete}>Delete</button>
                </td>
            </tr>
        );
    },
    _onEdit() {
    },
    _onDelete() {
    }
});
