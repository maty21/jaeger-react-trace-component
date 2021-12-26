'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.actionTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createActions, _handleActions;

exports.newInitialState = newInitialState;
exports.expandAll = expandAll;
exports.collapseAll = collapseAll;
exports.collapseOne = collapseOne;
exports.expandOne = expandOne;

var _reduxActions = require('redux-actions');

var _DetailState = require('./SpanDetail/DetailState');

var _DetailState2 = _interopRequireDefault(_DetailState);

var _generateActionTypes = require('../../../utils/generate-action-types');

var _generateActionTypes2 = _interopRequireDefault(_generateActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // Copyright (c) 2017 Uber Technologies, Inc.
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

// DetailState {
//   isTagsOpen: bool,
//   isProcessOpen: bool,
//   logs: {
//     isOpen: bool,
//     openItems: Set<LogItem>
//   }
// }
//
// TraceState {
//   traceID: string,
//   spanNameColumnWidth:
//   childrenHiddenIDs: Set<spanID>,
//   detailStates: Map<spanID, DetailState>
// }

function newInitialState() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$spanNameColumnWi = _ref.spanNameColumnWidth,
      spanNameColumnWidth = _ref$spanNameColumnWi === undefined ? null : _ref$spanNameColumnWi,
      _ref$traceID = _ref.traceID,
      traceID = _ref$traceID === undefined ? null : _ref$traceID;

  return {
    traceID: traceID,
    spanNameColumnWidth: spanNameColumnWidth || 0.25,
    childrenHiddenIDs: new Set(),
    detailStates: new Map()
  };
}

var actionTypes = exports.actionTypes = (0, _generateActionTypes2.default)('@jaeger-ui/trace-timeline-viewer', ['SET_TRACE', 'SET_SPAN_NAME_COLUMN_WIDTH', 'CHILDREN_TOGGLE', 'EXPAND_ALL', 'COLLAPSE_ALL', 'EXPAND_ONE', 'COLLAPSE_ONE', 'DETAIL_TOGGLE', 'DETAIL_TAGS_TOGGLE', 'DETAIL_PROCESS_TOGGLE', 'DETAIL_LOGS_TOGGLE', 'DETAIL_LOG_ITEM_TOGGLE']);

var fullActions = (0, _reduxActions.createActions)((_createActions = {}, _defineProperty(_createActions, actionTypes.SET_TRACE, function (traceID) {
  return { traceID: traceID };
}), _defineProperty(_createActions, actionTypes.SET_SPAN_NAME_COLUMN_WIDTH, function (width) {
  return { width: width };
}), _defineProperty(_createActions, actionTypes.CHILDREN_TOGGLE, function (spanID) {
  return { spanID: spanID };
}), _defineProperty(_createActions, actionTypes.EXPAND_ALL, function () {
  return {};
}), _defineProperty(_createActions, actionTypes.EXPAND_ONE, function (spans) {
  return { spans: spans };
}), _defineProperty(_createActions, actionTypes.COLLAPSE_ALL, function (spans) {
  return { spans: spans };
}), _defineProperty(_createActions, actionTypes.COLLAPSE_ONE, function (spans) {
  return { spans: spans };
}), _defineProperty(_createActions, actionTypes.DETAIL_TOGGLE, function (spanID) {
  return { spanID: spanID };
}), _defineProperty(_createActions, actionTypes.DETAIL_TAGS_TOGGLE, function (spanID) {
  return { spanID: spanID };
}), _defineProperty(_createActions, actionTypes.DETAIL_PROCESS_TOGGLE, function (spanID) {
  return { spanID: spanID };
}), _defineProperty(_createActions, actionTypes.DETAIL_LOGS_TOGGLE, function (spanID) {
  return { spanID: spanID };
}), _defineProperty(_createActions, actionTypes.DETAIL_LOG_ITEM_TOGGLE, function (spanID, logItem) {
  return { logItem: logItem, spanID: spanID };
}), _createActions));

var actions = exports.actions = fullActions.jaegerUi.traceTimelineViewer;

function setTrace(state, _ref2) {
  var payload = _ref2.payload;
  var traceID = payload.traceID;

  if (traceID === state.traceID) {
    return state;
  }
  // preserve spanNameColumnWidth when resetting state
  var spanNameColumnWidth = state.spanNameColumnWidth;

  return newInitialState({ spanNameColumnWidth: spanNameColumnWidth, traceID: traceID });
}

function setColumnWidth(state, _ref3) {
  var payload = _ref3.payload;
  var width = payload.width;

  return _extends({}, state, { spanNameColumnWidth: width });
}

function childrenToggle(state, _ref4) {
  var payload = _ref4.payload;
  var spanID = payload.spanID;

  var childrenHiddenIDs = new Set(state.childrenHiddenIDs);
  if (childrenHiddenIDs.has(spanID)) {
    childrenHiddenIDs.delete(spanID);
  } else {
    childrenHiddenIDs.add(spanID);
  }
  return _extends({}, state, { childrenHiddenIDs: childrenHiddenIDs });
}

function shouldDisableCollapse(allSpans, hiddenSpansIds) {
  var allParentSpans = allSpans.filter(function (s) {
    return s.hasChildren;
  });
  return allParentSpans.length === hiddenSpansIds.size;
}

function expandAll(state) {
  var childrenHiddenIDs = new Set();
  return _extends({}, state, { childrenHiddenIDs: childrenHiddenIDs });
}

function collapseAll(state, _ref5) {
  var payload = _ref5.payload;
  var spans = payload.spans;

  if (shouldDisableCollapse(spans, state.childrenHiddenIDs)) {
    return state;
  }
  var childrenHiddenIDs = spans.reduce(function (res, s) {
    if (s.hasChildren) {
      res.add(s.spanID);
    }
    return res;
  }, new Set());
  return _extends({}, state, { childrenHiddenIDs: childrenHiddenIDs });
}

function collapseOne(state, _ref6) {
  var payload = _ref6.payload;
  var spans = payload.spans;

  if (shouldDisableCollapse(spans, state.childrenHiddenIDs)) {
    return state;
  }
  var nearestCollapsedAncestor = void 0;
  var childrenHiddenIDs = spans.reduce(function (res, curSpan) {
    if (nearestCollapsedAncestor && curSpan.depth <= nearestCollapsedAncestor.depth) {
      res.add(nearestCollapsedAncestor.spanID);
      if (curSpan.hasChildren) {
        nearestCollapsedAncestor = curSpan;
      }
    } else if (curSpan.hasChildren && !res.has(curSpan.spanID)) {
      nearestCollapsedAncestor = curSpan;
    }
    return res;
  }, new Set(state.childrenHiddenIDs));
  childrenHiddenIDs.add(nearestCollapsedAncestor.spanID);
  return _extends({}, state, { childrenHiddenIDs: childrenHiddenIDs });
}

function expandOne(state, _ref7) {
  var payload = _ref7.payload;
  var spans = payload.spans;

  if (state.childrenHiddenIDs.size === 0) {
    return state;
  }
  var prevExpandedDepth = -1;
  var expandNextHiddenSpan = true;
  var childrenHiddenIDs = spans.reduce(function (res, s) {
    if (s.depth <= prevExpandedDepth) {
      expandNextHiddenSpan = true;
    }
    if (expandNextHiddenSpan && res.has(s.spanID)) {
      res.delete(s.spanID);
      expandNextHiddenSpan = false;
      prevExpandedDepth = s.depth;
    }
    return res;
  }, new Set(state.childrenHiddenIDs));
  return _extends({}, state, { childrenHiddenIDs: childrenHiddenIDs });
}

function detailToggle(state, _ref8) {
  var payload = _ref8.payload;
  var spanID = payload.spanID;

  var detailStates = new Map(state.detailStates);
  if (detailStates.has(spanID)) {
    detailStates.delete(spanID);
  } else {
    detailStates.set(spanID, new _DetailState2.default());
  }
  return _extends({}, state, { detailStates: detailStates });
}

function detailSubsectionToggle(subSection, state, _ref9) {
  var payload = _ref9.payload;
  var spanID = payload.spanID;

  var old = state.detailStates.get(spanID);
  var detailState = void 0;
  if (subSection === 'tags') {
    detailState = old.toggleTags();
  } else if (subSection === 'process') {
    detailState = old.toggleProcess();
  } else if (subSection === 'logs') {
    detailState = old.toggleLogs();
  }
  var detailStates = new Map(state.detailStates);
  detailStates.set(spanID, detailState);
  return _extends({}, state, { detailStates: detailStates });
}

var detailTagsToggle = detailSubsectionToggle.bind(null, 'tags');
var detailProcessToggle = detailSubsectionToggle.bind(null, 'process');
var detailLogsToggle = detailSubsectionToggle.bind(null, 'logs');

function detailLogItemToggle(state, _ref10) {
  var payload = _ref10.payload;
  var spanID = payload.spanID,
      logItem = payload.logItem;

  var old = state.detailStates.get(spanID);
  var detailState = old.toggleLogItem(logItem);
  var detailStates = new Map(state.detailStates);
  detailStates.set(spanID, detailState);
  return _extends({}, state, { detailStates: detailStates });
}

exports.default = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, actionTypes.SET_TRACE, setTrace), _defineProperty(_handleActions, actionTypes.SET_SPAN_NAME_COLUMN_WIDTH, setColumnWidth), _defineProperty(_handleActions, actionTypes.CHILDREN_TOGGLE, childrenToggle), _defineProperty(_handleActions, actionTypes.EXPAND_ALL, expandAll), _defineProperty(_handleActions, actionTypes.EXPAND_ONE, expandOne), _defineProperty(_handleActions, actionTypes.COLLAPSE_ALL, collapseAll), _defineProperty(_handleActions, actionTypes.COLLAPSE_ONE, collapseOne), _defineProperty(_handleActions, actionTypes.DETAIL_TOGGLE, detailToggle), _defineProperty(_handleActions, actionTypes.DETAIL_TAGS_TOGGLE, detailTagsToggle), _defineProperty(_handleActions, actionTypes.DETAIL_PROCESS_TOGGLE, detailProcessToggle), _defineProperty(_handleActions, actionTypes.DETAIL_LOGS_TOGGLE, detailLogsToggle), _defineProperty(_handleActions, actionTypes.DETAIL_LOG_ITEM_TOGGLE, detailLogItemToggle), _handleActions), newInitialState());