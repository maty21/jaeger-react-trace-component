'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BreakableText;

var _react = require('react');

var React = _interopRequireWildcard(_react);

require('./BreakableText.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

var WORD_RX = /\W*\w+\W*/g;

function BreakableText(props) {
  var className = props.className,
      text = props.text,
      _props$wordRegexp = props.wordRegexp,
      wordRegexp = _props$wordRegexp === undefined ? WORD_RX : _props$wordRegexp;

  if (!text) {
    return typeof text === 'string' ? text : null;
  }
  var spans = [];
  wordRegexp.exec('');
  var match = wordRegexp.exec(text);
  while (match) {
    spans.push(React.createElement(
      'span',
      { key: 'word-' + spans.length, className: className },
      match[0]
    ));
    match = wordRegexp.exec(text);
  }
  return spans;
}

BreakableText.defaultProps = {
  className: 'BreakableText',
  wordRegexp: WORD_RX
};