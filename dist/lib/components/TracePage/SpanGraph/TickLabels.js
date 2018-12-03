'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TickLabels;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _date = require('../../../utils/date');

require('./TickLabels.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TickLabels(props) {
  var numTicks = props.numTicks,
      duration = props.duration;


  var ticks = [];
  for (var i = 0; i < numTicks + 1; i++) {
    var portion = i / numTicks;
    var style = portion === 1 ? { right: '0%' } : { left: portion * 100 + '%' };
    ticks.push(_react2.default.createElement(
      'div',
      { key: portion, className: 'TickLabels--label', style: style, 'data-test': 'tick' },
      (0, _date.formatDuration)(duration * portion)
    ));
  }

  return _react2.default.createElement(
    'div',
    { className: 'TickLabels' },
    ticks
  );
} //      

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