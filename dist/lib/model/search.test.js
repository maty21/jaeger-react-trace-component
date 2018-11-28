'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2017 Uber Technologies, Inc.
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

var _maxBy2 = require('lodash/maxBy');

var _maxBy3 = _interopRequireDefault(_maxBy2);

var _minBy2 = require('lodash/minBy');

var _minBy3 = _interopRequireDefault(_minBy2);

var _orderBy = require('./order-by');

var orderBy = _interopRequireWildcard(_orderBy);

var _search = require('./search');

var _traceGenerators = require('../demo/trace-generators');

var _traceGenerators2 = _interopRequireDefault(_traceGenerators);

var _transformTraceData = require('../model/transform-trace-data');

var _transformTraceData2 = _interopRequireDefault(_transformTraceData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('sortTraces()', function () {
  var _expecations;

  var idMinSpans = 4;
  var idMaxSpans = 2;
  var traces = [_extends({}, (0, _transformTraceData2.default)(_traceGenerators2.default.trace({ numberOfSpans: 3 })), { traceID: 1 }), _extends({}, (0, _transformTraceData2.default)(_traceGenerators2.default.trace({ numberOfSpans: 100 })), { traceID: idMaxSpans }), _extends({}, (0, _transformTraceData2.default)(_traceGenerators2.default.trace({ numberOfSpans: 5 })), { traceID: 3 }), _extends({}, (0, _transformTraceData2.default)(_traceGenerators2.default.trace({ numberOfSpans: 1 })), { traceID: idMinSpans })];

  var MOST_SPANS = orderBy.MOST_SPANS,
      LEAST_SPANS = orderBy.LEAST_SPANS,
      LONGEST_FIRST = orderBy.LONGEST_FIRST,
      SHORTEST_FIRST = orderBy.SHORTEST_FIRST,
      MOST_RECENT = orderBy.MOST_RECENT;


  var expecations = (_expecations = {}, _defineProperty(_expecations, MOST_RECENT, (0, _maxBy3.default)(traces, function (trace) {
    return trace.startTime;
  }).traceID), _defineProperty(_expecations, LONGEST_FIRST, (0, _maxBy3.default)(traces, function (trace) {
    return trace.duration;
  }).traceID), _defineProperty(_expecations, SHORTEST_FIRST, (0, _minBy3.default)(traces, function (trace) {
    return trace.duration;
  }).traceID), _defineProperty(_expecations, MOST_SPANS, idMaxSpans), _defineProperty(_expecations, LEAST_SPANS, idMinSpans), _expecations);
  expecations.invalidOrderBy = expecations[LONGEST_FIRST];

  Object.keys(expecations).forEach(function (sortBy) {
    it('sorts by ' + sortBy, function () {
      var traceID = expecations[sortBy];
      (0, _search.sortTraces)(traces, sortBy);
      expect(traces[0].traceID).toBe(traceID);
    });
  });
});