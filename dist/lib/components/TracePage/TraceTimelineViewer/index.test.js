'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _traceGenerators = require('../../../demo/trace-generators');

var _traceGenerators2 = _interopRequireDefault(_traceGenerators);

var _transformTraceData = require('../../../model/transform-trace-data');

var _transformTraceData2 = _interopRequireDefault(_transformTraceData);

var _TimelineHeaderRow = require('./TimelineHeaderRow');

var _TimelineHeaderRow2 = _interopRequireDefault(_TimelineHeaderRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

describe('<TraceTimelineViewer>', function () {
  var trace = (0, _transformTraceData2.default)(_traceGenerators2.default.trace({}));
  var props = {
    trace: trace,
    textFilter: null,
    viewRange: {
      time: {
        current: [0, 1]
      }
    },
    spanNameColumnWidth: 0.5,
    expandAll: jest.fn(),
    collapseAll: jest.fn(),
    expandOne: jest.fn(),
    collapseOne: jest.fn()
  };
  var options = {
    context: {
      store: {
        getState: function getState() {
          return { traceTimeline: { spanNameColumnWidth: 0.25 } };
        },
        subscribe: function subscribe() {},
        dispatch: function dispatch() {}
      }
    }
  };

  var wrapper = void 0;
  var connectedWrapper = void 0;

  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index.TraceTimelineViewerImpl, props), options);
    connectedWrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, props), options);
  });

  it('it does not explode', function () {
    expect(wrapper).toBeDefined();
    expect(connectedWrapper).toBeDefined();
  });

  it('it sets up actions', function () {
    var headerRow = wrapper.find(_TimelineHeaderRow2.default);
    headerRow.props().onCollapseAll();
    headerRow.props().onExpandAll();
    headerRow.props().onExpandOne();
    headerRow.props().onCollapseOne();
    expect(props.collapseAll.mock.calls.length).toBe(1);
    expect(props.expandAll.mock.calls.length).toBe(1);
    expect(props.expandOne.mock.calls.length).toBe(1);
    expect(props.collapseOne.mock.calls.length).toBe(1);
  });
});