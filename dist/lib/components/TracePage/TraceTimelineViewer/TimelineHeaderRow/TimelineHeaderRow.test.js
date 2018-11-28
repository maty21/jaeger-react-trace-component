'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Copyright (c) 2017 Uber Technologies, Inc.
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

var _TimelineHeaderRow = require('./TimelineHeaderRow');

var _TimelineHeaderRow2 = _interopRequireDefault(_TimelineHeaderRow);

var _TimelineColumnResizer = require('./TimelineColumnResizer');

var _TimelineColumnResizer2 = _interopRequireDefault(_TimelineColumnResizer);

var _TimelineViewingLayer = require('./TimelineViewingLayer');

var _TimelineViewingLayer2 = _interopRequireDefault(_TimelineViewingLayer);

var _Ticks = require('../Ticks');

var _Ticks2 = _interopRequireDefault(_Ticks);

var _TimelineCollapser = require('./TimelineCollapser');

var _TimelineCollapser2 = _interopRequireDefault(_TimelineCollapser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<TimelineHeaderRow>', function () {
  var wrapper = void 0;

  var nameColumnWidth = 0.25;
  var props = {
    nameColumnWidth: nameColumnWidth,
    duration: 1234,
    numTicks: 5,
    onCollapseAll: function onCollapseAll() {},
    onCollapseOne: function onCollapseOne() {},
    onColummWidthChange: function onColummWidthChange() {},
    onExpandAll: function onExpandAll() {},
    onExpandOne: function onExpandOne() {},
    updateNextViewRangeTime: function updateNextViewRangeTime() {},
    updateViewRangeTime: function updateViewRangeTime() {},
    viewRangeTime: {
      current: [0.1, 0.9]
    }
  };

  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TimelineHeaderRow2.default, props));
  });

  it('renders without exploding', function () {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.TimelineHeaderRow').length).toBe(1);
  });

  it('propagates the name column width', function () {
    var nameCol = wrapper.find({ width: nameColumnWidth });
    var timelineCol = wrapper.find({ width: 1 - nameColumnWidth });
    expect(nameCol.length).toBe(1);
    expect(timelineCol.length).toBe(1);
  });

  it('renders the title', function () {
    expect(wrapper.find('h3').text()).toMatch(/Service.*?Operation/);
  });

  it('renders the TimelineViewingLayer', function () {
    var elm = _react2.default.createElement(_TimelineViewingLayer2.default, {
      boundsInvalidator: nameColumnWidth,
      updateNextViewRangeTime: props.updateNextViewRangeTime,
      updateViewRangeTime: props.updateViewRangeTime,
      viewRangeTime: props.viewRangeTime
    });
    expect(wrapper.containsMatchingElement(elm)).toBe(true);
  });

  it('renders the Ticks', function () {
    var _props$viewRangeTime$ = _slicedToArray(props.viewRangeTime.current, 2),
        viewStart = _props$viewRangeTime$[0],
        viewEnd = _props$viewRangeTime$[1];

    var elm = _react2.default.createElement(_Ticks2.default, {
      numTicks: props.numTicks,
      startTime: viewStart * props.duration,
      endTime: viewEnd * props.duration,
      showLabels: true
    });
    expect(wrapper.containsMatchingElement(elm)).toBe(true);
  });

  it('renders the TimelineColumnResizer', function () {
    var elm = _react2.default.createElement(_TimelineColumnResizer2.default, {
      position: nameColumnWidth,
      onChange: props.onColummWidthChange,
      min: 0.15,
      max: 0.85
    });
    expect(wrapper.containsMatchingElement(elm)).toBe(true);
  });

  it('renders the TimelineCollapser', function () {
    var elm = _react2.default.createElement(_TimelineCollapser2.default, {
      onCollapseAll: props.onCollapseAll,
      onExpandAll: props.onExpandAll,
      onCollapseOne: props.onCollapseOne,
      onExpandOne: props.onExpandOne
    });
    expect(wrapper.containsMatchingElement(elm)).toBe(true);
  });
});