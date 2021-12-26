'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _denseTransforms = require('./denseTransforms');

var _denseTransforms2 = _interopRequireDefault(_denseTransforms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } //      

// Copyright (c) 2018 Uber Technologies, Inc.
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

function convSpans(spans) {
  var map = new Map();
  var roots = new Set();
  var ids = [];
  spans.forEach(function (span) {
    var id = span.spanID,
        operation = span.operationName,
        process = span.process,
        references = span.references,
        spanTags = span.tags;

    ids.push(id);
    var service = process.serviceName;

    var tags = spanTags.reduce(function (accum, tag) {
      var key = tag.key,
          value = tag.value;
      // eslint-disable-next-line no-param-reassign

      accum[key] = value;
      return accum;
    }, {});
    var parentID = null;
    if (references && references.length) {
      var _references$ = references[0],
          refType = _references$.refType,
          spanID = _references$.spanID;

      if (refType !== 'CHILD_OF' && refType !== 'FOLLOWS_FROM') {
        console.warn('Unrecognized ref type: ' + refType);
      } else {
        parentID = spanID;
      }
    }

    var denseSpan = {
      id: id,
      operation: operation,
      parentID: parentID,
      service: service,
      span: span,
      tags: tags,
      children: new Set(),
      skipToChild: false
    };
    var parent = parentID && map.get(parentID);
    if (!parent) {
      // some root spans have a parent ID but it is missing
      roots.add(id);
    } else {
      parent.children.add(id);
    }
    map.set(id, denseSpan);
  });
  return { ids: ids, map: map, roots: roots };
}

function makeDense(spanIDs, map) {
  spanIDs.forEach(function (id) {
    var denseSpan = map.get(id);
    // make flow happy
    if (denseSpan) {
      (0, _denseTransforms2.default)(denseSpan, map);
    }
  });
}

var DenseTrace = function DenseTrace(trace) {
  _classCallCheck(this, DenseTrace);

  this.trace = trace;

  var _convSpans = convSpans(trace.spans),
      ids = _convSpans.ids,
      map = _convSpans.map,
      roots = _convSpans.roots;

  makeDense(ids, map);
  this.rootIDs = roots;
  this.denseSpansMap = map;
};

exports.default = DenseTrace;