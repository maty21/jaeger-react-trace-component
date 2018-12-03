'use strict';

var _colorGenerator = require('./color-generator');

var _colorGenerator2 = _interopRequireDefault(_colorGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('gives the same color for the same key', function () {
  _colorGenerator2.default.clear();
  var colorOne = _colorGenerator2.default.getColorByKey('serviceA');
  var colorTwo = _colorGenerator2.default.getColorByKey('serviceA');
  expect(colorOne).toBe(colorTwo);
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

it('gives different colors for each for each key', function () {
  _colorGenerator2.default.clear();
  var colorOne = _colorGenerator2.default.getColorByKey('serviceA');
  var colorTwo = _colorGenerator2.default.getColorByKey('serviceB');
  expect(colorOne).not.toBe(colorTwo);
});

it('should clear cache', function () {
  _colorGenerator2.default.clear();
  var colorOne = _colorGenerator2.default.getColorByKey('serviceA');
  _colorGenerator2.default.clear();
  var colorTwo = _colorGenerator2.default.getColorByKey('serviceB');
  expect(colorOne).toBe(colorTwo);
});