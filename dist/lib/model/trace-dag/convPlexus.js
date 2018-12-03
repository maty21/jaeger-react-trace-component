'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = convPlexus;

var _DagNode = require('./DagNode');

var _DagNode2 = _interopRequireDefault(_DagNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function convPlexus(nodesMap) {
  var vertices = [];
  var edges = [];
  var ids = [].concat(_toConsumableArray(nodesMap.keys()));
  var keyMap = new Map(ids.map(function (id, i) {
    return [id, i];
  }));
  for (var i = 0; i < ids.length; i++) {
    var id = ids[i];
    var dagNode = nodesMap.get(id);
    if (!dagNode) {
      // should not happen, keep flow happy
      continue;
    }
    vertices.push({
      key: i,
      label: dagNode.count + ' | ' + dagNode.operation,
      data: dagNode
    });
    var parentKey = dagNode.parentID && keyMap.get(dagNode.parentID);
    if (parentKey == null) {
      continue;
    }
    edges.push({
      from: parentKey,
      to: i
    });
  }
  return { edges: edges, vertices: vertices };
}