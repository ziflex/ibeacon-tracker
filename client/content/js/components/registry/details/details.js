import React from 'react/addons';
import {Navigation} from 'react-router';
import SubscribersList from './details-subscribers-list';

function createDefaultEntry() {
    return {
        uuid: '',
        major: 0,
        minor: 0,
        name: '',
        subscribers: []
    };
}

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        Navigation
    ],
    propTypes: {
        item: React.PropTypes.object
    },
    getDefaultProps() {
        return createDefaultEntry();
    },
    render() {
        const isNew = this.props.item ? false : true;
        const item = !isNew ? this.props.item : createDefaultEntry();
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
                                value={item.name}
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
                                value={item.uuid}
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
                                value={item.major}
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
                                value={item.minor}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="minor" className="col-sm-2 control-label">Subscribers</label>
                        <div className="col-sm-10">
                            <SubscribersList items={item.subscribers} />
                        </div>
                    </div>
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
    _onSubmit(event) {
        event.preventDefault();
        this.onSearch();
    },
    _onCancel() {
        this.transitionTo('/registry');
    }
});
