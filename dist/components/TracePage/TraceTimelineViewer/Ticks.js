'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Ticks;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _utils = require('./utils');

require('./Ticks.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function Ticks(props) {
  var endTime = props.endTime,
      numTicks = props.numTicks,
      showLabels = props.showLabels,
      startTime = props.startTime;


  var labels = void 0;
  if (showLabels) {
    labels = [];
    var viewingDuration = (endTime || 0) - (startTime || 0);
    for (var i = 0; i < numTicks; i++) {
      var durationAtTick = startTime + i / (numTicks - 1) * viewingDuration;
      labels.push((0, _utils.formatDuration)(durationAtTick));
    }
  }
  var ticks = [];
  for (var _i = 0; _i < numTicks; _i++) {
    var portion = _i / (numTicks - 1);
    ticks.push(React.createElement(
      'div',
      {
        key: portion,
        className: 'Ticks--tick',
        style: {
          left: portion * 100 + '%'
        }
      },
      labels && React.createElement(
        'span',
        { className: 'Ticks--tickLabel ' + (portion >= 1 ? 'isEndAnchor' : '') },
        labels[_i]
      )
    ));
  }
  return React.createElement(
    'div',
    { className: 'Ticks' },
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

Ticks.defaultProps = {
  endTime: null,
  showLabels: null,
  startTime: null
};