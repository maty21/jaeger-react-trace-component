'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _comparators;

exports.sortTraces = sortTraces;

var _orderBy = require('./order-by');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //      

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

var comparators = (_comparators = {}, _defineProperty(_comparators, _orderBy.MOST_RECENT, function (a, b) {
  return +(b.startTime > a.startTime) || +(a.startTime === b.startTime) - 1;
}), _defineProperty(_comparators, _orderBy.SHORTEST_FIRST, function (a, b) {
  return +(a.duration > b.duration) || +(a.duration === b.duration) - 1;
}), _defineProperty(_comparators, _orderBy.LONGEST_FIRST, function (a, b) {
  return +(b.duration > a.duration) || +(a.duration === b.duration) - 1;
}), _defineProperty(_comparators, _orderBy.MOST_SPANS, function (a, b) {
  return +(b.spans.length > a.spans.length) || +(a.spans.length === b.spans.length) - 1;
}), _defineProperty(_comparators, _orderBy.LEAST_SPANS, function (a, b) {
  return +(a.spans.length > b.spans.length) || +(a.spans.length === b.spans.length) - 1;
}), _comparators);

/**
 * Sorts `Trace[]`, in place.
 *
 * @param  {Trace[]} traces The `Trace` array to sort.
 * @param  {string} sortBy A sort specification, see ./order-by.js.
 */
function sortTraces(traces, sortBy) {
  var comparator = comparators[sortBy] || comparators[_orderBy.LONGEST_FIRST];
  traces.sort(comparator);
}