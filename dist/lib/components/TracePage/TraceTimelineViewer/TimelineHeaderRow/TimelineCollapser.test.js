'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _TimelineCollapser = require('./TimelineCollapser');

var _TimelineCollapser2 = _interopRequireDefault(_TimelineCollapser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<TimelineCollapser>', function () {
  it('renders without exploding', function () {
    var props = {
      onCollapseAll: function onCollapseAll() {},
      onCollapseOne: function onCollapseOne() {},
      onExpandAll: function onExpandAll() {},
      onExpandOne: function onExpandOne() {}
    };
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TimelineCollapser2.default, props));
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.TimelineCollapser').length).toBe(1);
  });
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