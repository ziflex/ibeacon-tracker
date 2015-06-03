import React from 'react/addons';

export default React.createClass({
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        index: React.PropTypes.number.isRequired,
        item: React.PropTypes.object.isRequired
    },

    render() {
        const numder = this.props.index + 1;

        return (
            <tr>
                <td>{numder}</td>
                <td>{this.props.item.name}</td>
            </tr>
        );
    }
});
