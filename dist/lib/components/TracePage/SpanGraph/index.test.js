'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2017 Uber Technologies, Inc.
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _CanvasSpanGraph = require('./CanvasSpanGraph');

var _CanvasSpanGraph2 = _interopRequireDefault(_CanvasSpanGraph);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _TickLabels = require('./TickLabels');

var _TickLabels2 = _interopRequireDefault(_TickLabels);

var _ViewingLayer = require('./ViewingLayer');

var _ViewingLayer2 = _interopRequireDefault(_ViewingLayer);

var _traceGenerators = require('../../../../src/demo/trace-generators');

var _traceGenerators2 = _interopRequireDefault(_traceGenerators);

var _transformTraceData = require('../../../model/transform-trace-data');

var _transformTraceData2 = _interopRequireDefault(_transformTraceData);

var _requestAnimationFrame = require('../../../utils/test/requestAnimationFrame');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<SpanGraph>', function () {
  (0, _requestAnimationFrame.polyfill)(window);

  var trace = (0, _transformTraceData2.default)(_traceGenerators2.default.trace({}));
  var props = {
    trace: trace,
    updateViewRangeTime: function updateViewRangeTime() {},
    viewRange: {
      time: {
        current: [0, 1]
      }
    }
  };

  var wrapper = void 0;

  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, props));
  });

  it('renders a <CanvasSpanGraph />', function () {
    expect(wrapper.find(_CanvasSpanGraph2.default).length).toBe(1);
  });

  it('renders a <TickLabels />', function () {
    expect(wrapper.find(_TickLabels2.default).length).toBe(1);
  });

  it('returns a <div> if a trace is not provided', function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, _extends({}, props, { trace: null })));
    expect(wrapper.matchesElement(_react2.default.createElement('div', null))).toBeTruthy();
  });

  it('passes the number of ticks to render to components', function () {
    var tickHeader = wrapper.find(_TickLabels2.default);
    var viewingLayer = wrapper.find(_ViewingLayer2.default);
    expect(tickHeader.prop('numTicks')).toBeGreaterThan(1);
    expect(viewingLayer.prop('numTicks')).toBeGreaterThan(1);
    expect(tickHeader.prop('numTicks')).toBe(viewingLayer.prop('numTicks'));
  });

  it('passes items to CanvasSpanGraph', function () {
    var canvasGraph = wrapper.find(_CanvasSpanGraph2.default).first();
    var items = trace.spans.map(function (span) {
      return {
        valueOffset: span.relativeStartTime,
        valueWidth: span.duration,
        serviceName: span.process.serviceName
      };
    });
    expect(canvasGraph.prop('items')).toEqual(items);
  });
});