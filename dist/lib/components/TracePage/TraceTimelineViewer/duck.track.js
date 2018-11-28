'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middlewareHooks = exports.CATEGORY_ROW = exports.CATEGORY_PARENT = exports.CATEGORY_COLUMN = exports.CATEGORY_LOGS_ITEM = exports.CATEGORY_LOGS = exports.CATEGORY_PROCESS = exports.CATEGORY_TAGS = undefined;

var _middlewareHooks;

var _duck = require('./duck');

var _tracking = require('../../../utils/tracking');

var _common = require('../../../utils/tracking/common');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //      

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


var ACTION_RESIZE = 'resize';

var CATEGORY_BASE = 'jaeger/ux/trace/timeline';
// export for tests
var CATEGORY_TAGS = exports.CATEGORY_TAGS = CATEGORY_BASE + '/tags';
var CATEGORY_PROCESS = exports.CATEGORY_PROCESS = CATEGORY_BASE + '/process';
var CATEGORY_LOGS = exports.CATEGORY_LOGS = CATEGORY_BASE + '/logs';
var CATEGORY_LOGS_ITEM = exports.CATEGORY_LOGS_ITEM = CATEGORY_BASE + '/logs/item';
var CATEGORY_COLUMN = exports.CATEGORY_COLUMN = CATEGORY_BASE + '/column';
var CATEGORY_PARENT = exports.CATEGORY_PARENT = CATEGORY_BASE + '/parent';
var CATEGORY_ROW = exports.CATEGORY_ROW = CATEGORY_BASE + '/row';

function trackParent(store, action) {
  var st = store.getState();
  var spanID = action.payload.spanID;

  var traceID = st.traceTimeline.traceID;
  var isHidden = st.traceTimeline.childrenHiddenIDs.has(spanID);
  var trace = st.trace.traces[traceID].data;
  var span = trace.spans.find(function (sp) {
    return sp.spanID === spanID;
  });
  if (span) {
    (0, _tracking.trackEvent)(CATEGORY_PARENT, (0, _common.getToggleValue)(!isHidden), span.depth);
  }
}

var logs = function logs(isOpen) {
  return (0, _tracking.trackEvent)(CATEGORY_LOGS, (0, _common.getToggleValue)(isOpen));
};
var logsItem = function logsItem(isOpen) {
  return (0, _tracking.trackEvent)(CATEGORY_LOGS_ITEM, (0, _common.getToggleValue)(isOpen));
};
var process = function process(isOpen) {
  return (0, _tracking.trackEvent)(CATEGORY_PROCESS, (0, _common.getToggleValue)(isOpen));
};
var tags = function tags(isOpen) {
  return (0, _tracking.trackEvent)(CATEGORY_TAGS, (0, _common.getToggleValue)(isOpen));
};
var detailRow = function detailRow(isOpen) {
  return (0, _tracking.trackEvent)(CATEGORY_ROW, (0, _common.getToggleValue)(isOpen));
};
var columnWidth = function columnWidth(_, action) {
  return (0, _tracking.trackEvent)(CATEGORY_COLUMN, ACTION_RESIZE, Math.round(action.payload.width * 1000));
};

var getDetail = function getDetail(store, action) {
  return store.getState().traceTimeline.detailStates.get(action.payload.spanID);
};

var middlewareHooks = exports.middlewareHooks = (_middlewareHooks = {}, _defineProperty(_middlewareHooks, _duck.actionTypes.CHILDREN_TOGGLE, trackParent), _defineProperty(_middlewareHooks, _duck.actionTypes.DETAIL_TOGGLE, function (store, action) {
  return detailRow(Boolean(getDetail(store, action)));
}), _defineProperty(_middlewareHooks, _duck.actionTypes.DETAIL_TAGS_TOGGLE, function (store, action) {
  return tags(getDetail(store, action).isTagsOpen);
}), _defineProperty(_middlewareHooks, _duck.actionTypes.DETAIL_PROCESS_TOGGLE, function (store, action) {
  return process(getDetail(store, action).isProcessOpen);
}), _defineProperty(_middlewareHooks, _duck.actionTypes.DETAIL_LOGS_TOGGLE, function (store, action) {
  return logs(getDetail(store, action).logs.isOpen);
}), _defineProperty(_middlewareHooks, _duck.actionTypes.DETAIL_LOG_ITEM_TOGGLE, function (store, action) {
  var detail = getDetail(store, action);
  var logItem = action.payload.logItem;

  logsItem(detail.logs.openedItems.has(logItem));
}), _defineProperty(_middlewareHooks, _duck.actionTypes.SET_SPAN_NAME_COLUMN_WIDTH, columnWidth), _middlewareHooks);