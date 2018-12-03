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

var _TracePageHeader = require('./TracePageHeader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<TracePageHeader>', function () {
  var defaultProps = {
    traceID: 'some-trace-id',
    name: 'some-trace-name',
    textFilter: '',
    updateTextFilter: function updateTextFilter() {}
  };

  var wrapper = void 0;

  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TracePageHeader.TracePageHeaderFn, defaultProps));
  });

  it('renders a <header />', function () {
    expect(wrapper.find('header').length).toBe(1);
  });

  it('renders an empty <div> if no traceID is present', function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TracePageHeader.TracePageHeaderFn, _extends({}, defaultProps, { traceID: null })));
    expect(wrapper.children().length).toBe(0);
  });

  it('renders the trace title', function () {
    var h1 = wrapper.find('h1').first();
    expect(h1.contains(defaultProps.name)).toBeTruthy();
  });

  it('renders the header items', function () {
    wrapper.find('.horizontal .item').forEach(function (item, i) {
      expect(item.contains(_TracePageHeader.HEADER_ITEMS[i].title)).toBeTruthy();
      expect(item.contains(_TracePageHeader.HEADER_ITEMS[i].renderer(defaultProps.trace))).toBeTruthy();
    });
  });
});