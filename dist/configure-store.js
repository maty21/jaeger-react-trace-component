'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _duck = require('./components/TracePage/ArchiveNotifier/duck');

var _duck2 = _interopRequireDefault(_duck);

var _duck3 = require('./components/TracePage/TraceTimelineViewer/duck');

var _duck4 = _interopRequireDefault(_duck3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { routerReducer, routerMiddleware } from 'react-router-redux';
// import { window } from 'global';

// import traceDiff from '../components/TraceDiff/duck';
function configureStore(history) {
  return (0, _redux.createStore)((0, _redux.combineReducers)({
    archive: _duck2.default,
    traceTimeline: _duck4.default
  }));
} // Copyright (c) 2017 Uber Technologies, Inc.
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