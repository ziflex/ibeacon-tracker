import React from 'react/addons';
import List from './list';

export default React.createClass({
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        entries: React.PropTypes.object.isRequired
    },

    render() {
        return (
            <div>
                <h1>Active iBeacons</h1>
                <List items={this.props.entries} />
            </div>
        );
    }
});
