import React from 'react/addons';
import LinkedImmutableStateMixin from 'reactlink-immutable';
import {Navigation} from 'react-router';
import Input from '../../../common/form/input';
import UuidEditor from './uuid-editor';
import SubscribersList from './subscribers-list';
import RegistryActions from '../../../../actions/registry';
import ValidationMixin from '../../../../mixins/validation-mixin';
import validator from '../../../../../../../shared/utils/validator';
import NotificationActions from '../../../../actions/notification';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        LinkedImmutableStateMixin,
        ValidationMixin,
        Navigation
    ],

    propTypes: {
        item: React.PropTypes.object
    },

    getInitialState() {
        return {
            item: this.props.item,
            validationErrors: null
        };
    },

    render() {
        return (
            <form className="form-horizontal" onSubmit={this._onSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="col-sm-2 control-label">Name</label>
                    <div className="col-sm-10">
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            validationError={this.getValidationError('name')}
                            valueLink={this.linkImmutableState(['item', 'name'])}
                            />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="uuid" className="col-sm-2 control-label">UUID</label>
                    <div className="col-sm-10">
                        <UuidEditor
                            name="uuid"
                            validationError={this.getValidationError('uuid')}
                            valueLink={this.linkImmutableState(['item', 'uuid'])}
                            />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="major" className="col-sm-2 control-label">Major</label>
                    <div className="col-sm-10">
                        <Input
                            type="number"
                            id="major"
                            name="major"
                            min={0}
                            max={65535}
                            validationError={this.getValidationError('major')}
                            valueLink={this.linkImmutableState(['item', 'major'])}
                            />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="minor" className="col-sm-2 control-label">Minor</label>
                    <div className="col-sm-10">
                        <Input
                            type="number"
                            id="minor"
                            name="minor"
                            min={0}
                            max={65535}
                            validationError={this.getValidationError('minor')}
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
        );
    },

    _onSubscriberSave(options) {
        let {index, value} = options;

        this.setState({
            item: this.state.item.update('subscribers', list => list.set(index, value))
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

        const result = validator.validate(this.state.item.toJS());

        if (!result) {
            RegistryActions.save(this.state.item);
            this.transitionTo('registry');
        } else {
            NotificationActions.error('Validation error!');
            this.setState({
                validationErrors: result
            });
        }
    },

    _onCancel() {
        this.transitionTo('registry');
    }
});
