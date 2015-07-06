import bind from 'lodash/function/bind';
import wrap from 'lodash/function/wrap';
import isFunction from 'lodash/lang/isFunction';

export default {
    emitAs() {
        return bind(function emitAs(name, args) {
            const handler = this.props[name];

            if (handler) {
                handler(isFunction(args) ? args() : args);
            }
        }, this, arguments[0], arguments[1]);
    },
    delegateAs() {
        return wrap(arguments[0], bind(function delegateAs() {
            const handler = this.props[arguments[0]];

            if (handler) {
                handler(arguments[1]);
            }
        }, this));
    }
};
