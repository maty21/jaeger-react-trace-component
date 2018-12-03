'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //      

// Copyright (c) 2018 Uber Technologies, Inc.
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

exports.TracePageSearchBarFn = TracePageSearchBarFn;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _antd = require('antd');

var _TracePageSearchBar = require('./TracePageSearchBar.markers');

var markers = _interopRequireWildcard(_TracePageSearchBar);

require('./TracePageSearchBar.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function TracePageSearchBarFn(props) {
  var prevResult = props.prevResult,
      nextResult = props.nextResult,
      clearSearch = props.clearSearch,
      resultCount = props.resultCount,
      updateTextFilter = props.updateTextFilter,
      textFilter = props.textFilter,
      forwardedRef = props.forwardedRef;


  var count = textFilter ? React.createElement(
    'span',
    { className: 'TracePageSearchBar--count' },
    resultCount
  ) : null;

  var updateFilter = function updateFilter(event) {
    return updateTextFilter(event.target.value);
  };
  var onKeyDown = function onKeyDown(e) {
    if (e.keyCode === 27) clearSearch();
  };

  var btnClass = 'TracePageSearchBar--btn' + (textFilter ? '' : ' is-disabled');

  return React.createElement(
    'div',
    { className: 'ub-flex-auto ub-mr2 TracePageSearchBar' },
    React.createElement(
      _antd.Input.Group,
      { compact: true, style: { display: 'flex' } },
      React.createElement(_antd.Input, {
        name: 'search',
        className: 'TracePageSearchBar--bar ub-flex-auto',
        placeholder: 'Search...',
        onChange: updateFilter,
        value: textFilter,
        'data-test': markers.IN_TRACE_SEARCH,
        suffix: count,
        ref: forwardedRef,
        onKeyDown: onKeyDown,
        onPressEnter: nextResult
      }),
      React.createElement(_antd.Button, { className: btnClass, disabled: !textFilter, icon: 'up', onClick: prevResult }),
      React.createElement(_antd.Button, { className: btnClass, disabled: !textFilter, icon: 'down', onClick: nextResult }),
      React.createElement(_antd.Button, { className: btnClass, disabled: !textFilter, icon: 'close', onClick: clearSearch })
    )
  );
}

// ghetto fabulous cast because the 16.3 API is not in flow yet
// https://github.com/facebook/flow/issues/6103
exports.default = React.forwardRef(function (props, ref) {
  return React.createElement(TracePageSearchBarFn, _extends({}, props, { forwardedRef: ref }));
});