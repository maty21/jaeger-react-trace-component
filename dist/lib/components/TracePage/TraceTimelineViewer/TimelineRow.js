'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = TimelineRow;

var _react = require('react');

var React = _interopRequireWildcard(_react);

require('./TimelineRow.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } //      

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

function TimelineRow(props) {
  var children = props.children,
      className = props.className,
      rest = _objectWithoutProperties(props, ['children', 'className']);

  return React.createElement(
    'div',
    _extends({ className: 'flex-row ' + className }, rest),
    children
  );
}

TimelineRow.defaultProps = {
  className: ''
};

function TimelineRowCell(props) {
  var children = props.children,
      className = props.className,
      width = props.width,
      style = props.style,
      rest = _objectWithoutProperties(props, ['children', 'className', 'width', 'style']);

  var widthPercent = width * 100 + '%';
  var mergedStyle = _extends({}, style, { flexBasis: widthPercent, maxWidth: widthPercent });
  return React.createElement(
    'div',
    _extends({ className: 'ub-relative ' + className, style: mergedStyle }, rest),
    children
  );
}

TimelineRowCell.defaultProps = { className: '', style: {} };

TimelineRow.Cell = TimelineRowCell;