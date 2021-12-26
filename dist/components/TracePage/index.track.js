'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackFilter = exports.ACTION_RANGE_SHIFT = exports.ACTION_RANGE_REFRAME = exports.ACTION_FILTER_CLEAR = exports.ACTION_FILTER_SET = exports.CATEGORY_FILTER = exports.CATEGORY_RANGE = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); //      

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

exports.trackRange = trackRange;

var _throttle2 = require('lodash/throttle');

var _throttle3 = _interopRequireDefault(_throttle2);

var _tracking = require('../../utils/tracking');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export for tests
var CATEGORY_RANGE = exports.CATEGORY_RANGE = 'jaeger/ux/trace/range';
var CATEGORY_FILTER = exports.CATEGORY_FILTER = 'jaeger/ux/trace/range';

// export for tests
var ACTION_FILTER_SET = exports.ACTION_FILTER_SET = 'set';
var ACTION_FILTER_CLEAR = exports.ACTION_FILTER_CLEAR = 'clear';
var ACTION_RANGE_REFRAME = exports.ACTION_RANGE_REFRAME = 'reframe';
var ACTION_RANGE_SHIFT = exports.ACTION_RANGE_SHIFT = 'shift';

var trackFilterSet = (0, _throttle3.default)(_tracking.trackEvent.bind(null, CATEGORY_FILTER, ACTION_FILTER_SET), 750, {
  leading: false
});

var trackFilterClear = (0, _throttle3.default)(_tracking.trackEvent.bind(null, CATEGORY_FILTER, ACTION_FILTER_CLEAR), 750, {
  leading: false
});

var trackFilter = exports.trackFilter = function trackFilter(value) {
  return value ? trackFilterSet() : trackFilterClear();
};

function getRangeAction(current, next) {
  var _current = _slicedToArray(current, 2),
      curStart = _current[0],
      curEnd = _current[1];

  var _next = _slicedToArray(next, 2),
      nxStart = _next[0],
      nxEnd = _next[1];

  if (curStart === nxStart || curEnd === nxEnd) {
    return ACTION_RANGE_SHIFT;
  }
  var dStart = (curStart - nxStart).toPrecision(7);
  var dEnd = (curEnd - nxEnd).toPrecision(7);
  if (dStart === dEnd) {
    return ACTION_RANGE_SHIFT;
  }
  return ACTION_RANGE_REFRAME;
}

function trackRange(source, current, next) {
  var action = getRangeAction(current, next);
  (0, _tracking.trackEvent)(CATEGORY_RANGE, action, source);
}