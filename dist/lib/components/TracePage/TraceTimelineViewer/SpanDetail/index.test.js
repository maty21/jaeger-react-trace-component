'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _AccordianKeyValues = require('./AccordianKeyValues');

var _AccordianKeyValues2 = _interopRequireDefault(_AccordianKeyValues);

var _AccordianLogs = require('./AccordianLogs');

var _AccordianLogs2 = _interopRequireDefault(_AccordianLogs);

var _DetailState = require('./DetailState');

var _DetailState2 = _interopRequireDefault(_DetailState);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _utils = require('../utils');

var _LabeledList = require('../../../common/LabeledList');

var _LabeledList2 = _interopRequireDefault(_LabeledList);

var _traceGenerators = require('../../../../demo/trace-generators');

var _traceGenerators2 = _interopRequireDefault(_traceGenerators);

var _transformTraceData = require('../../../../model/transform-trace-data');

var _transformTraceData2 = _interopRequireDefault(_transformTraceData);

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

/* eslint-disable import/first */
jest.mock('../utils');

describe('<SpanDetail>', function () {
  var wrapper = void 0;

  // use `transformTraceData` on a fake trace to get a fully processed span
  var span = (0, _transformTraceData2.default)(_traceGenerators2.default.trace({ numberOfSpans: 1 })).spans[0];
  var detailState = new _DetailState2.default().toggleLogs().toggleProcess().toggleTags();
  var traceStartTime = 5;
  var props = {
    detailState: detailState,
    span: span,
    traceStartTime: traceStartTime,
    logItemToggle: jest.fn(),
    logsToggle: jest.fn(),
    processToggle: jest.fn(),
    tagsToggle: jest.fn()
  };
  span.logs = [{
    timestamp: 10,
    fields: [{ key: 'message', value: 'oh the log message' }, { key: 'something', value: 'else' }]
  }, {
    timestamp: 20,
    fields: [{ key: 'message', value: 'oh the next log message' }, { key: 'more', value: 'stuff' }]
  }];

  beforeEach(function () {
    _utils.formatDuration.mockReset();
    props.tagsToggle.mockReset();
    props.processToggle.mockReset();
    props.logsToggle.mockReset();
    props.logItemToggle.mockReset();
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, props));
  });

  it('renders without exploding', function () {
    expect(wrapper).toBeDefined();
  });

  it('shows the operation name', function () {
    expect(wrapper.find('h2').text()).toBe(span.operationName);
  });

  it('lists the service name, duration and start time', function () {
    var words = ['Duration:', 'Service:', 'Start Time:'];
    var overview = wrapper.find(_LabeledList2.default);
    expect(overview.prop('items').map(function (item) {
      return item.label;
    }).sort()).toEqual(words);
  });

  it('renders the span tags', function () {
    var target = _react2.default.createElement(_AccordianKeyValues2.default, { data: span.tags, label: 'Tags', isOpen: detailState.isTagsOpen });
    expect(wrapper.containsMatchingElement(target)).toBe(true);
    wrapper.find({ data: span.tags }).simulate('toggle');
    expect(props.tagsToggle).toHaveBeenLastCalledWith(span.spanID);
  });

  it('renders the process tags', function () {
    var target = _react2.default.createElement(_AccordianKeyValues2.default, { data: span.process.tags, label: 'Process', isOpen: detailState.isProcessOpen });
    expect(wrapper.containsMatchingElement(target)).toBe(true);
    wrapper.find({ data: span.process.tags }).simulate('toggle');
    expect(props.processToggle).toHaveBeenLastCalledWith(span.spanID);
  });

  it('renders the logs', function () {
    var somethingUniq = {};
    var target = _react2.default.createElement(_AccordianLogs2.default, {
      logs: span.logs,
      isOpen: detailState.logs.isOpen,
      openedItems: detailState.logs.openedItems,
      timestamp: traceStartTime
    });
    expect(wrapper.containsMatchingElement(target)).toBe(true);
    var accordianLogs = wrapper.find(_AccordianLogs2.default);
    accordianLogs.simulate('toggle');
    accordianLogs.simulate('itemToggle', somethingUniq);
    expect(props.logsToggle).toHaveBeenLastCalledWith(span.spanID);
    expect(props.logItemToggle).toHaveBeenLastCalledWith(span.spanID, somethingUniq);
  });
});