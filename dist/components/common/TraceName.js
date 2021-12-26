'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TraceName;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _BreakableText = require('../common/BreakableText');

var _BreakableText2 = _interopRequireDefault(_BreakableText);

var _LoadingIndicator = require('../common/LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _constants = require('../../constants');

require('./TraceName.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function TraceName(props) {
  var breakable = props.breakable,
      className = props.className,
      error = props.error,
      state = props.state,
      traceName = props.traceName;

  var isErred = state === _constants.fetchedState.ERROR;
  var title = traceName || _constants.FALLBACK_TRACE_NAME;
  var errorCssClass = '';
  if (isErred) {
    errorCssClass = 'is-error';
    var titleStr = '';
    if (error) {
      titleStr = typeof error === 'string' ? error : error.message || String(error);
    }
    if (!titleStr) {
      titleStr = 'Error: Unknown error';
    }
    title = React.createElement(_BreakableText2.default, { text: titleStr });
  } else if (state === _constants.fetchedState.LOADING) {
    title = React.createElement(_LoadingIndicator2.default, { small: true });
  } else {
    var text = traceName || _constants.FALLBACK_TRACE_NAME;
    title = breakable ? React.createElement(_BreakableText2.default, { text: text }) : text;
  }
  return React.createElement(
    'span',
    { className: 'TraceName ' + errorCssClass + ' ' + (className || '') },
    title
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

TraceName.defaultProps = {
  breakable: false,
  className: ''
};