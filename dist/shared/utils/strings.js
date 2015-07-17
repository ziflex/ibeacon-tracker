'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashStringCamelCase = require('lodash/string/camelCase');

var _lodashStringCamelCase2 = _interopRequireDefault(_lodashStringCamelCase);

var _lodashStringCapitalize = require('lodash/string/capitalize');

var _lodashStringCapitalize2 = _interopRequireDefault(_lodashStringCapitalize);

var _lodashCollectionReduce = require('lodash/collection/reduce');

var _lodashCollectionReduce2 = _interopRequireDefault(_lodashCollectionReduce);

exports['default'] = {
    camelize: function camelize() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return (0, _lodashStringCamelCase2['default'])((0, _lodashCollectionReduce2['default'])(args, function (previous, word) {
            return previous + (0, _lodashStringCapitalize2['default'])(word);
        }, ''));
    }
};
module.exports = exports['default'];