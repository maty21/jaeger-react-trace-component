'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.context = exports.isGaEnabled = undefined;
exports.trackPageView = trackPageView;
exports.trackError = trackError;
exports.trackEvent = trackEvent;

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _reactGa = require('react-ga');

var _reactGa2 = _interopRequireDefault(_reactGa);

var _ravenJs = require('raven-js');

var _ravenJs2 = _interopRequireDefault(_ravenJs);

var _convRavenToGa2 = require('./conv-raven-to-ga');

var _convRavenToGa3 = _interopRequireDefault(_convRavenToGa2);

var _getConfig = require('../config/get-config');

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //      

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

var EVENT_LENGTHS = {
  action: 499,
  category: 149,
  label: 499
};

// Util so "0" and "false" become false
var isTruish = function isTruish(value) {
  return Boolean(value) && value !== '0' && value !== 'false';
};

var isProd = process.env.NODE_ENV === 'production';
var isDev = process.env.NODE_ENV === 'development';
var isTest = process.env.NODE_ENV === 'test';

// In test mode if development and envvar REACT_APP_GA_DEBUG is true-ish
var isDebugMode = isDev && isTruish(process.env.REACT_APP_GA_DEBUG) || isTruish(_queryString2.default.parse((0, _get3.default)(window, 'location.search'))['ga-debug']);

var config = (0, _getConfig2.default)();
var gaID = (0, _get3.default)(config, 'tracking.gaID');
// enable for tests, debug or if in prod with a GA ID
var isGaEnabled = exports.isGaEnabled = isTest || isDebugMode || isProd && Boolean(gaID);
var isErrorsEnabled = isDebugMode || isGaEnabled && Boolean((0, _get3.default)(config, 'tracking.trackErrors'));

/* istanbul ignore next */
function logTrackingCalls() {
  var calls = _reactGa2.default.testModeAPI.calls;
  for (var i = 0; i < calls.length; i++) {
    var _console;

    // eslint-disable-next-line no-console
    (_console = console).log.apply(_console, ['[react-ga]'].concat(_toConsumableArray(calls[i])));
  }
  calls.length = 0;
}

function trackPageView(pathname, search) {
  if (isGaEnabled) {
    var pagePath = search ? '' + pathname + search : pathname;
    _reactGa2.default.pageview(pagePath);
    if (isDebugMode) {
      logTrackingCalls();
    }
  }
}

function trackError(description) {
  if (isGaEnabled) {
    var msg = description;
    if (!/^jaeger/i.test(msg)) {
      msg = 'jaeger/' + msg;
    }
    msg = msg.slice(0, 149);
    _reactGa2.default.exception({ description: msg, fatal: false });
    if (isDebugMode) {
      logTrackingCalls();
    }
  }
}

function trackEvent(category, action, labelOrValue, value) {
  if (isGaEnabled) {
    var event = {};
    if (!/^jaeger/i.test(category)) {
      event.category = ('jaeger/' + category).slice(0, EVENT_LENGTHS.category);
    } else {
      event.category = category.slice(0, EVENT_LENGTHS.category);
    }
    event.action = action.slice(0, EVENT_LENGTHS.action);
    if (labelOrValue != null) {
      if (typeof labelOrValue === 'string') {
        event.label = labelOrValue.slice(0, EVENT_LENGTHS.action);
      } else {
        // value should be an int
        event.value = Math.round(labelOrValue);
      }
    }
    if (value != null) {
      event.value = Math.round(value);
    }
    _reactGa2.default.event(event);
    if (isDebugMode) {
      logTrackingCalls();
    }
  }
}

function trackRavenError(ravenData) {
  var _convRavenToGa = (0, _convRavenToGa3.default)(ravenData),
      message = _convRavenToGa.message,
      category = _convRavenToGa.category,
      action = _convRavenToGa.action,
      label = _convRavenToGa.label,
      value = _convRavenToGa.value;

  trackError(message);
  trackEvent(category, action, label, value);
}

// Tracking needs to be initialized when this file is imported, e.g. early in
// the process of initializing the app, so Raven can wrap various resources,
// like `fetch()`, and generate breadcrumbs from them.

if (isGaEnabled) {
  var versionShort = void 0;
  var versionLong = void 0;
  if (process.env.REACT_APP_VSN_STATE) {
    try {
      var data = JSON.parse(process.env.REACT_APP_VSN_STATE);
      var joiner = [data.objName];
      if (data.changed.hasChanged) {
        joiner.push(data.changed.pretty);
      }
      versionShort = joiner.join(' ');
      versionLong = data.pretty;
    } catch (_) {
      versionShort = process.env.REACT_APP_VSN_STATE;
      versionLong = process.env.REACT_APP_VSN_STATE;
    }
    versionLong = versionLong.length > 99 ? versionLong.slice(0, 96) + '...' : versionLong;
  } else {
    versionShort = 'unknown';
    versionLong = 'unknown';
  }
  var gaConfig = { testMode: isTest || isDebugMode, titleCase: false };
  _reactGa2.default.initialize(gaID || 'debug-mode', gaConfig);
  _reactGa2.default.set({
    appId: 'github.com/jaegertracing/jaeger-ui',
    appName: 'Jaeger UI',
    appVersion: versionLong
  });
  if (isErrorsEnabled) {
    var ravenConfig = {
      autoBreadcrumbs: {
        xhr: true,
        console: false,
        dom: true,
        location: true
      },
      environment: process.env.NODE_ENV || 'unkonwn',
      transport: trackRavenError,
      tags: {}
    };
    if (versionShort && versionShort !== 'unknown') {
      ravenConfig.tags.git = versionShort;
    }
    _ravenJs2.default.config('https://fakedsn@omg.com/1', ravenConfig).install();
    window.onunhandledrejection = function trackRejectedPromise(evt) {
      _ravenJs2.default.captureException(evt.reason);
    };
  }
  if (isDebugMode) {
    logTrackingCalls();
  }
}

var context = exports.context = isErrorsEnabled ? _ravenJs2.default : null;