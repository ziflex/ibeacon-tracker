import React from 'react/addons';
import LinkedImmutableStateMixin from 'reactlink-immutable';
import {Navigation} from 'react-router';
import SubscribersList from './subscribers/list';
import RegistryActions from '../../../actions/registry';
import Beacon from '../../../models/beacon';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        LinkedImmutableStateMixin,
        Navigation
    ],
    propTypes: {
        item: React.PropTypes.object
    },
    getInitialState() {
        return {
            item: this.props.item || new Beacon()
        };
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
                                valueLink={this.linkImmutableState(['item', 'name'])}
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
                                valueLink={this.linkImmutableState(['item', 'uuid'])}
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
                                valueLink={this.linkImmutableState(['item', 'major'])}
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
                                valueLink={this.linkImmutableState(['item', 'minor'])}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="minor" className="col-sm-2 control-label">Subscribers</label>
                        <div className="col-sm-10">
                            <SubscribersList
                            items={this.state.item.subscribers}
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

    _onSubscriberSave(options) {
        let {index, value, isNew} = options;
        let newCollection;

        if (isNew) {
            newCollection = this.state.item.subscribers.push(value);
        } else {
            newCollection = this.state.item.subscribers.set(index, value);
        }

        this.setState({
            item: this.state.item.set('subscribers', newCollection)
        });
    },

    _onSubscriberDelete(index) {
        if (index > -1) {
            this.setState({
                item: this.state.item.update('subscribers', (current) => {
                    return current.remove(index);
                })
            });
        }
    },

    _onSubmit(event) {
        event.preventDefault();
        RegistryActions.save(this.state.item);
        this.transitionTo('/registry');
    },

    _onCancel() {
        this.transitionTo('/registry');
    }
});
