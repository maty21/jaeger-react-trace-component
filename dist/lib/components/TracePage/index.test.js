'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _enzyme = require('enzyme');

var _index = require('./index');

var _index2 = require('./index.track');

var track = _interopRequireWildcard(_index2);

var _keyboardShortcuts = require('./keyboard-shortcuts');

var _scrollPage = require('./scroll-page');

var _SpanGraph = require('./SpanGraph');

var _SpanGraph2 = _interopRequireDefault(_SpanGraph);

var _TracePageHeader = require('./TracePageHeader');

var _TracePageHeader2 = _interopRequireDefault(_TracePageHeader);

var _TracePageHeader3 = require('./TracePageHeader.track');

var _TraceTimelineViewer = require('./TraceTimelineViewer');

var _TraceTimelineViewer2 = _interopRequireDefault(_TraceTimelineViewer);

var _ErrorMessage = require('../common/ErrorMessage');

var _ErrorMessage2 = _interopRequireDefault(_ErrorMessage);

var _LoadingIndicator = require('../common/LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _constants = require('../../constants');

var _traceGenerators = require('../../demo/trace-generators');

var _traceGenerators2 = _interopRequireDefault(_traceGenerators);

var _transformTraceData = require('../../model/transform-trace-data');

var _transformTraceData2 = _interopRequireDefault(_transformTraceData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
jest.mock('./index.track');
jest.mock('./keyboard-shortcuts');
jest.mock('./scroll-page');
// mock these to enable mount()
jest.mock('./SpanGraph');
jest.mock('./TracePageHeader.track');
jest.mock('./TraceTimelineViewer');

describe('makeShortcutCallbacks()', function () {
  var adjRange = void 0;

  beforeEach(function () {
    adjRange = jest.fn();
  });

  it('has props from `shortcutConfig`', function () {
    var callbacks = (0, _index.makeShortcutCallbacks)(adjRange);
    expect(Object.keys(callbacks)).toEqual(Object.keys(_index.shortcutConfig));
  });

  it('returns callbacsks that adjust the range based on the `shortcutConfig` values', function () {
    var fakeEvent = { preventDefault: function preventDefault() {} };
    var callbacks = (0, _index.makeShortcutCallbacks)(adjRange);
    Object.keys(_index.shortcutConfig).forEach(function (key, i) {
      var _expect;

      callbacks[key](fakeEvent);
      expect(adjRange).toHaveBeenCalledTimes(i + 1);
      (_expect = expect(adjRange)).toHaveBeenLastCalledWith.apply(_expect, _toConsumableArray(_index.shortcutConfig[key]));
    });
  });
});

describe('<TracePage>', function () {
  _TraceTimelineViewer2.default.prototype.shouldComponentUpdate.mockReturnValue(false);

  var trace = (0, _transformTraceData2.default)(_traceGenerators2.default.trace({}));
  var defaultProps = {
    trace: { data: trace, state: _constants.fetchedState.DONE },
    fetchTrace: function fetchTrace() {},

    id: trace.traceID
  };

  var wrapper = void 0;

  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index.TracePageImpl, defaultProps));
  });

  it.skip('renders a <TracePageHeader>', function () {
    expect(wrapper.find(_TracePageHeader2.default).get(0)).toBeTruthy();
  });

  it('renders a <SpanGraph>', function () {
    expect(wrapper.find(_SpanGraph2.default).length).toBe(1);
  });

  it('renders a a loading indicator when not provided a fetched trace', function () {
    wrapper.setProps({ trace: null });
    var loading = wrapper.find(_LoadingIndicator2.default);
    expect(loading.length).toBe(1);
  });

  it('renders an error message when given an error', function () {
    wrapper.setProps({ trace: new Error('some-error') });
    expect(wrapper.find(_ErrorMessage2.default).length).toBe(1);
  });

  it('renders a loading indicator when loading', function () {
    wrapper.setProps({ trace: null, loading: true });
    var loading = wrapper.find(_LoadingIndicator2.default);
    expect(loading.length).toBe(1);
  });

  it('fetches the trace if necessary', function () {
    var fetchTrace = _sinon2.default.spy();
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_index.TracePageImpl, _extends({}, defaultProps, { trace: null, fetchTrace: fetchTrace })));
    expect(fetchTrace.called).toBeTruthy();
    expect(fetchTrace.calledWith(trace.traceID)).toBe(true);
  });

  it.skip("doesn't fetch the trace if already present", function () {
    var fetchTrace = _sinon2.default.spy();
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_index.TracePageImpl, _extends({}, defaultProps, { fetchTrace: fetchTrace })));
    expect(fetchTrace.called).toBeFalsy();
  });

  it.skip('resets the view range when the trace changes', function () {
    var altTrace = _extends({}, trace, { traceID: 'some-other-id' });
    // mount because `.componentDidUpdate()`
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_index.TracePageImpl, defaultProps));
    wrapper.setState({ viewRange: { time: [0.2, 0.8] } });
    wrapper.setProps({ id: altTrace.traceID, trace: { data: altTrace, state: _constants.fetchedState.DONE } });
    expect(wrapper.state('viewRange')).toEqual({ time: { current: [0, 1] } });
  });

  it('updates _scrollManager when recieving props', function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index.TracePageImpl, _extends({}, defaultProps, { trace: null })));
    var scrollManager = wrapper.instance()._scrollManager;
    scrollManager.setTrace = jest.fn();
    wrapper.setProps({ trace: { data: trace } });
    expect(scrollManager.setTrace.mock.calls).toEqual([[trace]]);
  });

  it('performs misc cleanup when unmounting', function () {
    _keyboardShortcuts.reset.mockReset();
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index.TracePageImpl, _extends({}, defaultProps, { trace: null })));
    var scrollManager = wrapper.instance()._scrollManager;
    scrollManager.destroy = jest.fn();
    wrapper.unmount();
    expect(scrollManager.destroy.mock.calls).toEqual([[]]);
    expect(_keyboardShortcuts.reset.mock.calls).toEqual([[], []]);
    expect(_scrollPage.cancel.mock.calls).toEqual([[]]);
  });

  describe('_adjustViewRange()', function () {
    var instance = void 0;
    var time = void 0;
    var state = void 0;

    var cases = [{
      message: 'stays within the [0, 1] range',
      timeViewRange: [0, 1],
      change: [-0.1, 0.1],
      result: [0, 1]
    }, {
      message: 'start does not exceed 0.99',
      timeViewRange: [0, 1],
      change: [0.991, 0],
      result: [0.99, 1]
    }, {
      message: 'end remains greater than 0.01',
      timeViewRange: [0, 1],
      change: [0, -0.991],
      result: [0, 0.01]
    }, {
      message: 'maintains a range of at least ' + _index.VIEW_MIN_RANGE + ' when panning left',
      timeViewRange: [0.495, 0.505],
      change: [-0.001, -0.005],
      result: [0.494, 0.504]
    }, {
      message: 'maintains a range of at least ' + _index.VIEW_MIN_RANGE + ' when panning right',
      timeViewRange: [0.495, 0.505],
      change: [0.005, 0.001],
      result: [0.5, 0.51]
    }, {
      message: 'maintains a range of at least ' + _index.VIEW_MIN_RANGE + ' when contracting',
      timeViewRange: [0.495, 0.505],
      change: [0.1, -0.1],
      result: [0.495, 0.505]
    }];

    beforeEach(function () {
      wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index.TracePageImpl, defaultProps));
      instance = wrapper.instance();
      time = { current: null };
      state = { viewRange: { time: time } };
    });

    cases.forEach(function (testCase) {
      var message = testCase.message,
          timeViewRange = testCase.timeViewRange,
          change = testCase.change,
          result = testCase.result;

      it(message, function () {
        var _instance;

        time.current = timeViewRange;
        wrapper.setState(state);
        (_instance = instance)._adjustViewRange.apply(_instance, _toConsumableArray(change));
        var current = wrapper.state('viewRange').time.current;

        expect(current).toEqual(result);
      });
    });
  });

  describe('manages various UI state', function () {
    var header = void 0;
    var spanGraph = void 0;
    var timeline = void 0;

    function refreshWrappers() {
      header = wrapper.find(_TracePageHeader2.default);
      spanGraph = wrapper.find(_SpanGraph2.default);
      timeline = wrapper.find(_TraceTimelineViewer2.default);
    }

    beforeEach(function () {
      wrapper = (0, _enzyme.mount)(_react2.default.createElement(_index.TracePageImpl, defaultProps));
      // use the method directly because it is a `ref` prop
      wrapper.instance().setHeaderHeight({ clientHeight: 1 });
      wrapper.update();
      refreshWrappers();
    });

    it.skip('propagates headerHeight changes', function () {
      var h = 100;

      var _wrapper$instance = wrapper.instance(),
          setHeaderHeight = _wrapper$instance.setHeaderHeight;
      // use the method directly because it is a `ref` prop


      setHeaderHeight({ clientHeight: h });
      wrapper.update();
      var sections = wrapper.find('section');
      expect(sections.length).toBe(1);
      var section = sections.first();
      expect(section.prop('style')).toEqual({ paddingTop: h });
      expect(section.containsMatchingElement(_react2.default.createElement(_TraceTimelineViewer2.default, null))).toBe(true);
      setHeaderHeight(null);
      wrapper.update();
      sections = wrapper.find('section');
      expect(sections.length).toBe(0);
    });

    it.skip('propagates textFilter changes', function () {
      var s = 'abc';

      var _header$props = header.props(),
          updateTextFilter = _header$props.updateTextFilter;

      expect(header.prop('textFilter')).toBe('');
      updateTextFilter(s);
      wrapper.update();
      refreshWrappers();
      expect(header.prop('textFilter')).toBe(s);
    });

    it.skip('propagates slimView changes', function () {
      var _header$props2 = header.props(),
          onSlimViewClicked = _header$props2.onSlimViewClicked;

      expect(header.prop('slimView')).toBe(false);
      expect(spanGraph.type()).toBeDefined();
      onSlimViewClicked(true);
      wrapper.update();
      refreshWrappers();
      expect(header.prop('slimView')).toBe(true);
      expect(spanGraph.length).toBe(0);
    });

    it.skip('propagates viewRange changes', function () {
      var viewRange = {
        time: { current: [0, 1] }
      };
      var cursor = 123;
      var current = [0.25, 0.75];

      var _spanGraph$props = spanGraph.props(),
          updateViewRangeTime = _spanGraph$props.updateViewRangeTime,
          updateNextViewRangeTime = _spanGraph$props.updateNextViewRangeTime;

      expect(spanGraph.prop('viewRange')).toEqual(viewRange);
      expect(timeline.prop('viewRange')).toEqual(viewRange);
      updateNextViewRangeTime({ cursor: cursor });
      wrapper.update();
      refreshWrappers();
      viewRange.time.cursor = cursor;
      expect(spanGraph.prop('viewRange')).toEqual(viewRange);
      expect(timeline.prop('viewRange')).toEqual(viewRange);
      updateViewRangeTime.apply(undefined, current);
      wrapper.update();
      refreshWrappers();
      viewRange.time = { current: current };
      expect(spanGraph.prop('viewRange')).toEqual(viewRange);
      expect(timeline.prop('viewRange')).toEqual(viewRange);
    });
  });

  describe('GA tracking', function () {
    var header = void 0;
    var spanGraph = void 0;

    function refreshWrappers() {
      header = wrapper.find(_TracePageHeader2.default);
      spanGraph = wrapper.find(_SpanGraph2.default);
    }

    beforeEach(function () {
      wrapper = (0, _enzyme.mount)(_react2.default.createElement(_index.TracePageImpl, defaultProps));
      // use the method directly because it is a `ref` prop
      wrapper.instance().setHeaderHeight({ clientHeight: 1 });
      wrapper.update();
      refreshWrappers();
    });

    it.skip('tracks setting the header to slim-view', function () {
      var _header$props3 = header.props(),
          onSlimViewClicked = _header$props3.onSlimViewClicked;

      _TracePageHeader3.trackSlimHeaderToggle.mockReset();
      onSlimViewClicked(true);
      onSlimViewClicked(false);
      expect(_TracePageHeader3.trackSlimHeaderToggle.mock.calls).toEqual([[true], [false]]);
    });

    it.skip('tracks setting or clearing the filter', function () {
      var _header$props4 = header.props(),
          updateTextFilter = _header$props4.updateTextFilter;

      track.trackFilter.mockClear();
      updateTextFilter('abc');
      updateTextFilter('');
      expect(track.trackFilter.mock.calls).toEqual([['abc'], ['']]);
    });

    it.skip('tracks changes to the viewRange', function () {
      var src = 'some-source';

      var _spanGraph$props2 = spanGraph.props(),
          updateViewRangeTime = _spanGraph$props2.updateViewRangeTime;

      track.trackRange.mockClear();
      var range = [0.25, 0.75];
      updateViewRangeTime.apply(undefined, range.concat([src]));
      expect(track.trackRange.mock.calls).toEqual([[src, range, [0, 1]]]);
    });
  });
});

describe('mapDispatchToProps()', function () {
  it('creates the actions correctly', function () {
    expect((0, _index.mapDispatchToProps)(function () {})).toEqual({
      fetchTrace: expect.any(Function),
      acknowledgeArchive: expect.any(Function),
      archiveTrace: expect.any(Function)
    });
  });
});

describe('mapStateToProps()', function () {
  it('maps state to props correctly', function () {
    var id = 'abc';
    var trace = {};
    var state = {
      trace: {
        traces: _defineProperty({}, id, { data: trace, state: _constants.fetchedState.DONE })
      },
      config: {
        archiveEnabled: false
      },
      archive: {}
    };
    var ownProps = {
      match: {
        params: { id: id }
      }
    };
    var props = (0, _index.mapStateToProps)(state, ownProps);
    expect(props).toEqual({
      id: id,
      archiveEnabled: false,
      archiveTraceState: undefined,
      trace: { data: {}, state: _constants.fetchedState.DONE }
    });
  });
});