'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var TreeNode = function () {
  _createClass(TreeNode, null, [{
    key: 'iterFunction',
    value: function iterFunction(fn) {
      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      return function (node) {
        return fn(node.value, node, depth);
      };
    }
  }, {
    key: 'searchFunction',
    value: function searchFunction(search) {
      if (typeof search === 'function') {
        return search;
      }

      return function (value, node) {
        return search instanceof TreeNode ? node === search : value === search;
      };
    }
  }]);

  function TreeNode(value) {
    var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, TreeNode);

    this.value = value;
    this.children = children;
  }

  _createClass(TreeNode, [{
    key: 'addChild',
    value: function addChild(child) {
      this.children.push(child instanceof TreeNode ? child : new TreeNode(child));
      return this;
    }
  }, {
    key: 'find',
    value: function find(search) {
      var searchFn = TreeNode.iterFunction(TreeNode.searchFunction(search));
      if (searchFn(this)) {
        return this;
      }
      for (var i = 0; i < this.children.length; i++) {
        var result = this.children[i].find(search);
        if (result) {
          return result;
        }
      }
      return null;
    }
  }, {
    key: 'getPath',
    value: function getPath(search) {
      var searchFn = TreeNode.iterFunction(TreeNode.searchFunction(search));

      var findPath = function findPath(currentNode, currentPath) {
        // skip if we already found the result
        var attempt = currentPath.concat([currentNode]);
        // base case: return the array when there is a match
        if (searchFn(currentNode)) {
          return attempt;
        }
        for (var i = 0; i < currentNode.children.length; i++) {
          var child = currentNode.children[i];
          var match = findPath(child, attempt);
          if (match) {
            return match;
          }
        }
        return null;
      };

      return findPath(this, []);
    }
  }, {
    key: 'walk',
    value: function walk(fn) {
      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      TreeNode.iterFunction(fn, depth)(this);
      this.children.forEach(function (child) {
        return child.walk(fn, depth + 1);
      });
    }
  }, {
    key: 'depth',
    get: function get() {
      return this.children.reduce(function (depth, child) {
        return Math.max(child.depth + 1, depth);
      }, 1);
    }
  }, {
    key: 'size',
    get: function get() {
      var i = 0;
      this.walk(function () {
        return i++;
      });
      return i;
    }
  }]);

  return TreeNode;
}();

exports.default = TreeNode;