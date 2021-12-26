'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //      

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

exports.default = getConfig;
exports.getConfigValue = getConfigValue;

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _processDeprecation = require('./process-deprecation');

var _processDeprecation2 = _interopRequireDefault(_processDeprecation);

var _defaultConfig = require('../../constants/default-config');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var haveWarnedFactoryFn = false;
var haveWarnedDeprecations = false;

/**
 * Merge the embedded config from the query service (if present) with the
 * default config from `../../constants/default-config`.
 */
function getConfig() {
  var getJaegerUiConfig = window.getJaegerUiConfig;
  if (typeof getJaegerUiConfig !== 'function') {
    if (!haveWarnedFactoryFn) {
      // eslint-disable-next-line no-console
      console.warn('Embedded config not available');
      haveWarnedFactoryFn = true;
    }
    return _extends({}, _defaultConfig2.default);
  }
  var embedded = getJaegerUiConfig();
  if (!embedded) {
    return _extends({}, _defaultConfig2.default);
  }
  // check for deprecated config values
  if (Array.isArray(_defaultConfig.deprecations)) {
    _defaultConfig.deprecations.forEach(function (deprecation) {
      return (0, _processDeprecation2.default)(embedded, deprecation, !haveWarnedDeprecations);
    });
    haveWarnedDeprecations = true;
  }
  var rv = _extends({}, _defaultConfig2.default, embedded);
  // __mergeFields config values should be merged instead of fully replaced
  var keys = _defaultConfig2.default.__mergeFields || [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (_typeof(embedded[key]) === 'object' && embedded[key] !== null) {
      rv[key] = _extends({}, _defaultConfig2.default[key], embedded[key]);
    }
  }
  return rv;
}

function getConfigValue(path) {
  return (0, _get3.default)(getConfig(), path);
}