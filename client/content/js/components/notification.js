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
        const notification = NotificationStore.getState();
        const className = 'humane-flatty-' + notification.get('level');

        humane.log(notification.get('message'), { addnCls: className });
    },

    render() {
        return (<div></div>);
    }
});
