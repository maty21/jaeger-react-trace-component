'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LabeledList;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _antd = require('antd');

require('./LabeledList.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function LabeledList(props) {
  var className = props.className,
      dividerClassName = props.dividerClassName,
      items = props.items;

  return React.createElement(
    'ul',
    { className: 'LabeledList ' + (className || '') },
    items.map(function (_ref, i) {
      var key = _ref.key,
          label = _ref.label,
          value = _ref.value;

      var divider = i < items.length - 1 && React.createElement(
        'li',
        { className: 'LabeledList--item', key: key + '--divider' },
        React.createElement(_antd.Divider, { className: dividerClassName, type: 'vertical' })
      );
      return [React.createElement(
        'li',
        { className: 'LabeledList--item', key: key },
        React.createElement(
          'span',
          { className: 'LabeledList--label' },
          label
        ),
        React.createElement(
          'strong',
          null,
          value
        )
      ), divider];
    })
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

LabeledList.defaultProps = {
  className: undefined,
  dividerClassName: undefined
};