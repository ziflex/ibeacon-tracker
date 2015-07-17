import React from 'react/addons';
import Item from './list-item';
import uuid from '../../../../../../../shared/utils/uuid';

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
                return (<Item key={uuid.generate(item)} index={index} item={item} />);
            }).toArray();
        }

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Proximity</th>
                        <th>Accuracy</th>
                        <th>Power</th>
                        <th>Last seen</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        );
    }
});
