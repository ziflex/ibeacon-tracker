'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

exports['default'] = _bunyan2['default'].createLogger(_lodash2['default'].defaults(_settings2['default'].logger, { name: _settings2['default'].name }));
module.exports = exports['default'];