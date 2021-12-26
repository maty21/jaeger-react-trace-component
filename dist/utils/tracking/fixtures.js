'use strict';

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var poeExcerpt = '\nExcerpt of Alone, by Edgar Allen Poe:\n"Then\u2014in my childhood\u2014in the dawn\nOf a most stormy life\u2014was drawn\nFrom the red cliff of the mountain\u2014\nFrom the sun that \u2019round me roll\u2019d\nIn its autumn tint of gold\u2014\nFrom the lightning in the sky\nAs it pass\u2019d me flying by\u2014\nFrom the thunder, and the storm\nAnd the cloud that took the form\n(When the rest of Heaven was blue)\nOf a demon in my view\u2014"\n3/17/1829'; // Copyright (c) 2017 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

module.exports.RAVEN_PAYLOAD = (0, _deepFreeze2.default)({
  data: {
    request: {
      url: 'http://localhost/trace/565c1f00385ebd0b'
    },
    exception: {
      values: [{
        type: 'Error',
        value: 'test-sentry',
        stacktrace: {
          frames: [{
            filename: 'http://localhost/static/js/ultra-long-func.js',
            function: poeExcerpt
          }, {
            filename: 'http://localhost/static/js/b.js',
            function: 'fnBb'
          }, {
            filename: 'http://localhost/static/js/b.js',
            function: 'fnBa'
          }, {
            filename: 'http://localhost/static/js/a.js',
            function: 'fnAb'
          }, {
            filename: 'http://localhost/static/js/a.js',
            function: 'fnAa'
          }, {
            filename: 'http://localhost/static/js/a.js',
            function: 'HTMLBodyElement.wrapped'
          }]
        }
      }]
    },
    tags: {
      git: 'SHA shortstat'
    },
    extra: {
      'session:duration': 10952
    },
    breadcrumbs: {
      values: [{
        category: 'sentry',
        message: '6 Breadcrumbs should be truncated from the top (oldest)'
      }, {
        category: 'sentry',
        message: '5 Breadcrumbs should be truncated from the top (oldest)'
      }, {
        category: 'sentry',
        message: '4 Breadcrumbs should be truncated from the top (oldest)'
      }, {
        category: 'sentry',
        message: '3 Breadcrumbs should be truncated from the top (oldest)'
      }, {
        category: 'sentry',
        message: '2 Breadcrumbs should be truncated from the top (oldest)'
      }, {
        category: 'sentry',
        message: '1 Breadcrumbs should be truncated from the top (oldest)'
      }, {
        category: 'sentry',
        message: '0 Breadcrumbs should be truncated from the top (oldest)'
      }, {
        type: 'http',
        category: 'fetch',
        data: {
          url: '/api/traces/565c1f00385ebd0b',
          status_code: 200
        }
      }, {
        type: 'http',
        category: 'fetch',
        data: {
          url: '/api/traces/565c1f00385ebd0b',
          status_code: 404
        }
      }, {
        type: 'http',
        category: 'fetch',
        data: {
          url: '/unknown/url/1',
          status_code: 200
        }
      }, {
        category: 'navigation',
        data: {
          to: '/trace/cde2457775afa8d2'
        }
      }, {
        category: 'navigation',
        data: {
          to: '/uknonwn/url'
        }
      }, {
        category: 'sentry',
        message: 'Error: test-sentry'
      }, {
        category: 'sentry',
        message: "TypeError: A very long message that will be truncated and reduced to a faint flicker of it's former glory"
      }, {
        category: 'ui.click'
      }, {
        category: 'ui.input'
      }, {
        category: 'ui.click'
      }, {
        category: 'ui.click'
      }, {
        category: 'ui.input'
      }, {
        category: 'ui.input'
      }, {
        category: 'ui.input',
        message: 'header > ul.LabeledList.TracePageHeader--overviewItems'
      }]
    }
  }
});

var action = '! test-sentry\nSHA shortstat\n/trace/565c1f00385ebd0b\n\n> a.js\nHTMLBodyElement.wrapped\nfnAa\nfnAb\n> b.js\nfnBa\nfnBb\n> ultra-long-func.js\nExcerpt of Alone, by Edgar Allen Poe:|"Then\u2014in my childhood\u2014in the dawn|Of a most stormy life\u2014was drawn|From the red cliff of the mountain\u2014|From the sun that \u2019round me roll\u2019d|In its autumn tint of gold\u2014|From the lightning in the sky|As it pass\u2019d me flying by\u2014|From the thunder, and the storm|And the cloud that took the form|(When the rest of Heaven was blue)|Of a d~';

var label = '! test-sentry\ntrace\n11\nSHA shortstat\n\n~om the top (oldest)\n! 4 Breadcrumbs should be truncated from the top (oldest)\n! 3 Breadcrumbs should be truncated from the top (oldest)\n! 2 Breadcrumbs should be truncated from the top (oldest)\n! 1 Breadcrumbs should be truncated from the top (oldest)\n! 0 Breadcrumbs should be truncated from the top (oldest)\n[tr][tr|404][??]\n\ntr\n\n??\n! test-sentry\n! Type! A very long message that will be truncated and re~\ncic2i2i{.LabeledList.TracePageHeader--overviewItems}';

module.exports.RAVEN_TO_GA = (0, _deepFreeze2.default)({
  action: action,
  label: label,
  message: '! test-sentry',
  category: 'jaeger/trace/error',
  value: 11
});