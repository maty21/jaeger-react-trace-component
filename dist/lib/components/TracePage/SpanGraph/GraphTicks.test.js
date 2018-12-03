'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _GraphTicks = require('./GraphTicks');

var _GraphTicks2 = _interopRequireDefault(_GraphTicks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<GraphTicks>', function () {
  var defaultProps = {
    items: [{ valueWidth: 100, valueOffset: 25, serviceName: 'a' }, { valueWidth: 100, valueOffset: 50, serviceName: 'b' }],
    valueWidth: 200,
    numTicks: 4
  };

  var ticksG = void 0;

  beforeEach(function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_GraphTicks2.default, defaultProps));
    ticksG = wrapper.find('[data-test="ticks"]');
  });

  it('creates a <g> for ticks', function () {
    expect(ticksG.length).toBe(1);
  });

  it('creates a line for each ticks excluding the first and last', function () {
    expect(ticksG.find('line').length).toBe(defaultProps.numTicks - 1);
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