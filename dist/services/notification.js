'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function buildRequest(event, beacon, subscriber) {
    var method = (subscriber.method || 'get').toLowerCase();
    var request = null;
    var data = {
        event: event,
        uuid: beacon.uuid,
        major: beacon.major,
        minor: beacon.minor
    };

    if (method === 'post') {
        request = _superagent2['default'].post(subscriber.url);
    } else {
        request = _superagent2['default'].get(subscriber.url);
    }

    if (subscriber.headers) {
        _lodash2['default'].forEach(subscriber.headers, function (value, name) {
            request.set(name, value);
        });
    }

    if (subscriber.params) {
        request.query(subscriber.params);
    }

    if (method === 'post') {
        if (subscriber.data) {
            request.send(subscriber.data);
        } else {
            request.send(data);
        }
    } else {
        request.query(data);
    }

    return request;
}

function isValid(subscriber, event) {
    return subscriber && !_lodash2['default'].isEmpty(subscriber.url) && (!subscriber.event || subscriber.event === event);
}

var NotificationService = (function () {
    function NotificationService() {
        _classCallCheck(this, NotificationService);
    }

    _createClass(NotificationService, [{
        key: 'notify',
        value: function notify(event, beacon) {
            if (!beacon || !beacon.subscribers || !beacon.subscribers.length) {
                return;
            }

            _lodash2['default'].forEach(beacon.subscribers, function (subscriber) {
                if (isValid(subscriber, event)) {
                    buildRequest(event, beacon, subscriber).end(function (err) {
                        if (!err) {
                            _logger2['default'].info('Sent', event, 'notification to', subscriber.url);
                        } else {
                            _logger2['default'].error(new Error('Failed to send notification to ' + subscriber.url + '.\n' + err.toString()));
                        }
                    });
                }
            });
        }
    }]);

    return NotificationService;
})();

exports['default'] = new NotificationService();
module.exports = exports['default'];