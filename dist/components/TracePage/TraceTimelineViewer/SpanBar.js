'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

require('./SpanBar.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toPercent(value) {
  return value * 100 + '%';
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

function SpanBar(props) {
  var viewEnd = props.viewEnd,
      viewStart = props.viewStart,
      color = props.color,
      label = props.label,
      hintSide = props.hintSide,
      onClick = props.onClick,
      setLongLabel = props.setLongLabel,
      setShortLabel = props.setShortLabel,
      rpc = props.rpc;


  return _react2.default.createElement(
    'div',
    {
      className: 'SpanBar--wrapper',
      onClick: onClick,
      onMouseOut: setShortLabel,
      onMouseOver: setLongLabel,
      'aria-hidden': true
    },
    _react2.default.createElement(
      'div',
      {
        'aria-label': label,
        className: 'SpanBar--bar',
        style: {
          background: color,
          left: toPercent(viewStart),
          width: toPercent(viewEnd - viewStart)
        }
      },
      _react2.default.createElement(
        'div',
        { className: 'SpanBar--label is-' + hintSide },
        label
      )
    ),
    rpc && _react2.default.createElement('div', {
      className: 'SpanBar--rpc',
      style: {
        background: rpc.color,
        left: toPercent(rpc.viewStart),
        width: toPercent(rpc.viewEnd - rpc.viewStart)
      }
    })
  );
}

exports.default = (0, _recompose.compose)((0, _recompose.withState)('label', 'setLabel', function (props) {
  return props.shortLabel;
}), (0, _recompose.withProps)(function (_ref) {
  var setLabel = _ref.setLabel,
      shortLabel = _ref.shortLabel,
      longLabel = _ref.longLabel;
  return {
    setLongLabel: function setLongLabel() {
      return setLabel(longLabel);
    },
    setShortLabel: function setShortLabel() {
      return setLabel(shortLabel);
    }
  };
}), (0, _recompose.onlyUpdateForKeys)(['label', 'rpc', 'viewStart', 'viewEnd']))(SpanBar);