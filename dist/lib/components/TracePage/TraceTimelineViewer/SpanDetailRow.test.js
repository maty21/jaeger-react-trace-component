'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _SpanDetailRow = require('./SpanDetailRow');

var _SpanDetailRow2 = _interopRequireDefault(_SpanDetailRow);

var _SpanDetail = require('./SpanDetail');

var _SpanDetail2 = _interopRequireDefault(_SpanDetail);

var _DetailState = require('./SpanDetail/DetailState');

var _DetailState2 = _interopRequireDefault(_DetailState);

var _SpanTreeOffset = require('./SpanTreeOffset');

var _SpanTreeOffset2 = _interopRequireDefault(_SpanTreeOffset);

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

describe('<SpanDetailRow>', function () {
  var spanID = 'some-id';
  var props = {
    color: 'some-color',
    columnDivision: 0.5,
    detailState: new _DetailState2.default(),
    onDetailToggled: jest.fn(),
    linksGetter: jest.fn(),
    isFilteredOut: false,
    logItemToggle: jest.fn(),
    logsToggle: jest.fn(),
    processToggle: jest.fn(),
    span: { spanID: spanID, depth: 3 },
    tagsToggle: jest.fn(),
    traceStartTime: 1000
  };

  var wrapper = void 0;

  beforeEach(function () {
    props.onDetailToggled.mockReset();
    props.linksGetter.mockReset();
    props.logItemToggle.mockReset();
    props.logsToggle.mockReset();
    props.processToggle.mockReset();
    props.tagsToggle.mockReset();
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_SpanDetailRow2.default, props));
  });

  it('renders without exploding', function () {
    expect(wrapper).toBeDefined();
  });

  it('escalates toggle detail', function () {
    var calls = props.onDetailToggled.mock.calls;
    expect(calls.length).toBe(0);
    wrapper.find('.detail-row-expanded-accent').prop('onClick')();
    expect(calls).toEqual([[spanID]]);
  });

  it('renders the span tree offset', function () {
    var spanTreeOffset = _react2.default.createElement(_SpanTreeOffset2.default, { level: props.span.depth + 1 });
    expect(wrapper.contains(spanTreeOffset)).toBe(true);
  });

  it('renders the "expanded accent"', function () {
    var elm = _react2.default.createElement('span', { className: 'detail-row-expanded-accent', style: { borderColor: props.color } });
    expect(wrapper.containsMatchingElement(elm)).toBe(true);
  });

  it('renders the SpanDetail', function () {
    var spanDetail = _react2.default.createElement(_SpanDetail2.default, {
      detailState: props.detailState,
      linksGetter: wrapper.instance()._linksGetter,
      logItemToggle: props.logItemToggle,
      logsToggle: props.logsToggle,
      processToggle: props.processToggle,
      span: props.span,
      tagsToggle: props.tagsToggle,
      traceStartTime: props.traceStartTime
    });
    expect(wrapper.contains(spanDetail)).toBe(true);
  });

  it('adds span when calling linksGetter', function () {
    var spanDetail = wrapper.find(_SpanDetail2.default);
    var linksGetter = spanDetail.prop('linksGetter');
    var tags = [{ key: 'myKey', value: 'myValue' }];
    var linksGetterResponse = {};
    props.linksGetter.mockReturnValueOnce(linksGetterResponse);
    var result = linksGetter(tags, 0);
    expect(result).toBe(linksGetterResponse);
    expect(props.linksGetter).toHaveBeenCalledTimes(1);
    expect(props.linksGetter).toHaveBeenCalledWith(props.span, tags, 0);
  });
});