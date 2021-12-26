'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getViewedBounds = getViewedBounds;
exports.spanHasTag = spanHasTag;
exports.spanContainsErredSpan = spanContainsErredSpan;
exports.findServerChildSpan = findServerChildSpan;

var _date = require('../../../utils/date');

Object.defineProperty(exports, 'formatDuration', {
  enumerable: true,
  get: function get() {
    return _date.formatDuration;
  }
});
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

/**
 * Given a range (`min`, `max`), finds the position of a sub-range (`start`,
 * `end`) factoring in a zoom (`viewStart`, `viewEnd`). The result is returned
 * as a `{ start, end }` object with values ranging in [0, 1].
 *
 * @param  {number} min       The start of the outer range.
 * @param  {number} max       The end of the outer range.
 * @param  {number} start     The start of the sub-range.
 * @param  {number} end       The end of the sub-range.
 * @param  {number} viewStart The start of the zoom, on a range of [0, 1],
 *                            relative to the `min`, `max`.
 * @param  {number} viewEnd   The end of the zoom, on a range of [0, 1],
 *                            relative to the `min`, `max`.
 * @return {Object}           The resultant range.
 */
function getViewedBounds(_ref) {
  var min = _ref.min,
      max = _ref.max,
      start = _ref.start,
      end = _ref.end,
      viewStart = _ref.viewStart,
      viewEnd = _ref.viewEnd;

  var duration = max - min;
  var viewMin = min + viewStart * duration;
  var viewMax = max - (1 - viewEnd) * duration;
  var viewWindow = viewMax - viewMin;
  return {
    start: (start - viewMin) / viewWindow,
    end: (end - viewMin) / viewWindow
  };
}

/**
 * Returns `true` if the `span` has a tag matching `key` = `value`.
 *
 * @param  {string} key   The tag key to match on.
 * @param  {any}    value The tag value to match.
 * @param  {{tags}} span  An object with a `tags` property of { key, value }
 *                        items.
 * @return {boolean}      True if a match was found.
 */
function spanHasTag(key, value, span) {
  if (!Array.isArray(span.tags) || !span.tags.length) {
    return false;
  }
  return span.tags.some(function (tag) {
    return tag.key === key && tag.value === value;
  });
}

var isClientSpan = exports.isClientSpan = spanHasTag.bind(null, 'span.kind', 'client');
var isServerSpan = exports.isServerSpan = spanHasTag.bind(null, 'span.kind', 'server');

var isErrorBool = spanHasTag.bind(null, 'error', true);
var isErrorStr = spanHasTag.bind(null, 'error', 'true');
var isErrorSpan = exports.isErrorSpan = function isErrorSpan(span) {
  return isErrorBool(span) || isErrorStr(span);
};

/**
 * Returns `true` if at least one of the descendants of the `parentSpanIndex`
 * span contains an error tag.
 *
 * @param      {Span[]}   spans            The spans for a trace - should be
 *                                         sorted with children following parents.
 * @param      {number}   parentSpanIndex  The index of the parent span - only
 *                                         subsequent spans with depth less than
 *                                         the parent span will be checked.
 * @return     {boolean}  Returns `true` if a descendant contains an error tag.
 */
function spanContainsErredSpan(spans, parentSpanIndex) {
  var depth = spans[parentSpanIndex].depth;

  var i = parentSpanIndex + 1;
  for (; i < spans.length && spans[i].depth > depth; i++) {
    if (isErrorSpan(spans[i])) {
      return true;
    }
  }
  return false;
}

/**
 * Expects the first span to be the parent span.
 */
function findServerChildSpan(spans) {
  if (spans.length <= 1 || !isClientSpan(spans[0])) {
    return false;
  }
  var span = spans[0];
  var spanChildDepth = span.depth + 1;
  var i = 1;
  while (i < spans.length && spans[i].depth === spanChildDepth) {
    if (isServerSpan(spans[i])) {
      return spans[i];
    }
    i++;
  }
  return null;
}