'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _SpanBar = require('./SpanBar');

var _SpanBar2 = _interopRequireDefault(_SpanBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<SpanBar>', function () {
  var shortLabel = 'omg-so-awesome';
  var longLabel = 'omg-awesome-long-label';

  var props = {
    longLabel: longLabel,
    shortLabel: shortLabel,
    color: '#fff',
    hintSide: 'right',
    viewEnd: 1,
    viewStart: 0,
    rpc: {
      viewStart: 0.25,
      viewEnd: 0.75,
      color: '#000'
    }
  };

  it('renders without exploding', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_SpanBar2.default, props));
    expect(wrapper).toBeDefined();

    var _wrapper$find$props = wrapper.find('.SpanBar--wrapper').props(),
        onMouseOver = _wrapper$find$props.onMouseOver,
        onMouseOut = _wrapper$find$props.onMouseOut;

    var labelElm = wrapper.find('.SpanBar--label');
    expect(labelElm.text()).toBe(shortLabel);
    onMouseOver();
    expect(labelElm.text()).toBe(longLabel);
    onMouseOut();
    expect(labelElm.text()).toBe(shortLabel);
  });
}); // Copyright (c) 2017 Uber Technologies, Inc.
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