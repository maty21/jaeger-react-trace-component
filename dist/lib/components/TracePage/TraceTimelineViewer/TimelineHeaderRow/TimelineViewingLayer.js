'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

//import DraggableManager from '../../../utils/DraggableManager';

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DraggableManager = require('../../../../utils/DraggableManager');

var _DraggableManager2 = _interopRequireDefault(_DraggableManager);

require('./TimelineViewingLayer.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Map from a sub range to the greater view range, e.g, when the view range is
 * the middle half ([0.25, 0.75]), a value of 0.25 befomes 3/8.
 * @returns {number}
 */
function mapFromViewSubRange(viewStart, viewEnd, value) {
  return viewStart + value * (viewEnd - viewStart);
}

/**
 * Map a value from the view ([0, 1]) to a sub-range, e.g, when the view range is
 * the middle half ([0.25, 0.75]), a value of 3/8 becomes 1/4.
 * @returns {number}
 */
function mapToViewSubRange(viewStart, viewEnd, value) {
  return (value - viewStart) / (viewEnd - viewStart);
}

/**
 * Get the layout for the "next" view range time, e.g. the difference from the
 * drag start and the drag end. This is driven by `shiftStart`, `shiftEnd` or
 * `reframe` on `props.viewRangeTime`, not by the current state of the
 * component. So, it reflects in-progress dragging from the span minimap.
 */
function getNextViewLayout(start, position) {
  var _ref = start < position ? [start, position] : [position, start],
      _ref2 = _slicedToArray(_ref, 2),
      left = _ref2[0],
      right = _ref2[1];

  if (left >= 1 || right <= 0) {
    return { isOutOfView: true };
  }
  if (left < 0) {
    left = 0;
  }
  if (right > 1) {
    right = 1;
  }
  return {
    isDraggingLeft: start > position,
    left: left * 100 + '%',
    width: (right - left) * 100 + '%'
  };
}

/**
 * Render the visual indication of the "next" view range.
 */
function getMarkers(viewStart, viewEnd, from, to, isShift) {
  var mappedFrom = mapToViewSubRange(viewStart, viewEnd, from);
  var mappedTo = mapToViewSubRange(viewStart, viewEnd, to);
  var layout = getNextViewLayout(mappedFrom, mappedTo);
  if (layout.isOutOfView) {
    return null;
  }
  var isDraggingLeft = layout.isDraggingLeft,
      left = layout.left,
      width = layout.width;

  var cls = (0, _classnames2.default)({
    isDraggingLeft: isDraggingLeft,
    isDraggingRight: !isDraggingLeft,
    isReframeDrag: !isShift,
    isShiftDrag: isShift
  });
  return React.createElement('div', { className: 'TimelineViewingLayer--dragged ' + cls, style: { left: left, width: width } });
}

/**
 * `TimelineViewingLayer` is rendered on top of the TimelineHeaderRow time
 * labels; it handles showing the current view range and handles mouse UX for
 * modifying it.
 */

var TimelineViewingLayer = function (_React$PureComponent) {
  _inherits(TimelineViewingLayer, _React$PureComponent);

  function TimelineViewingLayer(props) {
    _classCallCheck(this, TimelineViewingLayer);

    var _this = _possibleConstructorReturn(this, (TimelineViewingLayer.__proto__ || Object.getPrototypeOf(TimelineViewingLayer)).call(this, props));

    _this._setRoot = function (elm) {
      _this._root = elm;
    };

    _this._getDraggingBounds = function () {
      if (!_this._root) {
        throw new Error('invalid state');
      }

      var _this$_root$getBoundi = _this._root.getBoundingClientRect(),
          clientXLeft = _this$_root$getBoundi.left,
          width = _this$_root$getBoundi.width;

      return { clientXLeft: clientXLeft, width: width };
    };

    _this._handleReframeMouseMove = function (_ref3) {
      var value = _ref3.value;

      var _this$props$viewRange = _slicedToArray(_this.props.viewRangeTime.current, 2),
          viewStart = _this$props$viewRange[0],
          viewEnd = _this$props$viewRange[1];

      var cursor = mapFromViewSubRange(viewStart, viewEnd, value);
      _this.props.updateNextViewRangeTime({ cursor: cursor });
    };

    _this._handleReframeMouseLeave = function () {
      _this.props.updateNextViewRangeTime({ cursor: undefined });
    };

    _this._handleReframeDragUpdate = function (_ref4) {
      var value = _ref4.value;
      var _this$props$viewRange2 = _this.props.viewRangeTime,
          current = _this$props$viewRange2.current,
          reframe = _this$props$viewRange2.reframe;

      var _current = _slicedToArray(current, 2),
          viewStart = _current[0],
          viewEnd = _current[1];

      var shift = mapFromViewSubRange(viewStart, viewEnd, value);
      var anchor = reframe ? reframe.anchor : shift;
      var update = { reframe: { anchor: anchor, shift: shift } };
      _this.props.updateNextViewRangeTime(update);
    };

    _this._handleReframeDragEnd = function (_ref5) {
      var manager = _ref5.manager,
          value = _ref5.value;
      var _this$props$viewRange3 = _this.props.viewRangeTime,
          current = _this$props$viewRange3.current,
          reframe = _this$props$viewRange3.reframe;

      var _current2 = _slicedToArray(current, 2),
          viewStart = _current2[0],
          viewEnd = _current2[1];

      var shift = mapFromViewSubRange(viewStart, viewEnd, value);
      var anchor = reframe ? reframe.anchor : shift;

      var _ref6 = shift < anchor ? [shift, anchor] : [anchor, shift],
          _ref7 = _slicedToArray(_ref6, 2),
          start = _ref7[0],
          end = _ref7[1];

      manager.resetBounds();
      _this.props.updateViewRangeTime(start, end, 'timeline-header');
    };

    _this._draggerReframe = new _DraggableManager2.default({
      getBounds: _this._getDraggingBounds,
      onDragEnd: _this._handleReframeDragEnd,
      onDragMove: _this._handleReframeDragUpdate,
      onDragStart: _this._handleReframeDragUpdate,
      onMouseLeave: _this._handleReframeMouseLeave,
      onMouseMove: _this._handleReframeMouseMove
    });
    _this._root = undefined;
    return _this;
  }

  _createClass(TimelineViewingLayer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var boundsInvalidator = this.props.boundsInvalidator;

      if (boundsInvalidator !== nextProps.boundsInvalidator) {
        this._draggerReframe.resetBounds();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._draggerReframe.dispose();
    }
  }, {
    key: 'render',
    value: function render() {
      var viewRangeTime = this.props.viewRangeTime;
      var current = viewRangeTime.current,
          cursor = viewRangeTime.cursor,
          reframe = viewRangeTime.reframe,
          shiftEnd = viewRangeTime.shiftEnd,
          shiftStart = viewRangeTime.shiftStart;

      var _current3 = _slicedToArray(current, 2),
          viewStart = _current3[0],
          viewEnd = _current3[1];

      var haveNextTimeRange = reframe != null || shiftEnd != null || shiftStart != null;
      var cusrorPosition = void 0;
      if (!haveNextTimeRange && cursor != null && cursor >= viewStart && cursor <= viewEnd) {
        cusrorPosition = mapToViewSubRange(viewStart, viewEnd, cursor) * 100 + '%';
      }
      return React.createElement(
        'div',
        {
          'aria-hidden': true,
          className: 'TimelineViewingLayer',
          ref: this._setRoot,
          onMouseDown: this._draggerReframe.handleMouseDown,
          onMouseLeave: this._draggerReframe.handleMouseLeave,
          onMouseMove: this._draggerReframe.handleMouseMove
        },
        cusrorPosition != null && React.createElement('div', { className: 'TimelineViewingLayer--cursorGuide', style: { left: cusrorPosition } }),
        reframe != null && getMarkers(viewStart, viewEnd, reframe.anchor, reframe.shift, false),
        shiftEnd != null && getMarkers(viewStart, viewEnd, viewEnd, shiftEnd, true),
        shiftStart != null && getMarkers(viewStart, viewEnd, viewStart, shiftStart, true)
      );
    }
  }]);

  return TimelineViewingLayer;
}(React.PureComponent);

exports.default = TimelineViewingLayer;