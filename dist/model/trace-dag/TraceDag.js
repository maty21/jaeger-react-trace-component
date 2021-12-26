'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //      

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

var _DagNode = require('./DagNode');

var _DagNode2 = _interopRequireDefault(_DagNode);

var _DenseTrace = require('./DenseTrace');

var _DenseTrace2 = _interopRequireDefault(_DenseTrace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TraceDag = function () {
  _createClass(TraceDag, null, [{
    key: 'newFromTrace',
    value: function newFromTrace(trace) {
      var dt = new TraceDag();
      dt._initFromTrace(trace);
      return dt;
    }
  }, {
    key: 'diff',
    value: function diff(a, b) {
      var dt = new TraceDag();
      var key = 'a';

      function pushDagNode(src) {
        var node = dt._getDagNode(src.service, src.operation, src.children.size > 0, src.parentID, {
          a: 0,
          b: 0
        });
        var data = node.data;

        data[key] = src.count;
        node.count = data.b - data.a;
        if (!node.parentID) {
          dt.rootIDs.add(node.id);
        }
      }
      key = 'a';
      [].concat(_toConsumableArray(a.nodesMap.values())).forEach(pushDagNode);
      key = 'b';
      [].concat(_toConsumableArray(b.nodesMap.values())).forEach(pushDagNode);
      return dt;
    }
  }]);

  function TraceDag() {
    _classCallCheck(this, TraceDag);

    this.denseTrace = null;
    this.nodesMap = new Map();
    this.rootIDs = new Set();
  }

  _createClass(TraceDag, [{
    key: '_initFromTrace',
    value: function _initFromTrace(trace, data) {
      var _this = this;

      this.denseTrace = new _DenseTrace2.default(trace);
      [].concat(_toConsumableArray(this.denseTrace.rootIDs)).forEach(function (id) {
        return _this._addDenseSpan(id, null, data);
      });
    }
  }, {
    key: '_getDagNode',
    value: function _getDagNode(service, operation, hasChildren, parentID, data) {
      var nodeID = _DagNode2.default.getID(service, operation, hasChildren, parentID);
      var node = this.nodesMap.get(nodeID);
      if (node) {
        return node;
      }
      node = new _DagNode2.default(service, operation, hasChildren, parentID, data);
      this.nodesMap.set(nodeID, node);
      if (!parentID) {
        this.rootIDs.add(nodeID);
      } else {
        var parentDag = this.nodesMap.get(parentID);
        if (parentDag) {
          parentDag.children.add(nodeID);
        }
      }
      return node;
    }
  }, {
    key: '_addDenseSpan',
    value: function _addDenseSpan(spanID, parentNodeID, data) {
      var _this2 = this;

      var denseSpan = this.denseTrace && this.denseTrace.denseSpansMap.get(spanID);
      if (!denseSpan) {
        console.warn('Missing dense span: ' + spanID);
        return;
      }
      var children = denseSpan.children,
          operation = denseSpan.operation,
          service = denseSpan.service,
          skipToChild = denseSpan.skipToChild;

      var nodeID = null;
      if (!skipToChild) {
        var node = this._getDagNode(service, operation, children.size > 0, parentNodeID, data);
        node.count++;
        nodeID = node.id;
      } else {
        nodeID = parentNodeID;
      }
      [].concat(_toConsumableArray(children)).forEach(function (id) {
        return _this2._addDenseSpan(id, nodeID, data);
      });
    }
  }]);

  return TraceDag;
}();

exports.default = TraceDag;