'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2017 Uber Technologies, Inc.
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _Scrubber = require('./Scrubber');

var _Scrubber2 = _interopRequireDefault(_Scrubber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<Scrubber>', function () {
  var defaultProps = {
    onMouseDown: _sinon2.default.spy(),
    position: 0
  };

  var wrapper = void 0;

  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Scrubber2.default, defaultProps));
  });

  it('contains the proper svg components', function () {
    expect(wrapper.matchesElement(_react2.default.createElement(
      'g',
      null,
      _react2.default.createElement(
        'g',
        { className: 'Scrubber--handles' },
        _react2.default.createElement('rect', { className: 'Scrubber--handleExpansion' }),
        _react2.default.createElement('rect', { className: 'Scrubber--handle' })
      ),
      _react2.default.createElement('line', { className: 'Scrubber--line' })
    ))).toBeTruthy();
  });

  it('calculates the correct x% for a timestamp', function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Scrubber2.default, _extends({}, defaultProps, { position: 0.5 })));
    var line = wrapper.find('line').first();
    var rect = wrapper.find('rect').first();
    expect(line.prop('x1')).toBe('50%');
    expect(line.prop('x2')).toBe('50%');
    expect(rect.prop('x')).toBe('50%');
  });

  it('supports onMouseDown', function () {
    var event = {};
    wrapper.find('.Scrubber--handles').prop('onMouseDown')(event);
    expect(defaultProps.onMouseDown.calledWith(event)).toBeTruthy();
  });
});