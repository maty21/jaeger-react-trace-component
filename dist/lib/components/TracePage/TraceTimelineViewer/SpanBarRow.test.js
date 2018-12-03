'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _SpanBarRow = require('./SpanBarRow');

var _SpanBarRow2 = _interopRequireDefault(_SpanBarRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<SpanBarRow>', function () {
  var spanID = 'some-id';
  var props = {
    spanID: spanID,
    className: 'a-class-name',
    color: 'color-a',
    columnDivision: '0.5',
    depth: 3,
    isChildrenExpanded: true,
    isDetailExpanded: false,
    isFilteredOut: false,
    isParent: true,
    label: 'omg-awesome-label',
    onDetailToggled: jest.fn(),
    onChildrenToggled: jest.fn(),
    operationName: 'op-name',
    numTicks: 5,
    rpc: {
      viewStart: 0.25,
      viewEnd: 0.75,
      color: 'color-b',
      operationName: 'rpc-op-name',
      serviceName: 'rpc-service-name'
    },
    serviceName: 'service-name',
    showErrorIcon: false,
    viewEnd: 1,
    viewStart: 0
  };

  var wrapper = void 0;

  beforeEach(function () {
    props.onDetailToggled.mockReset();
    props.onChildrenToggled.mockReset();
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_SpanBarRow2.default, props));
  });

  it('renders without exploding', function () {
    expect(wrapper).toBeDefined();
  });

  it('escalates detail toggling', function () {
    var onDetailToggled = props.onDetailToggled;

    expect(onDetailToggled.mock.calls.length).toBe(0);
    wrapper.find('div.span-view').prop('onClick')();
    expect(onDetailToggled.mock.calls).toEqual([[spanID]]);
  });

  it('escalates children toggling', function () {
    var onChildrenToggled = props.onChildrenToggled;

    expect(onChildrenToggled.mock.calls.length).toBe(0);
    wrapper.find('SpanTreeOffset').prop('onClick')();
    expect(onChildrenToggled.mock.calls).toEqual([[spanID]]);
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