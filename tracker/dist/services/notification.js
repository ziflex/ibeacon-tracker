'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _lodashNode = require('lodash-node');

var _lodashNode2 = _interopRequireDefault(_lodashNode);

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

            var data = {
                event: event,
                beacon: {
                    uuid: beacon.uuid,
                    major: beacon.major,
                    minor: beacon.minor
                }
            };
            var query = 'event=' + event + '&' + _querystring2['default'].stringify(data.beacon);

            _lodashNode2['default'].forEach(beacon.subscribers, function (subscriber) {
                if (subscriber && !_lodashNode2['default'].isEmpty(subscriber.url)) {
                    if (!subscriber.event || subscriber.event === event) {
                        var client = _restify2['default'].createStringClient({
                            url: subscriber.url
                        });

                        var method = (subscriber.method || 'get').toLowerCase();
                        var args = null;
                        var callback = function callback() {
                            console.log('notified');
                        };

                        if (method === 'post' || method === 'put' || method === 'patch') {
                            args = ['/', data, callback];
                        } else {
                            args = ['/?' + query, callback];
                        }

                        client[method].apply(client, args);
                    }
                }
            });
        }
    }]);

    return NotificationService;
})();

exports['default'] = new NotificationService();
module.exports = exports['default'];