'use strict';

var _convRavenToGa = require('./conv-raven-to-ga');

var _convRavenToGa2 = _interopRequireDefault(_convRavenToGa);

var _fixtures = require('./fixtures');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

describe('convRavenToGa()', function () {
  it('converts the raven-js payload to { category, action, label, value }', function () {
    var data = (0, _convRavenToGa2.default)(_fixtures.RAVEN_PAYLOAD);
    expect(data).toEqual(_fixtures.RAVEN_TO_GA);
  });
});