'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyValuesSummary = KeyValuesSummary;
exports.default = AccordianKeyValues;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _iosArrowDown = require('react-icons/lib/io/ios-arrow-down');

var _iosArrowDown2 = _interopRequireDefault(_iosArrowDown);

var _iosArrowRight = require('react-icons/lib/io/ios-arrow-right');

var _iosArrowRight2 = _interopRequireDefault(_iosArrowRight);

var _AccordianKeyValues = require('./AccordianKeyValues.markers');

var markers = _interopRequireWildcard(_AccordianKeyValues);

var _KeyValuesTable = require('./KeyValuesTable');

var _KeyValuesTable2 = _interopRequireDefault(_KeyValuesTable);

require('./AccordianKeyValues.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export for tests
function KeyValuesSummary(props) {
  var data = props.data;

  if (!Array.isArray(data) || !data.length) {
    return null;
  }
  return _react2.default.createElement(
    'ul',
    { className: 'AccordianKeyValues--summary' },
    data.map(function (item, i) {
      return (
        // `i` is necessary in the key because item.key can repeat
        // eslint-disable-next-line react/no-array-index-key
        _react2.default.createElement(
          'li',
          { className: 'AccordianKeyValues--summaryItem', key: item.key + '-' + i },
          _react2.default.createElement(
            'span',
            { className: 'AccordianKeyValues--summaryLabel' },
            item.key
          ),
          _react2.default.createElement(
            'span',
            { className: 'AccordianKeyValues--summaryDelim' },
            '='
          ),
          String(item.value)
        )
      );
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

KeyValuesSummary.defaultProps = {
  data: null
};

function AccordianKeyValues(props) {
  var className = props.className,
      data = props.data,
      highContrast = props.highContrast,
      isOpen = props.isOpen,
      label = props.label,
      linksGetter = props.linksGetter,
      onToggle = props.onToggle;

  var isEmpty = !Array.isArray(data) || !data.length;
  var iconCls = (0, _classnames2.default)('u-align-icon', { 'AccordianKeyValues--emptyIcon': isEmpty });
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(className, 'u-tx-ellipsis') },
    _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)('AccordianKeyValues--header', {
          'is-empty': isEmpty,
          'is-high-contrast': highContrast
        }),
        'aria-checked': isOpen,
        onClick: isEmpty ? null : onToggle,
        role: 'switch'
      },
      isOpen ? _react2.default.createElement(_iosArrowDown2.default, { className: iconCls }) : _react2.default.createElement(_iosArrowRight2.default, { className: iconCls }),
      _react2.default.createElement(
        'strong',
        { 'data-test': markers.LABEL },
        label,
        isOpen || ':'
      ),
      !isOpen && _react2.default.createElement(KeyValuesSummary, { data: data })
    ),
    isOpen && _react2.default.createElement(_KeyValuesTable2.default, { data: data, linksGetter: linksGetter })
  );
}

AccordianKeyValues.defaultProps = {
  className: null,
  highContrast: false
};