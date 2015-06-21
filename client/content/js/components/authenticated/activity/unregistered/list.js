import React from 'react/addons';
import Item from './list-item';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin
    ],

    propTypes: {
        items: React.PropTypes.object
    },

    render() {
        let index = -1;
        let items = null;

        if (this.props.items) {
            items = this.props.items.toSeq().map((item) => {
                index += 1;
                return (<Item key={item.uuid + item.major + item.minor} index={index} item={item} />);
            }).toArray();
        }

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>UUID</th>
                        <th>Major</th>
                        <th>Minor</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        );
    }
});
