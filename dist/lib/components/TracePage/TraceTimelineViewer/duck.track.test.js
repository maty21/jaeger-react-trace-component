'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _DetailState = require('./SpanDetail/DetailState');

var _DetailState2 = _interopRequireDefault(_DetailState);

var _duck = require('./duck.track');

var track = _interopRequireWildcard(_duck);

var _duck2 = require('./duck');

var _constants = require('../../../constants');

var _tracking = require('../../../utils/tracking');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
jest.mock('../../../utils/tracking');

describe('middlewareHooks', function () {
  var traceID = 'ABC';
  var spanID = 'abc';
  var spanDepth = 123;
  var columnWidth = { real: 0.15, tracked: 150 };
  var payload = { spanID: spanID };
  var state = {
    trace: {
      traces: _defineProperty({}, traceID, {
        id: traceID,
        data: { spans: [{ spanID: spanID, depth: spanDepth }] },
        state: _constants.fetchedState.DONE
      })
    },
    traceTimeline: {
      traceID: traceID,
      childrenHiddenIDs: new Map(),
      detailStates: new Map([[spanID, new _DetailState2.default()]])
    }
  };
  var store = {
    getState: function getState() {
      return state;
    }
  };

  beforeEach(_tracking.trackEvent.mockClear);

  var cases = [{
    msg: 'tracks a GA event for resizing the span name column',
    type: _duck2.actionTypes.SET_SPAN_NAME_COLUMN_WIDTH,
    payloadCustom: { width: columnWidth.real },
    category: track.CATEGORY_COLUMN,
    extraTrackArgs: [columnWidth.tracked]
  }, {
    msg: 'tracks a GA event for collapsing a parent',
    type: _duck2.actionTypes.CHILDREN_TOGGLE,
    category: track.CATEGORY_PARENT,
    extraTrackArgs: [123]
  }, {
    msg: 'tracks a GA event for toggling a detail row',
    type: _duck2.actionTypes.DETAIL_TOGGLE,
    category: track.CATEGORY_ROW
  }, {
    msg: 'tracks a GA event for toggling the span tags',
    type: _duck2.actionTypes.DETAIL_TAGS_TOGGLE,
    category: track.CATEGORY_TAGS
  }, {
    msg: 'tracks a GA event for toggling the span tags',
    type: _duck2.actionTypes.DETAIL_PROCESS_TOGGLE,
    category: track.CATEGORY_PROCESS
  }, {
    msg: 'tracks a GA event for toggling the span logs view',
    type: _duck2.actionTypes.DETAIL_LOGS_TOGGLE,
    category: track.CATEGORY_LOGS
  }, {
    msg: 'tracks a GA event for toggling the span logs view',
    type: _duck2.actionTypes.DETAIL_LOG_ITEM_TOGGLE,
    payloadCustom: _extends({}, payload, { logItem: {} }),
    category: track.CATEGORY_LOGS_ITEM
  }];

  cases.forEach(function (_case) {
    var msg = _case.msg,
        type = _case.type,
        category = _case.category,
        _case$extraTrackArgs = _case.extraTrackArgs,
        extraTrackArgs = _case$extraTrackArgs === undefined ? [] : _case$extraTrackArgs,
        _case$payloadCustom = _case.payloadCustom,
        payloadCustom = _case$payloadCustom === undefined ? null : _case$payloadCustom;

    it(msg, function () {
      var action = { type: type, payload: payloadCustom || payload };
      track.middlewareHooks[type](store, action);
      expect(_tracking.trackEvent.mock.calls.length).toBe(1);
      expect(_tracking.trackEvent.mock.calls[0]).toEqual([category, expect.any(String)].concat(_toConsumableArray(extraTrackArgs)));
    });
  });

  it('has the correct keys and they refer to functions', function () {
    expect(Object.keys(track.middlewareHooks).sort()).toEqual([_duck2.actionTypes.CHILDREN_TOGGLE, _duck2.actionTypes.DETAIL_TOGGLE, _duck2.actionTypes.DETAIL_TAGS_TOGGLE, _duck2.actionTypes.DETAIL_PROCESS_TOGGLE, _duck2.actionTypes.DETAIL_LOGS_TOGGLE, _duck2.actionTypes.DETAIL_LOG_ITEM_TOGGLE, _duck2.actionTypes.SET_SPAN_NAME_COLUMN_WIDTH].sort());
  });
});