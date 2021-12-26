'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = KeyboardShortcutsHelp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _keyboardShortcuts = require('./keyboard-shortcuts');

var _KeyboardShortcutsHelp = require('./KeyboardShortcutsHelp.track');

var _KeyboardShortcutsHelp2 = _interopRequireDefault(_KeyboardShortcutsHelp);

require('./KeyboardShortcutsHelp.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //      

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

var Column = _antd.Table.Column;


var symbolConv = {
  up: '↑',
  right: '→',
  down: '↓',
  left: '←',
  shift: '⇧'
};

var descriptions = {
  scrollPageDown: 'Scroll down',
  scrollPageUp: 'Scroll up',
  scrollToNextVisibleSpan: 'Scroll to the next visible span',
  scrollToPrevVisibleSpan: 'Scroll to the previous visible span',
  panLeft: 'Pan left',
  panLeftFast: 'Pan left — Large',
  panRight: 'Pan right',
  panRightFast: 'Pan right — Large',
  zoomIn: 'Zoom in',
  zoomInFast: 'Zoom in — Large',
  zoomOut: 'Zoom out',
  zoomOutFast: 'Zoom out — Large',
  collapseAll: 'Collapse All',
  expandAll: 'Expand All',
  collapseOne: 'Collapse One Level',
  expandOne: 'Expand One Level',
  searchSpans: 'Search Spans',
  clearSearch: 'Clear Search'
};

function convertKeys(keyConfig) {
  var config = Array.isArray(keyConfig) ? keyConfig : [keyConfig];
  return config.map(function (str) {
    return str.split('+').map(function (part) {
      return symbolConv[part] || part.toUpperCase();
    });
  });
}

function helpModal() {
  (0, _KeyboardShortcutsHelp2.default)();
  var data = [];
  Object.keys(_keyboardShortcuts.kbdMappings).forEach(function (title) {
    var keyConfigs = convertKeys(_keyboardShortcuts.kbdMappings[title]);
    data.push.apply(data, _toConsumableArray(keyConfigs.map(function (config) {
      return {
        key: String(config),
        kbds: _react2.default.createElement(
          'kbd',
          null,
          config.join(' ')
        ),
        description: descriptions[title]
      };
    })));
  });

  var content = _react2.default.createElement(
    _antd.Table,
    {
      className: 'KeyboardShortcutsHelp--table',
      dataSource: data,
      bordered: true,
      size: 'middle',
      pagination: false
    },
    _react2.default.createElement(Column, { title: 'Key(s)', dataIndex: 'kbds', key: 'kbds' }),
    _react2.default.createElement(Column, { title: 'Description', dataIndex: 'description', key: 'description' })
  );

  _antd.Modal.info({
    content: content,
    maskClosable: true,
    title: 'Keyboard Shortcuts',
    width: '50%'
  });
}

function KeyboardShortcutsHelp(props) {
  var className = props.className;

  return _react2.default.createElement(
    'button',
    { className: className, onClick: helpModal },
    _react2.default.createElement(
      'span',
      { className: 'KeyboardShortcutsHelp--cta' },
      '\u2318'
    )
  );
}