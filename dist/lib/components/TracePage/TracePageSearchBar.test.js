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

var _TracePageSearchBar = require('./TracePageSearchBar.markers');

var markers = _interopRequireWildcard(_TracePageSearchBar);

var _TracePageSearchBar2 = require('./TracePageSearchBar');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<TracePageSearchBar>', function () {
  var defaultProps = {
    updateTextFilter: function updateTextFilter() {},
    textFilter: 'something',
    prevResult: function prevResult() {},
    nextResult: function nextResult() {},
    resultCount: 0
  };

  var wrapper = void 0;

  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TracePageSearchBar2.TracePageSearchBarFn, defaultProps));
  });

  it('calls updateTextFilter() function for onChange of the input', function () {
    var updateTextFilter = jest.fn();
    var props = _extends({}, defaultProps, { updateTextFilter: updateTextFilter });
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TracePageSearchBar2.TracePageSearchBarFn, props));
    var event = { target: { value: 'my new value' } };
    wrapper.find('[data-test="' + markers.IN_TRACE_SEARCH + '"]').first().simulate('change', event);
    expect(updateTextFilter.mock.calls.length).toBe(1);
  });

  it('renders the search bar', function () {
    expect(wrapper.find('Input').length).toBe(1);
  });

  it('renders the buttons', function () {
    expect(wrapper.find('Button').length).toBe(3);
  });
});