'use strict';

var _TreeNode = require('./TreeNode');

var _TreeNode2 = _interopRequireDefault(_TreeNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('TreeNode constructor should return a tree node', function () {
  var node = new _TreeNode2.default(4);

  expect(node.value).toBe(4);
  expect(node.children).toEqual([]);
}); // Copyright (c) 2017 Uber Technologies, Inc.
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

it('TreeNode constructor should return a tree node', function () {
  var node = new _TreeNode2.default(4, [new _TreeNode2.default(3)]);

  expect(node.value).toBe(4);
  expect(node.children).toEqual([new _TreeNode2.default(3)]);
});

it('depth should work for a single node', function () {
  expect(new _TreeNode2.default().depth).toBe(1);
});

it('depth should caluclate the depth', function () {
  var treeRoot = new _TreeNode2.default(1);
  var firstChildNode = new _TreeNode2.default(2);
  firstChildNode = firstChildNode.addChild(3);
  firstChildNode = firstChildNode.addChild(4);
  firstChildNode = firstChildNode.addChild(5);
  var secondChildNode = new _TreeNode2.default(6);
  var thirdDeepestChildNode = new _TreeNode2.default(7);
  thirdDeepestChildNode = thirdDeepestChildNode.addChild(8);
  thirdDeepestChildNode = thirdDeepestChildNode.addChild(9);
  thirdDeepestChildNode = thirdDeepestChildNode.addChild(10);
  secondChildNode = secondChildNode.addChild(thirdDeepestChildNode);
  firstChildNode = firstChildNode.addChild(secondChildNode);
  treeRoot = treeRoot.addChild(firstChildNode);
  treeRoot = treeRoot.addChild(11);
  treeRoot = treeRoot.addChild(12);

  expect(treeRoot.depth).toBe(5);
  expect(secondChildNode.depth).toBe(3);
});

it('size should walk to get total number of nodes', function () {
  var treeRoot = new _TreeNode2.default(1);
  var firstChildNode = new _TreeNode2.default(2);
  firstChildNode.addChild(3);
  firstChildNode.addChild(4);
  firstChildNode.addChild(5);
  var secondChildNode = new _TreeNode2.default(6);
  var thirdDeepestChildNode = new _TreeNode2.default(7);
  thirdDeepestChildNode.addChild(8);
  thirdDeepestChildNode.addChild(9);
  thirdDeepestChildNode.addChild(10);
  secondChildNode.addChild(thirdDeepestChildNode);
  firstChildNode.addChild(secondChildNode);
  treeRoot.addChild(firstChildNode);
  treeRoot.addChild(11);
  treeRoot.addChild(12);

  expect(treeRoot.size).toBe(12);
});

it('addChild() should add a child to the set', function () {
  var treeRoot = new _TreeNode2.default(4);
  treeRoot.addChild(3);
  treeRoot.addChild(1);
  treeRoot.addChild(2);

  expect(treeRoot).toEqual(new _TreeNode2.default(4, [new _TreeNode2.default(3), new _TreeNode2.default(1), new _TreeNode2.default(2)]));
});

it('addChild() should support taking a treenode', function () {
  var treeRoot = new _TreeNode2.default(4);
  var otherNode = new _TreeNode2.default(2);
  treeRoot.addChild(otherNode);
  treeRoot.addChild(1);
  treeRoot.addChild(2);

  expect(treeRoot).toEqual(new _TreeNode2.default(4, [otherNode, new _TreeNode2.default(1), new _TreeNode2.default(2)]));
});

it('addChild() should support the parent argument for nested insertion', function () {
  var treeRoot = new _TreeNode2.default(1);
  var secondTier = new _TreeNode2.default(2);
  var thirdTier = new _TreeNode2.default(3);
  treeRoot.addChild(secondTier);
  secondTier.addChild(thirdTier);

  expect(treeRoot).toEqual(new _TreeNode2.default(1, [new _TreeNode2.default(2, [new _TreeNode2.default(3)])]));
});

it('find() should return the found item for a function', function () {
  var treeRoot = new _TreeNode2.default(1);
  var firstChildNode = new _TreeNode2.default(2);
  firstChildNode.addChild(3);
  firstChildNode.addChild(4);
  firstChildNode.addChild(5);
  var secondChildNode = new _TreeNode2.default(6);
  var thirdDeepestChildNode = new _TreeNode2.default(7);
  thirdDeepestChildNode.addChild(8);
  thirdDeepestChildNode.addChild(9);
  thirdDeepestChildNode.addChild(10);
  secondChildNode.addChild(thirdDeepestChildNode);
  firstChildNode.addChild(secondChildNode);
  treeRoot.addChild(firstChildNode);
  treeRoot.addChild(11);
  treeRoot.addChild(12);

  expect(treeRoot.find(function (value) {
    return value === 6;
  })).toEqual(secondChildNode);
  expect(treeRoot.find(12)).toEqual(new _TreeNode2.default(12));
});

it('find() should return the found item for a value', function () {
  var treeRoot = new _TreeNode2.default(1);
  var firstChildNode = new _TreeNode2.default(2);
  firstChildNode.addChild(3);
  firstChildNode.addChild(4);
  firstChildNode.addChild(5);
  var secondChildNode = new _TreeNode2.default(6);
  var thirdDeepestChildNode = new _TreeNode2.default(7);
  thirdDeepestChildNode.addChild(8);
  thirdDeepestChildNode.addChild(9);
  thirdDeepestChildNode.addChild(10);
  secondChildNode.addChild(thirdDeepestChildNode);
  firstChildNode.addChild(secondChildNode);
  treeRoot.addChild(firstChildNode);
  treeRoot.addChild(11);
  treeRoot.addChild(12);

  expect(treeRoot.find(7)).toEqual(thirdDeepestChildNode);
  expect(treeRoot.find(12)).toEqual(new _TreeNode2.default(12));
});

it('find() should return the found item for a treenode', function () {
  var treeRoot = new _TreeNode2.default(1);
  var firstChildNode = new _TreeNode2.default(2);
  firstChildNode.addChild(3);
  firstChildNode.addChild(4);
  firstChildNode.addChild(5);
  var secondChildNode = new _TreeNode2.default(6);
  var thirdDeepestChildNode = new _TreeNode2.default(7);
  thirdDeepestChildNode.addChild(8);
  thirdDeepestChildNode.addChild(9);
  thirdDeepestChildNode.addChild(10);
  secondChildNode.addChild(thirdDeepestChildNode);
  firstChildNode.addChild(secondChildNode);
  treeRoot.addChild(firstChildNode);
  treeRoot.addChild(11);
  treeRoot.addChild(12);

  expect(treeRoot.find(thirdDeepestChildNode)).toEqual(thirdDeepestChildNode);
  expect(treeRoot.find(treeRoot)).toEqual(treeRoot);
});

it('find() should return null for none found', function () {
  var treeRoot = new _TreeNode2.default(1);
  var firstChildNode = new _TreeNode2.default(2);
  firstChildNode.addChild(3);
  firstChildNode.addChild(4);
  firstChildNode.addChild(5);
  var secondChildNode = new _TreeNode2.default(6);
  var thirdDeepestChildNode = new _TreeNode2.default(7);
  thirdDeepestChildNode.addChild(8);
  thirdDeepestChildNode.addChild(9);
  thirdDeepestChildNode.addChild(10);
  secondChildNode.addChild(thirdDeepestChildNode);
  firstChildNode.addChild(secondChildNode);
  treeRoot.addChild(firstChildNode);
  treeRoot.addChild(11);
  treeRoot.addChild(12);

  expect(treeRoot.find(13)).toBe(null);
  expect(treeRoot.find(function (value) {
    return value === 'foo';
  })).toBe(null);
});

it('getPath() should return the path to the node', function () {
  var treeRoot = new _TreeNode2.default(1);
  var firstChildNode = new _TreeNode2.default(2);
  firstChildNode.addChild(3);
  firstChildNode.addChild(4);
  firstChildNode.addChild(5);
  var secondChildNode = new _TreeNode2.default(6);
  var thirdDeepestChildNode = new _TreeNode2.default(7);
  thirdDeepestChildNode.addChild(8);
  thirdDeepestChildNode.addChild(9);
  thirdDeepestChildNode.addChild(10);
  secondChildNode.addChild(thirdDeepestChildNode);
  firstChildNode.addChild(secondChildNode);
  treeRoot.addChild(firstChildNode);
  treeRoot.addChild(11);
  treeRoot.addChild(12);

  expect(treeRoot.getPath(secondChildNode)).toEqual([treeRoot, firstChildNode, secondChildNode]);
});

it('getPath() should return null if the node is not in the tree', function () {
  var treeRoot = new _TreeNode2.default(1);
  var firstChildNode = new _TreeNode2.default(2);
  firstChildNode.addChild(3);
  firstChildNode.addChild(4);
  firstChildNode.addChild(5);
  var secondChildNode = new _TreeNode2.default(6);
  var thirdDeepestChildNode = new _TreeNode2.default(7);
  thirdDeepestChildNode.addChild(8);
  thirdDeepestChildNode.addChild(9);
  thirdDeepestChildNode.addChild(10);
  secondChildNode.addChild(thirdDeepestChildNode);
  firstChildNode.addChild(secondChildNode);
  treeRoot.addChild(firstChildNode);
  treeRoot.addChild(11);
  treeRoot.addChild(12);

  var exteriorNode = new _TreeNode2.default(15);

  expect(treeRoot.getPath(exteriorNode)).toEqual(null);
});

it('walk() should iterate over every item once in the right order', function () {
  /**
   * 1
   * | 2
   * | | 3
   * | | 4
   * | | 5
   * | | 6
   * | | | 7
   * | | | | 8
   * | | | | 9
   * | | | | 10
   * | 11
   * | 12
   */

  var treeRoot = new _TreeNode2.default(1);
  var firstChildNode = new _TreeNode2.default(2);
  firstChildNode.addChild(3);
  firstChildNode.addChild(4);
  firstChildNode.addChild(5);
  var secondChildNode = new _TreeNode2.default(6);
  var thirdDeepestChildNode = new _TreeNode2.default(7);
  thirdDeepestChildNode.addChild(8);
  thirdDeepestChildNode.addChild(9);
  thirdDeepestChildNode.addChild(10);
  secondChildNode.addChild(thirdDeepestChildNode);
  firstChildNode.addChild(secondChildNode);
  treeRoot.addChild(firstChildNode);
  treeRoot.addChild(11);
  treeRoot.addChild(12);

  var i = 0;

  treeRoot.walk(function (value) {
    return expect(value).toBe(++i);
  });
});