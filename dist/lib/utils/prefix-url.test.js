'use strict';

var _prefixUrl = require('./prefix-url');

var _prefixUrl2 = _interopRequireDefault(_prefixUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) 2017 Uber Technologies, Inc.
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

/* eslint-disable import/first */

jest.mock('../site-prefix', function () {
  return global.location.origin + '/a/site/prefix/';
});

var PATH_PREFIX = '/a/site/prefix';

describe('prefixUrl()', function () {
  var tests = [{ source: undefined, target: PATH_PREFIX }, { source: null, target: PATH_PREFIX }, { source: '', target: PATH_PREFIX }, { source: '/', target: PATH_PREFIX + '/' }, { source: '/a', target: PATH_PREFIX + '/a' }, { source: '/a/', target: PATH_PREFIX + '/a/' }, { source: '/a/b', target: PATH_PREFIX + '/a/b' }];

  tests.forEach(function (_ref) {
    var source = _ref.source,
        target = _ref.target;

    it('prefixes "' + source + '" correctly', function () {
      expect((0, _prefixUrl2.default)(source)).toBe(target);
    });
  });
});