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
import Input from '../../../common/form/input';
import validator from '../../../../../../../shared/utils/validator';
import NotificationActions from '../../../../actions/notification';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        LinkedImmutableStateMixin
    ],

    propTypes: {
        show: React.PropTypes.bool.isRequired,
        index: React.PropTypes.number.isRequired,
        item: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func,
        onCancel: React.PropTypes.func
    },

    getInitialState() {
        return {
            item: this.props.item || new Subscriber(),
            headers: false,
            params: false,
            validationErrors: null
        };
    },

    render() {
        const events = utils.createDropdownList(trackerEvents, this.state.item.event);
        const methods = utils.createDropdownList(subscriberMethods, this.state.item.method);

        return (
            <Modal
                show={this.props.show}
                onHide={this._onHide}
                >
                <Modal.Body>
                    <Modal.Header>
                        <Modal.Title>Subscriber</Modal.Title>
                    </Modal.Header>
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
                                        <Input
                                            className="form-control"
                                            type="text"
                                            valueLink={this.linkImmutableState(['item', 'name'])}
                                            validationError={this._getValidationError('name')}
                                            />
                                    </td>
                                    <td>
                                        <Dropdown items={events} valueLink={this.linkImmutableState(['item', 'event'])} />
                                    </td>
                                    <td>
                                        <Dropdown items={methods} valueLink={this.linkImmutableState(['item', 'method'])} />
                                    </td>
                                    <td>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            valueLink={this.linkImmutableState(['item', 'url'])}
                                            validationError={this._getValidationError('url')}
                                            />
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
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-success" onClick={this._onSave}>Save</button>
                    <button type="button" className="btn btn-default" onClick={this._onCancel}>Cancel</button>
                </Modal.Footer>
            </Modal>
        );
    },

    _renderTabs() {
        let tabs = [];
        const item = this.props.item;
        const headers = item ? item.headers : null;
        const params = item ? item.params : null;
        const data = item ? item.data : null;

        tabs.push(
            <TabPane eventKey={1} tab={"Headers"} key={"headers"}>
                <KeyValueList
                    items={headers}
                    valueLink={this.linkImmutableState(['item', 'headers'])}
                    />
            </TabPane>
        );

        tabs.push(
            <TabPane eventKey={2} tab={"Parameters"} key={"parameters"}>
                <KeyValueList
                    items={params}
                    valueLink={this.linkImmutableState(['item', 'params'])}
                    />
            </TabPane>
        );

        if (this.state.item.method === subscriberMethods.POST) {
            tabs.push(
                <TabPane eventKey={3} tab={"Form data"} key={"form-data"}>
                    <KeyValueList
                        items={data}
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
        if (this.props.onSave) {
            const result = validator.validateSubscriber(this.state.item.toJS());

            if (!result) {
                this.props.onSave({
                    index: this.props.index,
                    value: this.state.item
                });
            } else {
                NotificationActions.error('Validation error!');
                this.setState({
                    validationErrors: result
                });
            }
        }
    },

    _onCancel() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    },

    _onHide() {},

    _getValidationError(key) {
        let result = null;

        if (this.state.validationErrors) {
            result = this.state.validationErrors[key];
        }

        return result;
    }
});
