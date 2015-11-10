import React from 'react';
import humane from 'humane-js';
import classnames from 'classnames';
import NotificationStore from '../stores/notification';

export default React.createClass({
    componentDidMount() {
        NotificationStore.listen(this.onChange);
    },
    onChange() {
        const notification = NotificationStore.getState();
        const lvl = notification.get('level');
        const cn = classnames(`humane-flatty-${lvl}`, 'notification', lvl);

        humane.log(notification.get('message'), { addnCls: cn });
    },
    componentDidUnmount() {
        NotificationStore.unlisten(this.onChange);
    },
    render() {
        return (<div></div>);
    }
});
