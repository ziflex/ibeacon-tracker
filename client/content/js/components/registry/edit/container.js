import React from 'react/addons';
import {State} from 'react-router';
import Form from './form';

export default React.createClass({
    mixins: [React.addons.PureRenderMixin, State],
    propTypes: {
        entries: React.PropTypes.object.isRequired
    },
    render() {
        const params = this.getParams();
        const entry = params ? this.props.entries.get(params.id) : null;

        return (
            <div>
                <h1>Edit</h1>
                <Form item={entry} />
            </div>
        );
    }
});
