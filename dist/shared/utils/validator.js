'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashLangIsString = require('lodash/lang/isString');

var _lodashLangIsString2 = _interopRequireDefault(_lodashLangIsString);

var _lodashLangIsNumber = require('lodash/lang/isNumber');

var _lodashLangIsNumber2 = _interopRequireDefault(_lodashLangIsNumber);

var _lodashLangIsEmpty = require('lodash/lang/isEmpty');

var _lodashLangIsEmpty2 = _interopRequireDefault(_lodashLangIsEmpty);

var _lodashCollectionForEach = require('lodash/collection/forEach');

var _lodashCollectionForEach2 = _interopRequireDefault(_lodashCollectionForEach);

var _strings = require('./strings');

var _strings2 = _interopRequireDefault(_strings);

var MIN_MAJ_MIN = 0;
var MAX_MAJ_MIN = 65535;

exports['default'] = {
    name: function name(value) {
        var result = false;
        var message = null;

        if ((0, _lodashLangIsString2['default'])(value)) {
            result = !(0, _lodashLangIsEmpty2['default'])(value);
        }

        if (!result) {
            message = '`name` is required!';
        }

        return { result: result, message: message };
    },

    uuid: function uuid(value) {
        var result = !(0, _lodashLangIsEmpty2['default'])(value);
        var message = null;
        var uuidLen = 32;

        if (!result) {
            message = '`uuid` is required!';
        } else {
            result = value.length === uuidLen;

            if (!result) {
                message = '\'uuid\' must contain ' + uuidLen + ' characters';
            }
        }

        return { result: result, message: message };
    },

    major: function major(value) {
        var result = false;
        var message = null;
        var parsed = parseInt(value, 10);

        if ((0, _lodashLangIsNumber2['default'])(parsed)) {
            result = parsed >= MIN_MAJ_MIN && parsed <= MAX_MAJ_MIN;
        }

        if (!result) {
            message = '\'major\' is required and must be in range between ' + MIN_MAJ_MIN + ' and ' + MAX_MAJ_MIN;
        }

        return { result: result, message: message };
    },

    minor: function minor(value) {
        var result = false;
        var message = null;
        var parsed = parseInt(value, 10);

        if ((0, _lodashLangIsNumber2['default'])(parsed)) {
            result = parsed >= MIN_MAJ_MIN && parsed <= MAX_MAJ_MIN;
        }

        if (!result) {
            message = '\'minor\' is required and must be in range between ' + MIN_MAJ_MIN + ' and ' + MAX_MAJ_MIN;
        }

        return { result: result, message: message };
    },

    subscriberName: function subscriberName(value) {
        return this.name(value);
    },

    subscriberUrl: function subscriberUrl(value) {
        var result = false;
        var message = null;

        if ((0, _lodashLangIsString2['default'])(value)) {
            result = !(0, _lodashLangIsEmpty2['default'])(value);
        }

        if (!result) {
            message = '`url` is required!';
        }

        if (result) {
            var matched = value.match(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);

            if (!matched) {
                result = false;
                message = '`url` is invalid!';
            }
        }

        return { result: result, message: message };
    },

    validate: function validate(beacon) {
        var _this = this;

        var result = null;

        (0, _lodashCollectionForEach2['default'])(beacon, function (value, key) {
            if (_this[key]) {
                var validation = _this[key](value);

                if (!validation.result) {
                    if (!result) {
                        result = {};
                    }

                    result[key] = validation.message;
                }
            }
        });

        (0, _lodashCollectionForEach2['default'])(beacon.subscribers, function (value, index) {
            var errors = _this.validateSubscriber(value);

            if (errors) {
                if (!result) {
                    result = {};
                }

                result['subscriber_' + index] = errors;
            }
        });

        return result;
    },

    validateSubscriber: function validateSubscriber(subscriber) {
        var _this2 = this;

        var prefix = 'subscriber';
        var result = null;

        (0, _lodashCollectionForEach2['default'])(subscriber, function (value, key) {
            var methodKey = _strings2['default'].camelize(prefix, key);

            if (_this2[methodKey]) {
                var validation = _this2[methodKey](value);

                if (!validation.result) {
                    if (!result) {
                        result = {};
                    }

                    result[key] = validation.message;
                }
            }
        });

        return result;
    }
};
module.exports = exports['default'];