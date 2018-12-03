'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = undefined;

var _handleActions;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxActions = require('redux-actions');

var _jaegerApi = require('../../../actions/jaeger-api');

var _generateActionTypes = require('../../../utils/generate-action-types');

var _generateActionTypes2 = _interopRequireDefault(_generateActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var initialState = {};

var actionTypes = (0, _generateActionTypes2.default)('@jaeger-ui/archive-trace', ['ACKNOWLEDGE']);

var fullActions = (0, _reduxActions.createActions)(_defineProperty({}, actionTypes.ACKNOWLEDGE, function (traceID) {
  return traceID;
}));

var actions = exports.actions = _extends({}, fullActions.jaegerUi.archiveTrace, { archiveTrace: _jaegerApi.archiveTrace });

// reducers

function acknowledge(state, _ref) {
  var payload = _ref.payload;

  var traceID = typeof payload === 'string' ? payload : null;
  if (!traceID) {
    // make flow happy
    throw new Error('Invalid state, missing traceID for archive acknowledge');
  }
  var traceArchive = state[traceID];
  if (traceArchive && traceArchive.isLoading) {
    // acknowledgement during loading is invalid (should not happen)
    return state;
  }
  var next = _extends({}, traceArchive, { isAcknowledged: true });
  return _extends({}, state, _defineProperty({}, traceID, next));
}

function archiveStarted(state, _ref2) {
  var meta = _ref2.meta;

  return _extends({}, state, _defineProperty({}, meta.id, { isLoading: true }));
}

function archiveDone(state, _ref3) {
  var meta = _ref3.meta;

  return _extends({}, state, _defineProperty({}, meta.id, { isArchived: true, isAcknowledged: false }));
}

function archiveErred(state, _ref4) {
  var meta = _ref4.meta,
      payload = _ref4.payload;

  if (!payload) {
    // make flow happy
    throw new Error('Invalid state, missing API error details');
  }
  var traceArchive = { error: payload, isArchived: false, isError: true, isAcknowledged: false };
  return _extends({}, state, _defineProperty({}, meta.id, traceArchive));
}

exports.default = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, actionTypes.ACKNOWLEDGE, acknowledge), _defineProperty(_handleActions, _jaegerApi.archiveTrace + '_PENDING', archiveStarted), _defineProperty(_handleActions, _jaegerApi.archiveTrace + '_FULFILLED', archiveDone), _defineProperty(_handleActions, _jaegerApi.archiveTrace + '_REJECTED', archiveErred), _handleActions), initialState);