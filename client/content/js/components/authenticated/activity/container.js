import React from 'react/addons';
import TabbedArea from 'react-bootstrap/lib/TabbedArea';
import TabPane from 'react-bootstrap/lib/TabPane';
import Registered from './registered/container';
import Unregistered from './unregistered/container';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin
    ],

    propTypes: {
        items: React.PropTypes.object.isRequired
    },

    render() {
        return (
            <div>
                <h1>Active iBeacons</h1>
                <TabbedArea>
                    <TabPane eventKey={1} tab={"Registered"} key={"registered"}>
                        <Registered items={this.props.items.get('registered')} />
                    </TabPane>
                    <TabPane eventKey={2} tab={"Unregistered"} key={"unregistered"}>
                        <Unregistered items={this.props.items.get('unregistered')} />
                    </TabPane>
                </TabbedArea>
            </div>
        );
    }
});
