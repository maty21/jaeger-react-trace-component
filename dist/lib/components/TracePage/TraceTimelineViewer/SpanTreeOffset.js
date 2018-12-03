'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = SpanTreeOffset;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chevronRight = require('react-icons/lib/io/chevron-right');

var _chevronRight2 = _interopRequireDefault(_chevronRight);

var _iosArrowDown = require('react-icons/lib/io/ios-arrow-down');

var _iosArrowDown2 = _interopRequireDefault(_iosArrowDown);

require('./SpanTreeOffset.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SpanTreeOffset(props) {
  var level = props.level,
      hasChildren = props.hasChildren,
      childrenVisible = props.childrenVisible,
      onClick = props.onClick;

  var wrapperProps = hasChildren ? { onClick: onClick, role: 'switch', 'aria-checked': childrenVisible } : null;
  var icon = hasChildren && (childrenVisible ? _react2.default.createElement(_iosArrowDown2.default, null) : _react2.default.createElement(_chevronRight2.default, null));
  return _react2.default.createElement(
    'span',
    _extends({ className: 'SpanTreeOffset ' + (hasChildren ? 'is-parent' : '') }, wrapperProps),
    _react2.default.createElement('span', { style: { paddingLeft: level * 20 + 'px' } }),
    icon && _react2.default.createElement(
      'span',
      { className: 'SpanTreeOffset--iconWrapper' },
      icon
    )
  );
}

SpanTreeOffset.defaultProps = {
  hasChildren: false,
  childrenVisible: false,
  onClick: null
};