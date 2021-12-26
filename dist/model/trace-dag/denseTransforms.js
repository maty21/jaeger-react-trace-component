'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = denseTransforms;

var _tagKeys = require('../../constants/tag-keys');

var tagKeys = _interopRequireWildcard(_tagKeys);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //      

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

// -	if span
//     -	is client span
//     -	is leaf
//     -	has parent.operation startsWith self-tag peer.service
//     -	has parent.operation endsWith self.operation
//     -	set self.service = self-tag peer.service
function fixLeafService(denseSpan, map) {
  var children = denseSpan.children,
      operation = denseSpan.operation,
      parentID = denseSpan.parentID,
      tags = denseSpan.tags;

  var parent = parentID != null && map.get(parentID);
  var kind = tags[tagKeys.SPAN_KIND];
  var peerSvc = tags[tagKeys.PEER_SERVICE];
  if (!parent || children.size > 0 || kind !== 'client' || !peerSvc) {
    return;
  }
  var parentOp = parent.operation;

  if (parentOp.indexOf(peerSvc) === 0 && parentOp.slice(-operation.length) === operation) {
    // eslint-disable-next-line no-param-reassign
    denseSpan.service = peerSvc;
  }
}

// -	if span
//     -	is server span
//     -	parent is client span
//     -	parent has one child (self)
//     -	(parent.operation OR parent-tag peer.service) startsWith self.service
//     -	set parent.skipToChild = true
function skipClient(denseSpan, map) {
  var parentID = denseSpan.parentID,
      service = denseSpan.service,
      tags = denseSpan.tags;

  var parent = parentID != null && map.get(parentID);
  if (!parent) {
    return;
  }
  var kind = tags[tagKeys.SPAN_KIND];
  var parentKind = parent.tags[tagKeys.SPAN_KIND];
  var parentPeerSvc = parent.tags[tagKeys.PEER_SERVICE] || '';
  if (kind === 'server' && parentKind === 'client' && parent.children.size === 1) {
    parent.skipToChild = parent.operation.indexOf(service) === 0 || parentPeerSvc.indexOf(service) === 0;
  }
}

// -	if span
//     -	is server span
//     -	has operation === tag http.method
//     -	(parent.operation OR parent-tag peer.service) startsWith self.service
//     - fix self.operation
function fixHttpOperation(denseSpan, map) {
  var parentID = denseSpan.parentID,
      operation = denseSpan.operation,
      service = denseSpan.service,
      tags = denseSpan.tags;

  var parent = parentID != null && map.get(parentID);
  if (!parent) {
    return;
  }
  var kind = tags[tagKeys.SPAN_KIND];
  var httpMethod = tags[tagKeys.HTTP_METHOD];
  if (kind !== 'server' || operation !== httpMethod) {
    return;
  }
  var parentPeerSvc = parent.tags[tagKeys.PEER_SERVICE] || '';
  if (parent.operation.indexOf(service) === 0 || parentPeerSvc.indexOf(service) === 0) {
    var rx = new RegExp('^' + service + '(::)?');
    var endpoint = parent.operation.replace(rx, '');
    // eslint-disable-next-line no-param-reassign
    denseSpan.operation = httpMethod + ' ' + endpoint;
  }
}

// -	if span
//     - has no tags
//     - has only one child
//     - parent.process === self.process
//     - set self.skipToChild = true
function skipAnnotationSpans(denseSpan, map) {
  var children = denseSpan.children,
      parentID = denseSpan.parentID,
      span = denseSpan.span;

  if (children.size !== 1 || span.tags.length !== 0) {
    return;
  }
  var parent = parentID != null && map.get(parentID);
  var childID = [].concat(_toConsumableArray(children))[0];
  var child = childID != null && map.get(childID);
  if (!parent || !child) {
    return;
  }
  // eslint-disable-next-line no-param-reassign
  denseSpan.skipToChild = parent.span.processID === span.processID;
}

// -	if span
//     - is a client span
//     - has only one child
//     - the child is a server span
//     - parent.span.processID === self.span.processID
//     - set parent.skipToChild = true
function skipClientSpans(denseSpan, map) {
  var children = denseSpan.children,
      parentID = denseSpan.parentID,
      span = denseSpan.span,
      tags = denseSpan.tags;

  if (children.size !== 1 || tags[tagKeys.SPAN_KIND] !== 'client') {
    return;
  }
  var parent = parentID != null && map.get(parentID);
  var childID = [].concat(_toConsumableArray(children))[0];
  var child = childID != null && map.get(childID);
  if (!parent || !child) {
    return;
  }
  // eslint-disable-next-line no-param-reassign
  denseSpan.skipToChild = child.tags[tagKeys.SPAN_KIND] === 'client' && parent.span.processID === span.processID;
}

function denseTransforms(denseSpan, map) {
  fixLeafService(denseSpan, map);
  skipClient(denseSpan, map);
  fixHttpOperation(denseSpan, map);
  skipAnnotationSpans(denseSpan, map);
  skipClientSpans(denseSpan, map);
}