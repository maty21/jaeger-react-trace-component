'use strict';

var _getLastXformCacher = require('./get-last-xform-cacher');

var _getLastXformCacher2 = _interopRequireDefault(_getLastXformCacher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var xformImpl = function xformImpl(value) {
  return value + value;
}; // Copyright (c) 2017 Uber Technologies, Inc.
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

var xformer = void 0;
var cacher = void 0;

beforeEach(function () {
  xformer = jest.fn(xformImpl);
  cacher = (0, _getLastXformCacher2.default)(xformer);
});

it('returns a function', function () {
  expect(cacher).toEqual(expect.any(Function));
});

it('handles the first invocation where nothing is cached', function () {
  expect(function () {
    return cacher('a');
  }).not.toThrow();
});

it('the returned function returns the same results as the transformer function', function () {
  expect(cacher('a')).toBe(xformImpl('a'));
  expect(cacher('a')).toBe(xformImpl('a'));
  expect(cacher(1)).toBe(xformImpl(1));
  expect(cacher('a')).not.toBe(cacher('b'));
});

it('the returned function returns a cached value for subsequent invocation with the same argument', function () {
  expect(xformer.mock.calls.length).toBe(0);
  var value = cacher('a');
  expect(xformer.mock.calls.length).toBe(1);
  expect(cacher('a')).toBe(value);
  expect(xformer.mock.calls.length).toBe(1);
});

it('the returned function ignores the cached value when invoked with different arguments', function () {
  expect(xformer.mock.calls.length).toBe(0);
  var firstValue = cacher('a');
  expect(xformer.mock.calls.length).toBe(1);
  expect(cacher('a')).toBe(firstValue);
  expect(xformer.mock.calls.length).toBe(1);
  var secondValue = cacher('b');
  expect(xformer.mock.calls.length).toBe(2);
  expect(cacher('b')).toBe(secondValue);
  expect(xformer.mock.calls.length).toBe(2);
});

it('the functionality works with multiple arguments', function () {
  var multiXformer = jest.fn(function (a, b) {
    return [a + a, b + b];
  });
  var multiCacher = (0, _getLastXformCacher2.default)(multiXformer);

  expect(multiXformer.mock.calls.length).toBe(0);
  var firstValue = multiCacher('a', 'b');

  expect(multiXformer.mock.calls.length).toBe(1);
  expect(firstValue).toEqual(['aa', 'bb']);
  expect(multiCacher('a', 'b')).toBe(firstValue);
  expect(multiXformer.mock.calls.length).toBe(1);

  var secondValue = multiCacher('A', 'B');
  expect(multiXformer.mock.calls.length).toBe(2);
  expect(secondValue).toEqual(['AA', 'BB']);
  expect(multiCacher('A', 'B')).toBe(secondValue);
  expect(multiXformer.mock.calls.length).toBe(2);

  var thirdValue = multiCacher('A', 'B', 'extra-arg');
  expect(multiXformer.mock.calls.length).toBe(3);
  expect(thirdValue).not.toBe(secondValue);
  expect(thirdValue).toEqual(secondValue);
});