import React from 'react/addons';
import EntryList from './entry-list';

export default React.createClass({
    mixins: [React.addons.PureRenderMixin],
    propTypes: {
        entries: React.PropTypes.object.isRequired
    },
    render() {
        return (
            <div>
                <h1>Registered iBeacons</h1>
                <EntryList items={this.props.entries} />
            </div>
        );
    }
});
