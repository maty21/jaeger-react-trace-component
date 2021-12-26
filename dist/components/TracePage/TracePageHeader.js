'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HEADER_ITEMS = undefined;

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

//import { Link } from 'react-router-dom';

exports.TracePageHeaderFn = TracePageHeaderFn;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _antd = require('antd');

var _chevronDown = require('react-icons/lib/io/chevron-down');

var _chevronDown2 = _interopRequireDefault(_chevronDown);

var _chevronRight = require('react-icons/lib/io/chevron-right');

var _chevronRight2 = _interopRequireDefault(_chevronRight);

var _iosFilingOutline = require('react-icons/lib/io/ios-filing-outline');

var _iosFilingOutline2 = _interopRequireDefault(_iosFilingOutline);

var _KeyboardShortcutsHelp = require('./KeyboardShortcutsHelp');

var _KeyboardShortcutsHelp2 = _interopRequireDefault(_KeyboardShortcutsHelp);

var _TracePageHeader = require('./TracePageHeader.track');

var _TracePageSearchBar = require('./TracePageSearchBar');

var _TracePageSearchBar2 = _interopRequireDefault(_TracePageSearchBar);

var _LabeledList = require('../common/LabeledList');

var _LabeledList2 = _interopRequireDefault(_LabeledList);

var _constants = require('../../constants');

var _date = require('../../utils/date');

var _prefixUrl = require('../../utils/prefix-url');

var _prefixUrl2 = _interopRequireDefault(_prefixUrl);

require('./TracePageHeader.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var HEADER_ITEMS = exports.HEADER_ITEMS = [{
  key: 'timestamp',
  title: 'Trace Start',
  propName: null,
  renderer: function renderer(props) {
    return (0, _date.formatDatetime)(props.timestamp);
  }
}, {
  key: 'duration',
  title: 'Duration',
  propName: null,
  renderer: function renderer(props) {
    return (0, _date.formatDuration)(props.duration);
  }
}, {
  key: 'service-count',
  title: 'Services',
  propName: 'numServices',
  renderer: null
}, {
  key: 'depth',
  title: 'Depth',
  propName: 'maxDepth',
  renderer: null
}, {
  key: 'span-count',
  title: 'Total Spans',
  propName: 'numSpans',
  renderer: null
}];

function TracePageHeaderFn(props) {
  var archiveButtonVisible = props.archiveButtonVisible,
      onArchiveClicked = props.onArchiveClicked,
      duration = props.duration,
      maxDepth = props.maxDepth,
      numSpans = props.numSpans,
      timestamp = props.timestamp,
      numServices = props.numServices,
      traceID = props.traceID,
      name = props.name,
      slimView = props.slimView,
      onSlimViewClicked = props.onSlimViewClicked,
      updateTextFilter = props.updateTextFilter,
      textFilter = props.textFilter,
      prevResult = props.prevResult,
      nextResult = props.nextResult,
      clearSearch = props.clearSearch,
      resultCount = props.resultCount,
      forwardedRef = props.forwardedRef;


  if (!traceID) {
    return null;
  }

  var viewMenu = React.createElement(_antd.Menu, null);

  var overviewItems = [{
    key: 'start',
    label: 'Trace Start:',
    value: (0, _date.formatDatetime)(timestamp)
  }, {
    key: 'duration',
    label: 'Duration:',
    value: (0, _date.formatDuration)(duration)
  }, {
    key: 'svc-count',
    label: 'Services:',
    value: numServices
  }, {
    key: 'depth',
    label: 'Depth:',
    value: maxDepth
  }, {
    key: 'span-count',
    label: 'Total Spans:',
    value: numSpans
  }];

  return React.createElement(
    'header',
    null,
    React.createElement(
      'div',
      { className: 'TracePageHeader--titleRow' },
      !slimView && React.createElement(_LabeledList2.default, { className: 'TracePageHeader--overviewItems', items: overviewItems }),
      React.createElement(_TracePageSearchBar2.default, {
        updateTextFilter: updateTextFilter,
        textFilter: textFilter,
        prevResult: prevResult,
        nextResult: nextResult,
        clearSearch: clearSearch,
        resultCount: resultCount,
        ref: forwardedRef
      })
    )
  );
}

// ghetto fabulous cast because the 16.3 API is not in flow yet
// https://github.com/facebook/flow/issues/6103
exports.default = React.forwardRef(function (props, ref) {
  return React.createElement(TracePageHeaderFn, _extends({}, props, { forwardedRef: ref }));
});