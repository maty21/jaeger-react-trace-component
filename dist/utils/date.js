'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_MS_PRECISION = exports.ONE_SECOND = exports.ONE_MILLISECOND = exports.STANDARD_DATETIME_FORMAT = exports.STANDARD_TIME_FORMAT = exports.STANDARD_DATE_FORMAT = undefined;
exports.getPercentageOfDuration = getPercentageOfDuration;
exports.formatDate = formatDate;
exports.formatTime = formatTime;
exports.formatDatetime = formatDatetime;
exports.formatMillisecondTime = formatMillisecondTime;
exports.formatSecondTime = formatSecondTime;
exports.formatDuration = formatDuration;
exports.formatRelativeDate = formatRelativeDate;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _number = require('./number');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TODAY = 'Today'; // Copyright (c) 2017 Uber Technologies, Inc.
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

var YESTERDAY = 'Yesterday';

var STANDARD_DATE_FORMAT = exports.STANDARD_DATE_FORMAT = 'YYYY-MM-DD';
var STANDARD_TIME_FORMAT = exports.STANDARD_TIME_FORMAT = 'HH:mm';
var STANDARD_DATETIME_FORMAT = exports.STANDARD_DATETIME_FORMAT = 'LLL';
var ONE_MILLISECOND = exports.ONE_MILLISECOND = 1000;
var ONE_SECOND = exports.ONE_SECOND = 1000 * ONE_MILLISECOND;
var DEFAULT_MS_PRECISION = exports.DEFAULT_MS_PRECISION = Math.log10(ONE_MILLISECOND);

/**
 * @param {number} timestamp
 * @param {number} initialTimestamp
 * @param {number} totalDuration
 * @return {number} 0-100 percentage
 */
function getPercentageOfDuration(duration, totalDuration) {
  return duration / totalDuration * 100;
}

var quantizeDuration = function quantizeDuration(duration, floatPrecision, conversionFactor) {
  return (0, _number.toFloatPrecision)(duration / conversionFactor, floatPrecision) * conversionFactor;
};

/**
 * @param {number} duration (in microseconds)
 * @return {string} formatted, unit-labelled string with time in milliseconds
 */
function formatDate(duration) {
  return (0, _moment2.default)(duration / ONE_MILLISECOND).format(STANDARD_DATE_FORMAT);
}

/**
 * @param {number} duration (in microseconds)
 * @return {string} formatted, unit-labelled string with time in milliseconds
 */
function formatTime(duration) {
  return (0, _moment2.default)(duration / ONE_MILLISECOND).format(STANDARD_TIME_FORMAT);
}

/**
 * @param {number} duration (in microseconds)
 * @return {string} formatted, unit-labelled string with time in milliseconds
 */
function formatDatetime(duration) {
  return (0, _moment2.default)(duration / ONE_MILLISECOND).format(STANDARD_DATETIME_FORMAT);
}

/**
 * @param {number} duration (in microseconds)
 * @return {string} formatted, unit-labelled string with time in milliseconds
 */
function formatMillisecondTime(duration) {
  var targetDuration = quantizeDuration(duration, DEFAULT_MS_PRECISION, ONE_MILLISECOND);
  return _moment2.default.duration(targetDuration / ONE_MILLISECOND).asMilliseconds() + 'ms';
}

/**
 * @param {number} duration (in microseconds)
 * @return {string} formatted, unit-labelled string with time in seconds
 */
function formatSecondTime(duration) {
  var targetDuration = quantizeDuration(duration, DEFAULT_MS_PRECISION, ONE_SECOND);
  return _moment2.default.duration(targetDuration / ONE_MILLISECOND).asSeconds() + 's';
}

/**
 * Humanizes the duration based on the inputUnit
 *
 * Example:
 * 5000ms => 5s
 * 1000μs => 1ms
 */
function formatDuration(duration) {
  var inputUnit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'microseconds';

  var d = duration;
  if (inputUnit === 'microseconds') {
    d = duration / 1000;
  }
  var units = 'ms';
  if (d >= 1000) {
    units = 's';
    d /= 1000;
  }
  return _lodash2.default.round(d, 2) + units;
}

function formatRelativeDate(value) {
  var fullMonthName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var m = !(value instanceof _moment2.default) ? (0, _moment2.default)(value) : value;
  var monthFormat = fullMonthName ? 'MMMM' : 'MMM';
  var dt = new Date();
  if (dt.getFullYear() !== m.year()) {
    return m.format(monthFormat + ' D, YYYY');
  }
  var mMonth = m.month();
  var mDate = m.date();
  var date = dt.getDate();
  if (mMonth === dt.getMonth() && mDate === date) {
    return TODAY;
  }
  dt.setDate(date - 1);
  if (mMonth === dt.getMonth() && mDate === dt.getDate()) {
    return YESTERDAY;
  }
  return m.format(monthFormat + ' D');
}