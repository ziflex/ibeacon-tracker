import React from 'react/addons';
import LinkedImmutableStateMixin from 'reactlink-immutable';
import TabbedArea from 'react-bootstrap/lib/TabbedArea';
import TabPane from 'react-bootstrap/lib/TabPane';
import Modal from 'react-bootstrap/lib/Modal';
import {List} from 'immutable';
import Dropdown from '../../../common/dropdown';
import KeyValueList from '../../../common/key-value-list/list';
import subscriberMethods from '../../../../enums/subscriber-methods';
import trackerEvents from '../../../../enums/tracker-events';
import utils from '../../../../utils/components';
import Subscriber from '../../../../models/subscriber';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        LinkedImmutableStateMixin
    ],

    propTypes: {
        index: React.PropTypes.number.isRequired,
        item: React.PropTypes.object.isRequired,
        onRequestHide: React.PropTypes.func,
        onSave: React.PropTypes.func,
        onCancel: React.PropTypes.func
    },

    getInitialState() {
        return {
            item: this.props.item || new Subscriber(),
            headers: false,
            params: false
        };
    },

    render() {
        const events = utils.createDropdownList(trackerEvents, this.state.item.event);
        const methods = utils.createDropdownList(subscriberMethods, this.state.item.method);

        return (
            <Modal title={"Subscriber"}>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-sm-12">
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Event</th>
                                    <th>Method</th>
                                    <th>Url</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <input className="form-control" type="text" valueLink={this.linkImmutableState(['item', 'name'])} />
                                    </td>
                                    <td>
                                        <Dropdown items={events} valueLink={this.linkImmutableState(['item', 'event'])} />
                                    </td>
                                    <td>
                                        <Dropdown items={methods} valueLink={this.linkImmutableState(['item', 'method'])} />
                                    </td>
                                    <td>
                                        <input className="form-control" type="text" valueLink={this.linkImmutableState(['item', 'url'])} />
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            {this._renderTabs()}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={this._onSave}>Save</button>
                    <button type="button" className="btn btn-default" onClick={this._onCancel}>Cancel</button>
                </div>
            </Modal>
        );
    },

    _renderTabs() {
        let tabs = [];

        tabs.push(
            <TabPane eventKey={1} tab={"Headers"} key={"headers"}>
                <KeyValueList
                    items={this.props.item.headers}
                    valueLink={this.linkImmutableState(['item', 'headers'])}
                    />
            </TabPane>
        );

        tabs.push(
            <TabPane eventKey={2} tab={"Parameters"} key={"parameters"}>
                <KeyValueList
                    items={this.props.item.params}
                    valueLink={this.linkImmutableState(['item', 'params'])}
                    />
            </TabPane>
        );

        if (this.state.item.method === subscriberMethods.POST) {
            tabs.push(
                <TabPane eventKey={3} tab={"Form data"} key={"form-data"}>
                    <KeyValueList
                        items={this.props.item.data}
                        types={List.of('string', 'json')}
                        valueLink={this.linkImmutableState(['item', 'data'])}
                        />
                </TabPane>
            );
        }

        return (
            <TabbedArea defaultActiveKey={1}>
                {tabs}
            </TabbedArea>
        );
    },

    _onSave() {
        if (this.props.onRequestHide) {
            this.props.onRequestHide();
        }

        if (this.props.onSave) {
            this.props.onSave({
                index: this.props.index,
                value: this.state.item
            });
        }
    },

    _onCancel() {
        if (this.props.onRequestHide) {
            this.props.onRequestHide();
        }

        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }
});
