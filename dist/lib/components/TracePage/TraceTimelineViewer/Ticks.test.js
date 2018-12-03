'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Ticks = require('./Ticks');

var _Ticks2 = _interopRequireDefault(_Ticks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<Ticks>', function () {
  it('renders without exploding', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Ticks2.default, { endTime: 200, numTicks: 5, showLabels: true, startTime: 100 }));
    expect(wrapper).toBeDefined();
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