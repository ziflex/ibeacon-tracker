'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashLangIsString = require('lodash/lang/isString');

var _lodashLangIsString2 = _interopRequireDefault(_lodashLangIsString);

var _lodashLangIsEmpty = require('lodash/lang/isEmpty');

var _lodashLangIsEmpty2 = _interopRequireDefault(_lodashLangIsEmpty);

exports['default'] = {
    /*
    * Generates new uuid based on uuid, major and minor numbers.
    */
    generate: function generate(beacon) {
        var result = '';

        if (beacon) {
            result += this.normalize(beacon);
            result += beacon.major || 'x';
            result += beacon.minor || 'x';
        }

        return result.toLowerCase();
    },

    /*
    *  Normalizes Beacon's uuid, removing dash characters.
    */
    normalize: function normalize(beacon) {
        if (!beacon) {
            return '';
        }

        return (beacon.uuid || '').replace(/-/g, '').toLowerCase();
    },

    /*
    * Splits uuid into chunks.
    */
    split: function split(uuid) {
        return !(0, _lodashLangIsEmpty2['default'])(uuid) ? uuid.replace(/-/g, '').match(/^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/i).splice(1) : [];
    },

    /*
    * Join uuid chunks.
    */
    join: function join() {
        var values = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        return values.join('');
    },

    /*
    * Formats uuid for ui.
    */
    format: function format() {
        var uuid = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        var arr = uuid;

        if ((0, _lodashLangIsString2['default'])(uuid)) {
            arr = this.split(uuid);
        }

        return arr.join('-');
    }
};
module.exports = exports['default'];