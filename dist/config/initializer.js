'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _modelsUser = require('../models/user');

var _modelsUser2 = _interopRequireDefault(_modelsUser);

function initializeUsers() {
    return new _bluebird2['default'](function (resolve, reject) {
        _modelsUser2['default'].findByUsername('admin', function (err, user) {
            if (!err) {
                if (!user) {
                    return _modelsUser2['default'].register(new _modelsUser2['default']({ username: 'admin' }), 'admin', function (regErr) {
                        if (!regErr) {
                            return resolve();
                        }

                        return reject(regErr);
                    });
                }

                return resolve();
            }

            return reject(err);
        });
    });
}

exports['default'] = {
    initialize: function initialize(callback) {
        initializeUsers().then(callback)['catch'](callback);
    }
};
module.exports = exports['default'];