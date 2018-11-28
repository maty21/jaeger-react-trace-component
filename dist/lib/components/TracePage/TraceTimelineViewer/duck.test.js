'use strict';

var _redux = require('redux');

var _duck = require('./duck');

var _duck2 = _interopRequireDefault(_duck);

var _DetailState = require('./SpanDetail/DetailState');

var _DetailState2 = _interopRequireDefault(_DetailState);

var _transformTraceData = require('../../../model/transform-trace-data');

var _transformTraceData2 = _interopRequireDefault(_transformTraceData);

var _traceGenerators = require('../../../demo/trace-generators');

var _traceGenerators2 = _interopRequireDefault(_traceGenerators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('TraceTimelineViewer/duck', function () {
  var trace = (0, _transformTraceData2.default)(_traceGenerators2.default.trace({ numberOfSpans: 10 }));

  var store = void 0;

  beforeEach(function () {
    store = (0, _redux.createStore)(_duck2.default, (0, _duck.newInitialState)(trace));
  });

  it('the initial state has no details, collapsed children or text search', function () {
    var state = store.getState();
    expect(state.childrenHiddenIDs).toEqual(new Set());
    expect(state.detailStates).toEqual(new Map());
  });

  it('sets the span column width', function () {
    var n = 0.5;
    var width = store.getState().spanNameColumnWidth;
    expect(width).toBeGreaterThanOrEqual(0);
    expect(width).toBeLessThanOrEqual(1);
    var action = _duck.actions.setSpanNameColumnWidth(n);
    store.dispatch(action);
    width = store.getState().spanNameColumnWidth;
    expect(width).toBe(n);
  });

  it('retains all state when setting to the same traceID', function () {
    var state = store.getState();
    var action = _duck.actions.setTrace(trace.traceID);
    store.dispatch(action);
    expect(store.getState()).toBe(state);
  });

  it('retains only the spanNameColumnWidth when changing traceIDs', function () {
    var action = void 0;
    var width = 0.5;
    var id = 'some-id';

    action = _duck.actions.childrenToggle(id);
    store.dispatch(action);
    action = _duck.actions.detailToggle(id);
    store.dispatch(action);
    action = _duck.actions.setSpanNameColumnWidth(width);
    store.dispatch(action);

    var state = store.getState();
    expect(state.traceID).toBe(trace.traceID);
    expect(state.childrenHiddenIDs).not.toEqual(new Set());
    expect(state.detailStates).not.toEqual(new Map());
    expect(state.spanNameColumnWidth).toBe(width);

    action = _duck.actions.setTrace(id);
    store.dispatch(action);
    state = store.getState();
    expect(state.traceID).toBe(id);
    expect(state.childrenHiddenIDs).toEqual(new Set());
    expect(state.detailStates).toEqual(new Map());
    expect(state.spanNameColumnWidth).toBe(width);
  });

  describe('toggles children and details', function () {
    var parentID = trace.spans[0].spanID;
    var tests = [{
      msg: 'toggles children',
      action: _duck.actions.childrenToggle(parentID),
      propName: 'childrenHiddenIDs',
      initial: new Set(),
      resultant: new Set([parentID])
    }, {
      msg: 'toggles details',
      action: _duck.actions.detailToggle(parentID),
      propName: 'detailStates',
      initial: new Map(),
      resultant: new Map([[parentID, new _DetailState2.default()]])
    }];

    tests.forEach(function (info) {
      var msg = info.msg,
          action = info.action,
          propName = info.propName,
          initial = info.initial,
          resultant = info.resultant;


      it(msg, function () {
        var st0 = store.getState();
        expect(st0[propName]).toEqual(initial);

        store.dispatch(action);
        var st1 = store.getState();
        expect(st0[propName]).toEqual(initial);
        expect(st1[propName]).toEqual(resultant);

        store.dispatch(action);
        var st2 = store.getState();
        expect(st1[propName]).toEqual(resultant);
        expect(st2[propName]).toEqual(initial);
      });
    });
  });

  describe('expands and collapses all spans', function () {
    // 0
    // - 1
    // --- 2
    // - 3
    // --- 4
    // - 5
    var spans = [{ spanID: 0, depth: 0, hasChildren: true }, { spanID: 1, depth: 1, hasChildren: true }, { spanID: 2, depth: 2, hasChildren: false }, { spanID: 3, depth: 1, hasChildren: true }, { spanID: 4, depth: 2, hasChildren: false }, { spanID: 5, depth: 1, hasChildren: false }];

    var oneSpanCollapsed = new Set([1]);
    var allSpansCollapsed = new Set([0, 1, 3]);
    var oneLevelCollapsed = new Set([1, 3]);

    // Tests for corner cases of reducers
    var tests = [{
      msg: 'expand all',
      action: _duck.expandAll,
      initial: allSpansCollapsed,
      resultant: new Set()
    }, {
      msg: 'collapse all, no-op',
      action: _duck.collapseAll,
      initial: allSpansCollapsed,
      resultant: allSpansCollapsed
    }, {
      msg: 'expand one',
      action: _duck.expandOne,
      initial: allSpansCollapsed,
      resultant: oneLevelCollapsed
    }, {
      msg: 'expand one, one collapsed',
      action: _duck.expandOne,
      initial: oneSpanCollapsed,
      resultant: new Set()
    }, {
      msg: 'collapse one, no-op',
      action: _duck.collapseOne,
      initial: allSpansCollapsed,
      resultant: allSpansCollapsed
    }, {
      msg: 'collapse one, one collapsed',
      action: _duck.collapseOne,
      initial: oneSpanCollapsed,
      resultant: oneLevelCollapsed
    }];

    tests.forEach(function (info) {
      var msg = info.msg,
          action = info.action,
          initial = info.initial,
          resultant = info.resultant;


      it(msg, function () {
        var _action = action({ childrenHiddenIDs: initial }, { payload: { spans: spans } }),
            childrenHiddenIDs = _action.childrenHiddenIDs;

        expect(childrenHiddenIDs).toEqual(resultant);
      });
    });

    // Tests to verify correct behaviour of actions
    var dispatchTests = [{
      msg: 'expand all, no-op',
      action: _duck.actions.expandAll(),
      resultant: new Set()
    }, {
      msg: 'collapse all',
      action: _duck.actions.collapseAll(spans),
      resultant: allSpansCollapsed
    }, {
      msg: 'expand one, no-op',
      action: _duck.actions.expandOne(spans),
      resultant: new Set()
    }, {
      msg: 'collapse one',
      action: _duck.actions.collapseOne(spans),
      resultant: oneLevelCollapsed
    }];

    dispatchTests.forEach(function (info) {
      var msg = info.msg,
          action = info.action,
          resultant = info.resultant;


      it(msg, function () {
        var st0 = store.getState();
        store.dispatch(action);
        var st1 = store.getState();
        expect(st0.childrenHiddenIDs).toEqual(new Set());
        expect(st1.childrenHiddenIDs).toEqual(resultant);
      });
    });
  });

  describe("toggles a detail's sub-sections", function () {
    var id = trace.spans[0].spanID;
    var baseDetail = new _DetailState2.default();
    var tests = [{
      msg: 'toggles tags',
      action: _duck.actions.detailTagsToggle(id),
      get: function get(state) {
        return state.detailStates.get(id);
      },
      unchecked: new _DetailState2.default(),
      checked: baseDetail.toggleTags()
    }, {
      msg: 'toggles process',
      action: _duck.actions.detailProcessToggle(id),
      get: function get(state) {
        return state.detailStates.get(id);
      },
      unchecked: new _DetailState2.default(),
      checked: baseDetail.toggleProcess()
    }, {
      msg: 'toggles logs',
      action: _duck.actions.detailLogsToggle(id),
      get: function get(state) {
        return state.detailStates.get(id);
      },
      unchecked: new _DetailState2.default(),
      checked: baseDetail.toggleLogs()
    }];

    beforeEach(function () {
      store.dispatch(_duck.actions.detailToggle(id));
    });

    tests.forEach(function (info) {
      var msg = info.msg,
          action = info.action,
          get = info.get,
          unchecked = info.unchecked,
          checked = info.checked;


      it(msg, function () {
        var st0 = store.getState();
        expect(get(st0)).toEqual(unchecked);

        store.dispatch(action);
        var st1 = store.getState();
        expect(get(st0)).toEqual(unchecked);
        expect(get(st1)).toEqual(checked);

        store.dispatch(action);
        var st2 = store.getState();
        expect(get(st1)).toEqual(checked);
        expect(get(st2)).toEqual(unchecked);
      });
    });
  });

  it('toggles a log item', function () {
    var logItem = 'hello-log-item';
    var id = trace.spans[0].spanID;
    var baseDetail = new _DetailState2.default();
    var toggledDetail = baseDetail.toggleLogItem(logItem);

    store.dispatch(_duck.actions.detailToggle(id));
    expect(store.getState().detailStates.get(id)).toEqual(baseDetail);
    store.dispatch(_duck.actions.detailLogItemToggle(id, logItem));
    expect(store.getState().detailStates.get(id)).toEqual(toggledDetail);
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