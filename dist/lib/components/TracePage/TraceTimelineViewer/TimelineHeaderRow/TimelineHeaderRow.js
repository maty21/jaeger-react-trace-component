'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); //      

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

exports.default = TimelineHeaderRow;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _TimelineCollapser = require('./TimelineCollapser');

var _TimelineCollapser2 = _interopRequireDefault(_TimelineCollapser);

var _TimelineColumnResizer = require('./TimelineColumnResizer');

var _TimelineColumnResizer2 = _interopRequireDefault(_TimelineColumnResizer);

var _TimelineViewingLayer = require('./TimelineViewingLayer');

var _TimelineViewingLayer2 = _interopRequireDefault(_TimelineViewingLayer);

var _Ticks = require('../Ticks');

var _Ticks2 = _interopRequireDefault(_Ticks);

var _TimelineRow = require('../TimelineRow');

var _TimelineRow2 = _interopRequireDefault(_TimelineRow);

require('./TimelineHeaderRow.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function TimelineHeaderRow(props) {
  var duration = props.duration,
      nameColumnWidth = props.nameColumnWidth,
      numTicks = props.numTicks,
      onCollapseAll = props.onCollapseAll,
      onCollapseOne = props.onCollapseOne,
      onColummWidthChange = props.onColummWidthChange,
      onExpandAll = props.onExpandAll,
      onExpandOne = props.onExpandOne,
      updateViewRangeTime = props.updateViewRangeTime,
      updateNextViewRangeTime = props.updateNextViewRangeTime,
      viewRangeTime = props.viewRangeTime;

  var _viewRangeTime$curren = _slicedToArray(viewRangeTime.current, 2),
      viewStart = _viewRangeTime$curren[0],
      viewEnd = _viewRangeTime$curren[1];

  return React.createElement(
    _TimelineRow2.default,
    { className: 'TimelineHeaderRow' },
    React.createElement(
      _TimelineRow2.default.Cell,
      { className: 'ub-flex ub-px2', width: nameColumnWidth },
      React.createElement(
        'h3',
        { className: 'TimelineHeaderRow--title' },
        'Service & Operation'
      ),
      React.createElement(_TimelineCollapser2.default, {
        onCollapseAll: onCollapseAll,
        onExpandAll: onExpandAll,
        onCollapseOne: onCollapseOne,
        onExpandOne: onExpandOne
      })
    ),
    React.createElement(
      _TimelineRow2.default.Cell,
      { width: 1 - nameColumnWidth },
      React.createElement(_TimelineViewingLayer2.default, {
        boundsInvalidator: nameColumnWidth,
        updateNextViewRangeTime: updateNextViewRangeTime,
        updateViewRangeTime: updateViewRangeTime,
        viewRangeTime: viewRangeTime
      }),
      React.createElement(_Ticks2.default, { numTicks: numTicks, startTime: viewStart * duration, endTime: viewEnd * duration, showLabels: true })
    ),
    React.createElement(_TimelineColumnResizer2.default, {
      position: nameColumnWidth,
      onChange: onColummWidthChange,
      min: 0.15,
      max: 0.85
    })
  );
}