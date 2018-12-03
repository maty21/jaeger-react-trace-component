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

var _TickLabels = require('./TickLabels');

var _TickLabels2 = _interopRequireDefault(_TickLabels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<TickLabels>', function () {
  var defaultProps = {
    numTicks: 4,
    duration: 5000
  };

  var wrapper = void 0;
  var ticks = void 0;

  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TickLabels2.default, defaultProps));
    ticks = wrapper.find('[data-test="tick"]');
  });

  it('renders the right number of ticks', function () {
    expect(ticks.length).toBe(defaultProps.numTicks + 1);
  });

  it('places the first tick on the left', function () {
    var firstTick = ticks.first();
    expect(firstTick.prop('style')).toEqual({ left: '0%' });
  });

  it('places the last tick on the right', function () {
    var lastTick = ticks.last();
    expect(lastTick.prop('style')).toEqual({ right: '0%' });
  });

  it('places middle ticks at proper intervals', function () {
    var positions = ['25%', '50%', '75%'];
    positions.forEach(function (pos, i) {
      var tick = ticks.at(i + 1);
      expect(tick.prop('style')).toEqual({ left: pos });
    });
  });

  it("doesn't explode if no trace is present", function () {
    expect(function () {
      return (0, _enzyme.shallow)(_react2.default.createElement(_TickLabels2.default, _extends({}, defaultProps, { trace: null })));
    }).not.toThrow();
  });
});