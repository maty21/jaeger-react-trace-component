'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transfromTraceData;

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _trace = require('../selectors/trace');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * NOTE: Mutates `data` - Transform the HTTP response data into the form the app
 * generally requires.
 */
//      

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

function transfromTraceData(data) {
  var traceID = data.traceID;

  if (!traceID) {
    return null;
  }
  traceID = traceID.toLowerCase();

  var traceEndTime = 0;
  var traceStartTime = Number.MAX_SAFE_INTEGER;
  var spanIdCounts = new Map();
  var spanMap = new Map();
  // filter out spans with empty start times
  // eslint-disable-next-line no-param-reassign
  data.spans = data.spans.filter(function (span) {
    return Boolean(span.startTime);
  });

  var max = data.spans.length;
  for (var i = 0; i < max; i++) {
    var span = data.spans[i];
    var startTime = span.startTime,
        duration = span.duration,
        processID = span.processID;
    //

    var spanID = span.spanID;
    // check for start / end time for the trace
    if (startTime < traceStartTime) {
      traceStartTime = startTime;
    }
    if (startTime + duration > traceEndTime) {
      traceEndTime = startTime + duration;
    }
    // make sure span IDs are unique
    var idCount = spanIdCounts.get(spanID);
    if (idCount != null) {
      // eslint-disable-next-line no-console
      console.warn('Dupe spanID, ' + (idCount + 1) + ' x ' + spanID, span, spanMap.get(spanID));
      if ((0, _isEqual3.default)(span, spanMap.get(spanID))) {
        // eslint-disable-next-line no-console
        console.warn('\t two spans with same ID have `isEqual(...) === true`');
      }
      spanIdCounts.set(spanID, idCount + 1);
      spanID = spanID + '_' + idCount;
      span.spanID = spanID;
    } else {
      spanIdCounts.set(spanID, 1);
    }
    span.process = data.processes[processID];
    spanMap.set(spanID, span);
  }
  // tree is necessary to sort the spans, so children follow parents, and
  // siblings are sorted by start time
  var tree = (0, _trace.getTraceSpanIdsAsTree)(data);
  var spans = [];
  var svcCounts = {};
  var traceName = '';

  tree.walk(function (spanID, node, depth) {
    if (spanID === '__root__') {
      return;
    }
    var span = spanMap.get(spanID);
    if (!span) {
      return;
    }
    var serviceName = span.process.serviceName;

    svcCounts[serviceName] = (svcCounts[serviceName] || 0) + 1;
    if (!span.references || !span.references.length) {
      traceName = serviceName + ': ' + span.operationName;
    }
    span.relativeStartTime = span.startTime - traceStartTime;
    span.depth = depth - 1;
    span.hasChildren = node.children.length > 0;
    span.references.forEach(function (ref) {
      var refSpan = spanMap.get(ref.spanID);
      if (refSpan) {
        // eslint-disable-next-line no-param-reassign
        ref.span = refSpan;
      }
    });
    spans.push(span);
  });
  var services = Object.keys(svcCounts).map(function (name) {
    return { name: name, numberOfSpans: svcCounts[name] };
  });
  return {
    services: services,
    spans: spans,
    traceID: traceID,
    traceName: traceName,
    // can't use spread operator for intersection types
    // repl: https://goo.gl/4Z23MJ
    // issue: https://github.com/facebook/flow/issues/1511
    processes: data.processes,
    duration: traceEndTime - traceStartTime,
    startTime: traceStartTime,
    endTime: traceEndTime
  };
}