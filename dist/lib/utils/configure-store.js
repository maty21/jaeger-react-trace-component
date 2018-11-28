'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = configureStore;

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _global = require('global');

var _duck = require('../components/TraceDiff/duck');

var _duck2 = _interopRequireDefault(_duck);

var _duck3 = require('../components/TracePage/ArchiveNotifier/duck');

var _duck4 = _interopRequireDefault(_duck3);

var _duck5 = require('../components/TracePage/TraceTimelineViewer/duck');

var _duck6 = _interopRequireDefault(_duck5);

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _middlewares = require('../middlewares');

var jaegerMiddlewares = _interopRequireWildcard(_middlewares);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function configureStore(history) {
  return (0, _redux.createStore)((0, _redux.combineReducers)(_extends({}, _reducers2.default, {
    archive: _duck4.default,
    traceDiff: _duck2.default,
    traceTimeline: _duck6.default,
    router: _reactRouterRedux.routerReducer
  })), (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, _toConsumableArray(Object.keys(jaegerMiddlewares).map(function (key) {
    return jaegerMiddlewares[key];
  }).filter(Boolean)).concat([(0, _reactRouterRedux.routerMiddleware)(history)])), process.env.NODE_ENV !== 'production' && _global.window && _global.window.devToolsExtension ? _global.window.devToolsExtension() : function (noop) {
    return noop;
  }));
}