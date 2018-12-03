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

/* eslint-disable import/no-extraneous-dependencies */

exports.default = VirtSelect;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _antd = require('antd');

var _reactVirtualizedSelect = require('react-virtualized-select');

var _reactVirtualizedSelect2 = _interopRequireDefault(_reactVirtualizedSelect);

require('react-select/dist/react-select.css');

require('react-virtualized/styles.css');

require('react-virtualized-select/styles.css');

require('./VirtSelect.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function renderOption(_ref) {
  var focusedOption = _ref.focusedOption,
      focusOption = _ref.focusOption,
      key = _ref.key,
      labelKey = _ref.labelKey,
      option = _ref.option,
      selectValue = _ref.selectValue,
      style = _ref.style,
      valueArray = _ref.valueArray;

  var className = ['VirtSelect--option'];
  if (option === focusedOption) {
    className.push('is-focused');
  }
  if (option.disabled) {
    className.push('is-disabled');
  }
  if (valueArray && valueArray.indexOf(option) >= 0) {
    className.push('is-selected');
  }
  if (option.className) {
    className.push(option.className);
  }
  var events = option.disabled ? {} : {
    onClick: function onClick() {
      return selectValue(option);
    },
    onMouseEnter: function onMouseEnter() {
      return focusOption(option);
    }
  };
  return React.createElement(
    'div',
    _extends({ className: className.join(' '), key: key, style: style, title: option.title }, events),
    option[labelKey]
  );
}

function renderArrow(_ref2) {
  var isOpen = _ref2.isOpen;

  return React.createElement(_antd.Icon, { className: 'VirtSelect--arrow ' + (isOpen ? 'is-open' : ''), type: 'down' });
}

function VirtSelect(props) {
  return React.createElement(_reactVirtualizedSelect2.default, _extends({
    className: 'VirtSelect',
    arrowRenderer: renderArrow,
    optionRenderer: renderOption
  }, props));
}