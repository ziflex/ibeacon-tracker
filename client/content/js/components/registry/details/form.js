import React from 'react/addons';
import Immutable from 'immutable';
import {Navigation} from 'react-router';
import SubscribersList from './subscribers/list';
import RegistryActions from '../../../actions/registry';
import Beacon from '../../../models/beacon';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        React.addons.LinkedStateMixin,
        Navigation
    ],
    propTypes: {
        item: React.PropTypes.object
    },
    getInitialState() {
        const state = this.props.item ? this.props.item.toJSON() : (new Beacon()).toJSON();
        state.subscribers = Immutable.List(state.subscribers);
        return state;
    },
    render() {
        return (
            <div>
                <form className="form-horizontal" onSubmit={this._onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="col-sm-2 control-label">Name</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Name"
                                valueLink={this.linkState('name')}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="uuid" className="col-sm-2 control-label">UUID</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                id="uuid"
                                placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                                valueLink={this.linkState('uuid')}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="major" className="col-sm-2 control-label">Major</label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                className="form-control"
                                id="major"
                                min="0"
                                max="65535"
                                valueLink={this.linkState('major')}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="minor" className="col-sm-2 control-label">Minor</label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                className="form-control"
                                id="minor"
                                min="0"
                                max="65535"
                                valueLink={this.linkState('minor')}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="minor" className="col-sm-2 control-label">Subscribers</label>
                        <div className="col-sm-10">
                            <SubscribersList
                            items={this.state.subscribers}
                            onSave={this._onSubscriberSave}
                            onDelete={this._onSubscriberDelete} />
                        </div>
                    </div>
                    <hr />
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <div className="btn-group pull-right">
                                <button type="submit" className="btn btn-success">Save</button>
                                <button type="button" className="btn btn-default" onClick={this._onCancel}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    },

    _onSubscriberSave(isNew, value) {
        if (!value) {
            return;
        }

        let newCollection;
        if (isNew) {
            newCollection = this.state.subscribers.push(value);
        } else {
            newCollection = this.state.subscribers.set(index, value);
        }

        this.setState({
            subscribers: newCollection
        });
    },

    _onSubscriberDelete(index) {
        if (index > -1) {
            this.setState({
                subscribers: this.state.subscribers.remove(index)
            });
        }
    },

    _onSubmit(event) {
        event.preventDefault();
        RegistryActions.save(new Beacon({
            id: this.props.item ? this.props.item.id : '',
            name: this.state.name,
            uuid: this.state.uuid,
            major: this.state.major,
            minor: this.state.minor,
            subscribers: Immutable.List(this.state.subscribers)
        }));
        this.transitionTo('/registry');
    },

    _onCancel() {
        this.transitionTo('/registry');
    }
});
