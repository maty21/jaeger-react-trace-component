'use strict';

var _regexpEscape = require('./regexp-escape');

var _regexpEscape2 = _interopRequireDefault(_regexpEscape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('regexp-escape', function () {
  var chars = '-/\\^$*+?.()|[]{}'.split('');
  chars.forEach(function (c) {
    it('escapes "' + c + '" correctly', function () {
      var result = (0, _regexpEscape2.default)(c);
      expect(result.length).toBe(2);
      expect(result[0]).toBe('\\');
      expect(result[1]).toBe(c);
    });
  });
}); // Copyright (c) 2017 Uber Technologies, Inc.
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