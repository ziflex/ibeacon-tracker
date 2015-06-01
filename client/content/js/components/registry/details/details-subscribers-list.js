import React from 'react/addons';
import lodashMap from 'lodash/collection/map';
import Item from './details-subscribers-list-item';

export default React.createClass({
    mixins: [React.addons.PureRenderMixin],
    propTypes: {
        items: React.PropTypes.array
    },
    getDefaultProps() {
        return {
            items: []
        };
    },
    render() {
        let num = 0;
        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Method</th>
                            <th>Url</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lodashMap(this.props.items, (item) => {
                            num += 1;
                            return (
                                <Item
                                    key={item.method + item.url + num}
                                    number={num}
                                    name={item.name}
                                    method={item.method}
                                    url={item.url}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
});
