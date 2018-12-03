'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AccordianLogs;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sortBy2 = require('lodash/sortBy');

var _sortBy3 = _interopRequireDefault(_sortBy2);

var _iosArrowDown = require('react-icons/lib/io/ios-arrow-down');

var _iosArrowDown2 = _interopRequireDefault(_iosArrowDown);

var _iosArrowRight = require('react-icons/lib/io/ios-arrow-right');

var _iosArrowRight2 = _interopRequireDefault(_iosArrowRight);

var _AccordianKeyValues = require('./AccordianKeyValues');

var _AccordianKeyValues2 = _interopRequireDefault(_AccordianKeyValues);

var _utils = require('../utils');

require('./AccordianLogs.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AccordianLogs(props) {
  var isOpen = props.isOpen,
      linksGetter = props.linksGetter,
      logs = props.logs,
      openedItems = props.openedItems,
      onItemToggle = props.onItemToggle,
      onToggle = props.onToggle,
      timestamp = props.timestamp;


  return _react2.default.createElement(
    'div',
    { className: 'AccordianLogs' },
    _react2.default.createElement(
      'a',
      {
        className: 'AccordianLogs--header ' + (isOpen ? 'is-open' : ''),
        'aria-checked': isOpen,
        onClick: onToggle,
        role: 'switch'
      },
      isOpen ? _react2.default.createElement(_iosArrowDown2.default, { className: 'u-align-icon' }) : _react2.default.createElement(_iosArrowRight2.default, { className: 'u-align-icon' }),
      _react2.default.createElement(
        'strong',
        null,
        'Logs'
      ),
      ' (',
      logs.length,
      ')'
    ),
    isOpen && _react2.default.createElement(
      'div',
      { className: 'AccordianLogs--content' },
      (0, _sortBy3.default)(logs, 'timestamp').map(function (log, i) {
        return _react2.default.createElement(_AccordianKeyValues2.default
        // `i` is necessary in the key because timestamps can repeat
        // eslint-disable-next-line react/no-array-index-key
        , { key: log.timestamp + '-' + i,
          className: i < logs.length - 1 ? 'ub-mb1' : null
          // compact
          , highContrast: true,
          isOpen: openedItems.has(log),
          linksGetter: linksGetter,
          data: log.fields || [],
          label: '' + (0, _utils.formatDuration)(log.timestamp - timestamp),
          onToggle: function onToggle() {
            return onItemToggle(log);
          }
        });
      }),
      _react2.default.createElement(
        'small',
        { className: 'AccordianLogs--footer' },
        'Log timestamps are relative to the start time of the full trace.'
      )
    )
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