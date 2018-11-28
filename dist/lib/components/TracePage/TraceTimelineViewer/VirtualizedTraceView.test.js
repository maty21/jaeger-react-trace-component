'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ListView = require('./ListView');

var _ListView2 = _interopRequireDefault(_ListView);

var _SpanBarRow = require('./SpanBarRow');

var _SpanBarRow2 = _interopRequireDefault(_SpanBarRow);

var _DetailState = require('./SpanDetail/DetailState');

var _DetailState2 = _interopRequireDefault(_DetailState);

var _SpanDetailRow = require('./SpanDetailRow');

var _SpanDetailRow2 = _interopRequireDefault(_SpanDetailRow);

var _VirtualizedTraceView = require('./VirtualizedTraceView');

var _traceGenerators = require('../../../demo/trace-generators');

var _traceGenerators2 = _interopRequireDefault(_traceGenerators);

var _transformTraceData = require('../../../model/transform-trace-data');

var _transformTraceData2 = _interopRequireDefault(_transformTraceData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // Copyright (c) 2017 Uber Technologies, Inc.
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

describe('<VirtualizedTraceViewImpl>', function () {
  var wrapper = void 0;
  var instance = void 0;

  var trace = (0, _transformTraceData2.default)(_traceGenerators2.default.trace({ numberOfSpans: 10 }));
  var props = {
    trace: trace,
    childrenHiddenIDs: new Set(),
    childrenToggle: jest.fn(),
    currentViewRangeTime: [0.25, 0.75],
    detailLogItemToggle: jest.fn(),
    detailLogsToggle: jest.fn(),
    detailProcessToggle: jest.fn(),
    detailStates: new Map(),
    detailTagsToggle: jest.fn(),
    detailToggle: jest.fn(),
    findMatchesIDs: null,
    registerAccessors: jest.fn(),
    setSpanNameColumnWidth: jest.fn(),
    setTrace: jest.fn(),
    spanNameColumnWidth: 0.5
  };

  function expandRow(rowIndex) {
    var detailStates = new Map();
    var detailState = new _DetailState2.default();
    detailStates.set(trace.spans[rowIndex].spanID, detailState);
    wrapper.setProps({ detailStates: detailStates });
    return detailState;
  }

  function addSpansAndCollapseTheirParent() {
    var newSpanID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'some-id';

    var childrenHiddenIDs = new Set([newSpanID]);
    var spans = [trace.spans[0],
    // this span is condidered to have collapsed children
    { spanID: newSpanID, depth: 1 },
    // these two "spans" are children and should be hidden
    { depth: 2 }, { depth: 3 }].concat(_toConsumableArray(trace.spans.slice(1)));
    var _trace = _extends({}, trace, { spans: spans });
    wrapper.setProps({ childrenHiddenIDs: childrenHiddenIDs, trace: _trace });
    return spans;
  }

  function updateSpan(srcTrace, spanIndex, update) {
    var span = _extends({}, srcTrace.spans[spanIndex], update);
    var spans = [].concat(_toConsumableArray(srcTrace.spans.slice(0, spanIndex)), [span], _toConsumableArray(srcTrace.spans.slice(spanIndex + 1)));
    return _extends({}, srcTrace, { spans: spans });
  }

  beforeEach(function () {
    Object.keys(props).forEach(function (key) {
      if (typeof props[key] === 'function') {
        props[key].mockReset();
      }
    });
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_VirtualizedTraceView.VirtualizedTraceViewImpl, props));
    instance = wrapper.instance();
  });

  it('renders without exploding', function () {
    expect(wrapper).toBeDefined();
  });

  it('renders when a trace is not set', function () {
    wrapper.setProps({ trace: null });
    expect(wrapper).toBeDefined();
  });

  it('renders a ListView', function () {
    expect(wrapper.find(_ListView2.default)).toBeDefined();
  });

  it('sets the trace for global state.traceTimeline', function () {
    expect(props.setTrace.mock.calls).toEqual([[trace.traceID]]);
    props.setTrace.mockReset();
    var traceID = 'some-other-id';
    var _trace = _extends({}, trace, { traceID: traceID });
    wrapper.setProps({ trace: _trace });
    expect(props.setTrace.mock.calls).toEqual([[traceID]]);
  });

  describe('props.registerAccessors', function () {
    var lv = void 0;
    var expectedArg = void 0;

    beforeEach(function () {
      var getBottomRowIndexVisible = function getBottomRowIndexVisible() {};
      var getTopRowIndexVisible = function getTopRowIndexVisible() {};
      lv = {
        getViewHeight: function getViewHeight() {},
        getBottomVisibleIndex: getBottomRowIndexVisible,
        getTopVisibleIndex: getTopRowIndexVisible,
        getRowPosition: function getRowPosition() {}
      };
      expectedArg = {
        getBottomRowIndexVisible: getBottomRowIndexVisible,
        getTopRowIndexVisible: getTopRowIndexVisible,
        getViewHeight: lv.getViewHeight,
        getRowPosition: lv.getRowPosition,
        getViewRange: instance.getViewRange,
        getSearchedSpanIDs: instance.getSearchedSpanIDs,
        getCollapsedChildren: instance.getCollapsedChildren,
        mapRowIndexToSpanIndex: instance.mapRowIndexToSpanIndex,
        mapSpanIndexToRowIndex: instance.mapSpanIndexToRowIndex
      };
    });

    it('invokes when the listView is set', function () {
      expect(props.registerAccessors.mock.calls.length).toBe(0);
      instance.setListView(lv);
      expect(props.registerAccessors.mock.calls).toEqual([[expectedArg]]);
    });

    it('invokes when registerAccessors changes', function () {
      var registerAccessors = jest.fn();
      instance.setListView(lv);
      wrapper.setProps({ registerAccessors: registerAccessors });
      expect(registerAccessors.mock.calls).toEqual([[expectedArg]]);
    });
  });

  it('returns the current view range via getViewRange()', function () {
    expect(instance.getViewRange()).toBe(props.currentViewRangeTime);
  });

  it('returns findMatchesIDs via getSearchedSpanIDs()', function () {
    var findMatchesIDs = new Set();
    wrapper.setProps({ findMatchesIDs: findMatchesIDs });
    expect(instance.getSearchedSpanIDs()).toBe(findMatchesIDs);
  });

  it('returns childrenHiddenIDs via getCollapsedChildren()', function () {
    var childrenHiddenIDs = new Set();
    wrapper.setProps({ childrenHiddenIDs: childrenHiddenIDs });
    expect(instance.getCollapsedChildren()).toBe(childrenHiddenIDs);
  });

  describe('mapRowIndexToSpanIndex() maps row index to span index', function () {
    it('works when nothing is collapsed or expanded', function () {
      var i = trace.spans.length - 1;
      expect(instance.mapRowIndexToSpanIndex(i)).toBe(i);
    });

    it('works when a span is expanded', function () {
      expandRow(1);
      expect(instance.mapRowIndexToSpanIndex(0)).toBe(0);
      expect(instance.mapRowIndexToSpanIndex(1)).toBe(1);
      expect(instance.mapRowIndexToSpanIndex(2)).toBe(1);
      expect(instance.mapRowIndexToSpanIndex(3)).toBe(2);
    });

    it('works when a parent span is collapsed', function () {
      addSpansAndCollapseTheirParent();
      expect(instance.mapRowIndexToSpanIndex(0)).toBe(0);
      expect(instance.mapRowIndexToSpanIndex(1)).toBe(1);
      expect(instance.mapRowIndexToSpanIndex(2)).toBe(4);
      expect(instance.mapRowIndexToSpanIndex(3)).toBe(5);
    });
  });

  describe('mapSpanIndexToRowIndex() maps span index to row index', function () {
    it('works when nothing is collapsed or expanded', function () {
      var i = trace.spans.length - 1;
      expect(instance.mapSpanIndexToRowIndex(i)).toBe(i);
    });

    it('works when a span is expanded', function () {
      expandRow(1);
      expect(instance.mapSpanIndexToRowIndex(0)).toBe(0);
      expect(instance.mapSpanIndexToRowIndex(1)).toBe(1);
      expect(instance.mapSpanIndexToRowIndex(2)).toBe(3);
      expect(instance.mapSpanIndexToRowIndex(3)).toBe(4);
    });

    it('works when a parent span is collapsed', function () {
      addSpansAndCollapseTheirParent();
      expect(instance.mapSpanIndexToRowIndex(0)).toBe(0);
      expect(instance.mapSpanIndexToRowIndex(1)).toBe(1);
      expect(function () {
        return instance.mapSpanIndexToRowIndex(2);
      }).toThrow();
      expect(function () {
        return instance.mapSpanIndexToRowIndex(3);
      }).toThrow();
      expect(instance.mapSpanIndexToRowIndex(4)).toBe(2);
    });
  });

  describe('getKeyFromIndex() generates a "key" from a row index', function () {
    function verify(input, output) {
      expect(instance.getKeyFromIndex(input)).toBe(output);
    }

    it('works when nothing is expanded or collapsed', function () {
      verify(0, trace.spans[0].spanID + '--bar');
    });

    it('works when rows are expanded', function () {
      expandRow(1);
      verify(1, trace.spans[1].spanID + '--bar');
      verify(2, trace.spans[1].spanID + '--detail');
      verify(3, trace.spans[2].spanID + '--bar');
    });

    it('works when a parent span is collapsed', function () {
      var spans = addSpansAndCollapseTheirParent();
      verify(1, spans[1].spanID + '--bar');
      verify(2, spans[4].spanID + '--bar');
    });
  });

  describe('getIndexFromKey() converts a "key" to the corresponding row index', function () {
    function verify(input, output) {
      expect(instance.getIndexFromKey(input)).toBe(output);
    }

    it('works when nothing is expanded or collapsed', function () {
      verify(trace.spans[0].spanID + '--bar', 0);
    });

    it('works when rows are expanded', function () {
      expandRow(1);
      verify(trace.spans[1].spanID + '--bar', 1);
      verify(trace.spans[1].spanID + '--detail', 2);
      verify(trace.spans[2].spanID + '--bar', 3);
    });

    it('works when a parent span is collapsed', function () {
      var spans = addSpansAndCollapseTheirParent();
      verify(spans[1].spanID + '--bar', 1);
      verify(spans[4].spanID + '--bar', 2);
    });
  });

  describe('getRowHeight()', function () {
    it('returns the expected height for non-detail rows', function () {
      expect(instance.getRowHeight(0)).toBe(_VirtualizedTraceView.DEFAULT_HEIGHTS.bar);
    });

    it('returns the expected height for detail rows that do not have logs', function () {
      expandRow(0);
      expect(instance.getRowHeight(1)).toBe(_VirtualizedTraceView.DEFAULT_HEIGHTS.detail);
    });

    it('returns the expected height for detail rows that do have logs', function () {
      var logs = [{
        timestamp: Date.now(),
        fields: _traceGenerators2.default.tags()
      }];
      var altTrace = updateSpan(trace, 0, { logs: logs });
      expandRow(0);
      wrapper.setProps({ trace: altTrace });
      expect(instance.getRowHeight(1)).toBe(_VirtualizedTraceView.DEFAULT_HEIGHTS.detailWithLogs);
    });
  });

  describe('renderRow()', function () {
    it('renders a SpanBarRow when it is not a detail', function () {
      var span = trace.spans[1];
      var row = instance.renderRow('some-key', {}, 1, {});
      var rowWrapper = (0, _enzyme.shallow)(row);

      expect(rowWrapper.containsMatchingElement(_react2.default.createElement(_SpanBarRow2.default, {
        className: instance.clippingCssClasses,
        columnDivision: props.spanNameColumnWidth,
        depth: span.depth,
        isChildrenExpanded: true,
        isDetailExpanded: false,
        isMatchingFilter: false,
        isParent: span.hasChildren,
        numTicks: 5,
        onDetailToggled: props.detailToggle,
        onChildrenToggled: props.childrenToggle,
        operationName: span.operationName,
        rpc: undefined,
        serviceName: span.process.serviceName,
        showErrorIcon: false,
        spanID: span.spanID
      }))).toBe(true);
    });

    it('renders a SpanBarRow with a RPC span if the row is collapsed and a client span', function () {
      var clientTags = [{ key: 'span.kind', value: 'client' }].concat(_toConsumableArray(trace.spans[0].tags));
      var serverTags = [{ key: 'span.kind', value: 'server' }].concat(_toConsumableArray(trace.spans[1].tags));
      var altTrace = updateSpan(trace, 0, { tags: clientTags });
      altTrace = updateSpan(altTrace, 1, { tags: serverTags });
      var childrenHiddenIDs = new Set([altTrace.spans[0].spanID]);
      wrapper.setProps({ childrenHiddenIDs: childrenHiddenIDs, trace: altTrace });

      var rowWrapper = (0, _enzyme.mount)(instance.renderRow('some-key', {}, 0, {}));
      var spanBarRow = rowWrapper.find(_SpanBarRow2.default);
      expect(spanBarRow.length).toBe(1);
      expect(spanBarRow.prop('rpc')).toBeDefined();
    });

    it('renders a SpanDetailRow when it is a detail', function () {
      var detailState = expandRow(1);
      var span = trace.spans[1];
      var row = instance.renderRow('some-key', {}, 2, {});
      var rowWrapper = (0, _enzyme.shallow)(row);
      expect(rowWrapper.containsMatchingElement(_react2.default.createElement(_SpanDetailRow2.default, {
        columnDivision: props.spanNameColumnWidth,
        onDetailToggled: props.detailToggle,
        detailState: detailState,
        logItemToggle: props.detailLogItemToggle,
        logsToggle: props.detailLogsToggle,
        processToggle: props.detailProcessToggle,
        span: span,
        tagsToggle: props.detailTagsToggle
      }))).toBe(true);
    });
  });
});