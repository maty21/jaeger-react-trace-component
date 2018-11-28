'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dragTypes = undefined;

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

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _GraphTicks = require('./GraphTicks');

var _GraphTicks2 = _interopRequireDefault(_GraphTicks);

var _Scrubber = require('./Scrubber');

var _Scrubber2 = _interopRequireDefault(_Scrubber);

var _DraggableManager = require('../../../utils/DraggableManager');

var _DraggableManager2 = _interopRequireDefault(_DraggableManager);

require('./ViewingLayer.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Designate the tags for the different dragging managers. Exported for tests.
 */
var dragTypes = exports.dragTypes = {
  /**
   * Tag for dragging the right scrubber, e.g. end of the current view range.
   */
  SHIFT_END: 'SHIFT_END',
  /**
   * Tag for dragging the left scrubber, e.g. start of the current view range.
   */
  SHIFT_START: 'SHIFT_START',
  /**
   * Tag for dragging a new view range.
   */
  REFRAME: 'REFRAME'
};

/**
 * Returns the layout information for drawing the view-range differential, e.g.
 * show what will change when the mouse is released. Basically, this is the
 * difference from the start of the drag to the current position.
 *
 * @returns {{ x: string, width: string, leadginX: string }}
 */
function getNextViewLayout(start, position) {
  var _ref = start < position ? [start, position] : [position, start],
      _ref2 = _slicedToArray(_ref, 2),
      left = _ref2[0],
      right = _ref2[1];

  return {
    x: left * 100 + '%',
    width: (right - left) * 100 + '%',
    leadingX: position * 100 + '%'
  };
}

/**
 * `ViewingLayer` is rendered on top of the Canvas rendering of the minimap and
 * handles showing the current view range and handles mouse UX for modifying it.
 */

var ViewingLayer = function (_React$PureComponent) {
  _inherits(ViewingLayer, _React$PureComponent);

  /**
   * `_draggerReframe` handles clicking and dragging on the `ViewingLayer` to
   * redefined the view range.
   */

  /**
   * `_draggerStart` handles dragging the left scrubber to adjust the start of
   * the view range.
   */

  /**
   * `_draggerEnd` handles dragging the right scrubber to adjust the end of
   * the view range.
   */

  function ViewingLayer(props) {
    _classCallCheck(this, ViewingLayer);

    var _this = _possibleConstructorReturn(this, (ViewingLayer.__proto__ || Object.getPrototypeOf(ViewingLayer)).call(this, props));

    _this._setRoot = function (elm) {
      _this._root = elm;
    };

    _this._getDraggingBounds = function (tag) {
      if (!_this._root) {
        throw new Error('invalid state');
      }

      var _this$_root$getBoundi = _this._root.getBoundingClientRect(),
          clientXLeft = _this$_root$getBoundi.left,
          width = _this$_root$getBoundi.width;

      var _this$props$viewRange = _slicedToArray(_this.props.viewRange.time.current, 2),
          viewStart = _this$props$viewRange[0],
          viewEnd = _this$props$viewRange[1];

      var maxValue = 1;
      var minValue = 0;
      if (tag === dragTypes.SHIFT_START) {
        maxValue = viewEnd;
      } else if (tag === dragTypes.SHIFT_END) {
        minValue = viewStart;
      }
      return { clientXLeft: clientXLeft, maxValue: maxValue, minValue: minValue, width: width };
    };

    _this._handleReframeMouseMove = function (_ref3) {
      var value = _ref3.value;

      _this.props.updateNextViewRangeTime({ cursor: value });
    };

    _this._handleReframeMouseLeave = function () {
      _this.props.updateNextViewRangeTime({ cursor: null });
    };

    _this._handleReframeDragUpdate = function (_ref4) {
      var value = _ref4.value;

      var shift = value;
      var time = _this.props.viewRange.time;

      var anchor = time.reframe ? time.reframe.anchor : shift;
      var update = { reframe: { anchor: anchor, shift: shift } };
      _this.props.updateNextViewRangeTime(update);
    };

    _this._handleReframeDragEnd = function (_ref5) {
      var manager = _ref5.manager,
          value = _ref5.value;
      var time = _this.props.viewRange.time;

      var anchor = time.reframe ? time.reframe.anchor : value;

      var _ref6 = value < anchor ? [value, anchor] : [anchor, value],
          _ref7 = _slicedToArray(_ref6, 2),
          start = _ref7[0],
          end = _ref7[1];

      manager.resetBounds();
      _this.props.updateViewRangeTime(start, end, 'minimap');
    };

    _this._handleScrubberEnterLeave = function (_ref8) {
      var type = _ref8.type;

      var preventCursorLine = type === _DraggableManager.updateTypes.MOUSE_ENTER;
      _this.setState({ preventCursorLine: preventCursorLine });
    };

    _this._handleScrubberDragUpdate = function (_ref9) {
      var event = _ref9.event,
          tag = _ref9.tag,
          type = _ref9.type,
          value = _ref9.value;

      if (type === _DraggableManager.updateTypes.DRAG_START) {
        event.stopPropagation();
      }
      if (tag === dragTypes.SHIFT_START) {
        _this.props.updateNextViewRangeTime({ shiftStart: value });
      } else if (tag === dragTypes.SHIFT_END) {
        _this.props.updateNextViewRangeTime({ shiftEnd: value });
      }
    };

    _this._handleScrubberDragEnd = function (_ref10) {
      var manager = _ref10.manager,
          tag = _ref10.tag,
          value = _ref10.value;

      var _this$props$viewRange2 = _slicedToArray(_this.props.viewRange.time.current, 2),
          viewStart = _this$props$viewRange2[0],
          viewEnd = _this$props$viewRange2[1];

      var update = void 0;
      if (tag === dragTypes.SHIFT_START) {
        update = [value, viewEnd];
      } else if (tag === dragTypes.SHIFT_END) {
        update = [viewStart, value];
      } else {
        // to satisfy flow
        throw new Error('bad state');
      }
      manager.resetBounds();
      _this.setState({ preventCursorLine: false });
      _this.props.updateViewRangeTime(update[0], update[1], 'minimap');
    };

    _this._draggerReframe = new _DraggableManager2.default({
      getBounds: _this._getDraggingBounds,
      onDragEnd: _this._handleReframeDragEnd,
      onDragMove: _this._handleReframeDragUpdate,
      onDragStart: _this._handleReframeDragUpdate,
      onMouseMove: _this._handleReframeMouseMove,
      onMouseLeave: _this._handleReframeMouseLeave,
      tag: dragTypes.REFRAME
    });

    _this._draggerStart = new _DraggableManager2.default({
      getBounds: _this._getDraggingBounds,
      onDragEnd: _this._handleScrubberDragEnd,
      onDragMove: _this._handleScrubberDragUpdate,
      onDragStart: _this._handleScrubberDragUpdate,
      onMouseEnter: _this._handleScrubberEnterLeave,
      onMouseLeave: _this._handleScrubberEnterLeave,
      tag: dragTypes.SHIFT_START
    });

    _this._draggerEnd = new _DraggableManager2.default({
      getBounds: _this._getDraggingBounds,
      onDragEnd: _this._handleScrubberDragEnd,
      onDragMove: _this._handleScrubberDragUpdate,
      onDragStart: _this._handleScrubberDragUpdate,
      onMouseEnter: _this._handleScrubberEnterLeave,
      onMouseLeave: _this._handleScrubberEnterLeave,
      tag: dragTypes.SHIFT_END
    });

    _this._root = undefined;
    _this.state = {
      preventCursorLine: false
    };
    return _this;
  }

  _createClass(ViewingLayer, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._draggerReframe.dispose();
      this._draggerEnd.dispose();
      this._draggerStart.dispose();
    }
  }, {
    key: '_getMarkers',


    /**
     * Randers the difference between where the drag started and the current
     * position, e.g. the red or blue highlight.
     *
     * @returns React.Node[]
     */
    value: function _getMarkers(from, to, isShift) {
      var layout = getNextViewLayout(from, to);
      var cls = (0, _classnames2.default)({
        isShiftDrag: isShift,
        isReframeDrag: !isShift
      });
      return [React.createElement('rect', {
        key: 'fill',
        className: 'ViewingLayer--draggedShift ' + cls,
        x: layout.x,
        y: '0',
        width: layout.width,
        height: this.props.height - 2
      }), React.createElement('rect', {
        key: 'edge',
        className: 'ViewingLayer--draggedEdge ' + cls,
        x: layout.leadingX,
        y: '0',
        width: '1',
        height: this.props.height - 2
      })];
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          height = _props.height,
          viewRange = _props.viewRange,
          numTicks = _props.numTicks;
      var preventCursorLine = this.state.preventCursorLine;
      var _viewRange$time = viewRange.time,
          current = _viewRange$time.current,
          cursor = _viewRange$time.cursor,
          shiftStart = _viewRange$time.shiftStart,
          shiftEnd = _viewRange$time.shiftEnd,
          reframe = _viewRange$time.reframe;

      var haveNextTimeRange = shiftStart != null || shiftEnd != null || reframe != null;

      var _current = _slicedToArray(current, 2),
          viewStart = _current[0],
          viewEnd = _current[1];

      var leftInactive = 0;
      if (viewStart) {
        leftInactive = viewStart * 100;
      }
      var rightInactive = 100;
      if (viewEnd) {
        rightInactive = 100 - viewEnd * 100;
      }
      var cursorPosition = void 0;
      if (!haveNextTimeRange && cursor != null && !preventCursorLine) {
        cursorPosition = cursor * 100 + '%';
      }

      return React.createElement(
        'div',
        { 'aria-hidden': true, className: 'ViewingLayer', style: { height: height } },
        React.createElement(
          'svg',
          {
            height: height,
            className: 'ViewingLayer--graph',
            ref: this._setRoot,
            onMouseDown: this._draggerReframe.handleMouseDown,
            onMouseLeave: this._draggerReframe.handleMouseLeave,
            onMouseMove: this._draggerReframe.handleMouseMove
          },
          leftInactive > 0 && React.createElement('rect', { x: 0, y: 0, height: '100%', width: leftInactive + '%', className: 'ViewingLayer--inactive' }),
          rightInactive > 0 && React.createElement('rect', {
            x: 100 - rightInactive + '%',
            y: 0,
            height: '100%',
            width: rightInactive + '%',
            className: 'ViewingLayer--inactive'
          }),
          React.createElement(_GraphTicks2.default, { numTicks: numTicks }),
          cursorPosition && React.createElement('line', {
            className: 'ViewingLayer--cursorGuide',
            x1: cursorPosition,
            y1: '0',
            x2: cursorPosition,
            y2: height - 2,
            strokeWidth: '1'
          }),
          shiftStart != null && this._getMarkers(viewStart, shiftStart, true),
          shiftEnd != null && this._getMarkers(viewEnd, shiftEnd, true),
          React.createElement(_Scrubber2.default, {
            isDragging: shiftStart != null,
            onMouseDown: this._draggerStart.handleMouseDown,
            onMouseEnter: this._draggerStart.handleMouseEnter,
            onMouseLeave: this._draggerStart.handleMouseLeave,
            position: viewStart || 0
          }),
          React.createElement(_Scrubber2.default, {
            isDragging: shiftEnd != null,
            position: viewEnd || 1,
            onMouseDown: this._draggerEnd.handleMouseDown,
            onMouseEnter: this._draggerEnd.handleMouseEnter,
            onMouseLeave: this._draggerEnd.handleMouseLeave
          }),
          reframe != null && this._getMarkers(reframe.anchor, reframe.shift, false)
        ),
        haveNextTimeRange && React.createElement('div', { className: 'ViewingLayer--fullOverlay' })
      );
    }
  }]);

  return ViewingLayer;
}(React.PureComponent);

exports.default = ViewingLayer;