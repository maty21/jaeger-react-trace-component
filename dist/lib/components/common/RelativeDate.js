'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RelativeDate;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _date = require('../../utils/date');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//      

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

function RelativeDate(props) {
  var value = props.value,
      includeTime = props.includeTime,
      fullMonthName = props.fullMonthName;

  var m = !(value instanceof _moment2.default) ? (0, _moment2.default)(value) : value;
  var dateStr = (0, _date.formatRelativeDate)(m, Boolean(fullMonthName));
  var timeStr = includeTime ? ', ' + m.format('h:mm:ss a') : '';
  return '' + dateStr + timeStr;
}