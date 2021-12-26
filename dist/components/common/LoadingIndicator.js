'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = LoadingIndicator;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

require('./LoadingIndicator.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function LoadingIndicator(props) {
  var centered = props.centered,
      className = props.className,
      small = props.small,
      rest = _objectWithoutProperties(props, ['centered', 'className', 'small']);

  var cls = '\n    LoadingIndicator\n    ' + (centered ? 'is-centered' : '') + '\n    ' + (small ? 'is-small' : '') + '\n    ' + (className || '') + '\n  ';
  return _react2.default.createElement(_antd.Icon, _extends({ type: 'loading', className: cls }, rest));
}

LoadingIndicator.defaultProps = {
  centered: false,
  className: undefined,
  small: false
};