import React from 'react/addons';
import List from './list';

export default React.createClass({
    propTypes: {
        entries: React.PropTypes.object.isRequired
    },
    mixins: [
        React.addons.PureRenderMixin
    ],
    render() {
        return (
            <div>
                <h1>Registered iBeacons</h1>
                <List items={this.props.entries} />
            </div>
        );
    }
});
