'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _symbol = require('symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var ITEMS = (0, _symbol2['default'])('ITEMS');

var Queue = (function () {
    function Queue() {
        _classCallCheck(this, Queue);

        this[ITEMS] = [];
    }

    _createClass(Queue, [{
        key: 'enqueue',
        value: function enqueue(item) {
            this[ITEMS].push(item);
        }
    }, {
        key: 'dequeue',
        value: function dequeue() {
            return this[ITEMS].shift();
        }
    }, {
        key: 'each',
        value: function each(func) {
            if (!func) {
                return;
            }

            _lodash2['default'].forEach(this[ITEMS], function (i) {
                func(i);
            });

            this[ITEMS] = [];
        }
    }]);

    return Queue;
})();

exports['default'] = Queue;
module.exports = exports['default'];