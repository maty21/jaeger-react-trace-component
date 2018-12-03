'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // Copyright (c) 2017 Uber Technologies, Inc.
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

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _sort = require('./sort');

var sortUtils = _interopRequireWildcard(_sort);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('localeStringComparator() provides a case-insensitive sort', function () {
  var arr = ['Z', 'ab', 'AC'];
  expect(arr.slice().sort()).toEqual(['AC', 'Z', 'ab']);
  expect(arr.slice().sort(sortUtils.localeStringComparator)).toEqual(['ab', 'AC', 'Z']);
});

it('localeStringComparator() should properly sort a list of strings', function () {
  var arr = ['allen', 'Gustav', 'paul', 'Tim', 'abernathy', 'tucker', 'Steve', 'mike', 'John', 'Paul'];
  expect(arr.sort(sortUtils.localeStringComparator)).toEqual(['abernathy', 'allen', 'Gustav', 'John', 'mike', 'paul', 'Paul', 'Steve', 'Tim', 'tucker']);
});

it('numberSortComparator() should properly sort a list of numbers', function () {
  var arr = [3, -1.1, 4, -1, 9, 4, 2, Infinity, 0, 0];

  expect(arr.sort(sortUtils.numberSortComparator)).toEqual([-1.1, -1, 0, 0, 2, 3, 4, 4, 9, Infinity]);
});

it('classNameForSortDir() should return the proper asc classes', function () {
  expect(sortUtils.classNameForSortDir(1)).toBe('sorted ascending');
});

it('classNameForSortDir() should return the proper desc classes', function () {
  expect(sortUtils.classNameForSortDir(-1)).toBe('sorted descending');
});

it('getNewSortForClick() should sort to the defaultDir if new column', function () {
  // no defaultDir provided
  expect(sortUtils.getNewSortForClick({ key: 'alpha', dir: 1 }, { name: 'beta' })).toEqual({
    key: 'beta',
    dir: 1
  });

  // defaultDir provided
  expect(sortUtils.getNewSortForClick({ key: 'alpha', dir: 1 }, { name: 'beta', defaultDir: -1 })).toEqual({
    key: 'beta',
    dir: -1
  });
});

it('getNewSortForClick() should toggle direction if same column', function () {
  expect(sortUtils.getNewSortForClick({ key: 'alpha', dir: 1 }, { name: 'alpha' })).toEqual({
    key: 'alpha',
    dir: -1
  });

  expect(sortUtils.getNewSortForClick({ key: 'alpha', dir: -1 }, { name: 'alpha' })).toEqual({
    key: 'alpha',
    dir: 1
  });
});

it('createSortClickHandler() should return a function', function () {
  var column = { name: 'alpha' };
  var currentSortKey = 'alpha';
  var currentSortDir = 1;
  var updateSort = _sinon2.default.spy();

  expect(_typeof(sortUtils.createSortClickHandler(column, currentSortKey, currentSortDir, updateSort))).toBe('function');
});

it('createSortClickHandler() should call updateSort with the new sort vals', function () {
  var column = { name: 'alpha' };
  var prevSort = { key: 'alpha', dir: 1 };
  var currentSortKey = prevSort.key;
  var currentSortDir = prevSort.dir;
  var updateSort = _sinon2.default.spy();

  var clickHandler = sortUtils.createSortClickHandler(column, currentSortKey, currentSortDir, updateSort);

  clickHandler();

  expect(updateSort.calledWith(sortUtils.getNewSortForClick(prevSort, column).key, sortUtils.getNewSortForClick(prevSort, column).dir)).toBeTruthy();
});