import React from 'react/addons';
import { State } from 'react-router';
import Form from './form';
import Beacon from '../../../../models/beacon';

export default React.createClass({
    propTypes: {
        items: React.PropTypes.object.isRequired
    },
    mixins: [
        React.addons.PureRenderMixin,
        State
    ],
    render() {
        const params = this.getParams();
        let entry = null;

        if (params && params.id) {
            entry = this.props.items.get(params.id);
        }

        if (!entry) {
            entry = new Beacon(this.getQuery());
        }

        return (
            <div>
                <h1>{entry ? 'Edit' : 'Register'}</h1>
                <div className="registry-edit-page">
                    <Form item={entry} />
                </div>
            </div>
        );
    }
});
