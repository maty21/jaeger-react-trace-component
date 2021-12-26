'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SpanDetail;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _AccordianKeyValues = require('./AccordianKeyValues');

var _AccordianKeyValues2 = _interopRequireDefault(_AccordianKeyValues);

var _AccordianLogs = require('./AccordianLogs');

var _AccordianLogs2 = _interopRequireDefault(_AccordianLogs);

var _DetailState = require('./DetailState');

var _DetailState2 = _interopRequireDefault(_DetailState);

var _utils = require('../utils');

var _LabeledList = require('../../../common/LabeledList');

var _LabeledList2 = _interopRequireDefault(_LabeledList);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//      

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

function SpanDetail(props) {
  var detailState = props.detailState,
      linksGetter = props.linksGetter,
      logItemToggle = props.logItemToggle,
      logsToggle = props.logsToggle,
      processToggle = props.processToggle,
      span = props.span,
      tagsToggle = props.tagsToggle,
      traceStartTime = props.traceStartTime;
  var isTagsOpen = detailState.isTagsOpen,
      isProcessOpen = detailState.isProcessOpen,
      logsState = detailState.logs;
  var operationName = span.operationName,
      process = span.process,
      duration = span.duration,
      relativeStartTime = span.relativeStartTime,
      spanID = span.spanID,
      logs = span.logs,
      tags = span.tags;

  var overviewItems = [{
    key: 'svc',
    label: 'Service:',
    value: process.serviceName
  }, {
    key: 'duration',
    label: 'Duration:',
    value: (0, _utils.formatDuration)(duration)
  }, {
    key: 'start',
    label: 'Start Time:',
    value: (0, _utils.formatDuration)(relativeStartTime)
  }];
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'ub-flex ub-items-center' },
      _react2.default.createElement(
        'h2',
        { className: 'ub-flex-auto ub-m0' },
        operationName
      ),
      _react2.default.createElement(_LabeledList2.default, {
        className: 'ub-tx-right-align',
        dividerClassName: 'SpanDetail--divider',
        items: overviewItems
      })
    ),
    _react2.default.createElement(_antd.Divider, { className: 'SpanDetail--divider ub-my1' }),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_AccordianKeyValues2.default, {
          data: tags,
          label: 'Tags',
          linksGetter: linksGetter,
          isOpen: isTagsOpen,
          onToggle: function onToggle() {
            return tagsToggle(spanID);
          }
        }),
        process.tags && _react2.default.createElement(_AccordianKeyValues2.default, {
          className: 'ub-mb1',
          data: process.tags,
          label: 'Process',
          linksGetter: linksGetter,
          isOpen: isProcessOpen,
          onToggle: function onToggle() {
            return processToggle(spanID);
          }
        })
      ),
      logs && logs.length > 0 && _react2.default.createElement(_AccordianLogs2.default, {
        linksGetter: linksGetter,
        logs: logs,
        isOpen: logsState.isOpen,
        openedItems: logsState.openedItems,
        onToggle: function onToggle() {
          return logsToggle(spanID);
        },
        onItemToggle: function onItemToggle(logItem) {
          return logItemToggle(spanID, logItem);
        },
        timestamp: traceStartTime
      }),
      _react2.default.createElement(
        'small',
        { className: 'SpanDetail--debugInfo' },
        _react2.default.createElement('span', { className: 'SpanDetail--debugLabel', 'data-label': 'SpanID:' }),
        ' ',
        _react2.default.createElement(
          'span',
          { className: 'SpanDetail--debugValue' },
          spanID
        )
      )
    )
  );
}