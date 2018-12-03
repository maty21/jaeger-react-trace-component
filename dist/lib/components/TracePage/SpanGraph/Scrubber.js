'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Scrubber;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./Scrubber.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Scrubber(_ref) {
  var isDragging = _ref.isDragging,
      onMouseDown = _ref.onMouseDown,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      position = _ref.position;

  var xPercent = position * 100 + '%';
  var className = (0, _classnames2.default)('Scrubber', { isDragging: isDragging });
  return _react2.default.createElement(
    'g',
    { className: className },
    _react2.default.createElement(
      'g',
      {
        className: 'Scrubber--handles',
        onMouseDown: onMouseDown,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave
      },
      _react2.default.createElement('rect', {
        x: xPercent,
        className: 'Scrubber--handleExpansion',
        style: { transform: 'translate(-4.5px)' },
        width: '9',
        height: '20'
      }),
      _react2.default.createElement('rect', {
        x: xPercent,
        className: 'Scrubber--handle',
        style: { transform: 'translate(-1.5px)' },
        width: '3',
        height: '20'
      })
    ),
    _react2.default.createElement('line', { className: 'Scrubber--line', y2: '100%', x1: xPercent, x2: xPercent })
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