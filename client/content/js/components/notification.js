import React from 'react';
import humane from 'humane-js';
import NotificationStore from '../stores/notification';
import ListenerMixin from 'alt/mixins/ListenerMixin';

export default React.createClass({
    mixins: [ListenerMixin],

    componentDidMount() {
        this.listenTo(NotificationStore, this.onChange);
    },

    onChange() {
        const message = NotificationStore.getState();

        if (message.level === 'info') {
            humane.log(message.message);
        } else {
            humane.log(message.message);
        }
    },

    render() {
        return (<div></div>);
    }
});
