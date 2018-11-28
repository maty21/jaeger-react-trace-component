'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localeStringComparator = localeStringComparator;
exports.numberSortComparator = numberSortComparator;
exports.classNameForSortDir = classNameForSortDir;
exports.getNewSortForClick = getNewSortForClick;
exports.createSortClickHandler = createSortClickHandler;
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

function localeStringComparator(itemA, itemB) {
  return itemA.localeCompare(itemB);
}

function numberSortComparator(itemA, itemB) {
  return itemA - itemB;
}

function classNameForSortDir(dir) {
  return 'sorted ' + (dir === 1 ? 'ascending' : 'descending');
}

function getNewSortForClick(prevSort, column) {
  var _column$defaultDir = column.defaultDir,
      defaultDir = _column$defaultDir === undefined ? 1 : _column$defaultDir;


  return {
    key: column.name,
    dir: prevSort.key === column.name ? -1 * prevSort.dir : defaultDir
  };
}

function createSortClickHandler(column, currentSortKey, currentSortDir, updateSort) {
  return function onClickSortingElement() {
    var _getNewSortForClick = getNewSortForClick({ key: currentSortKey, dir: currentSortDir }, column),
        key = _getNewSortForClick.key,
        dir = _getNewSortForClick.dir;

    updateSort(key, dir);
  };
}