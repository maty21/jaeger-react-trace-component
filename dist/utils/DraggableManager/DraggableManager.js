'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //      

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

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _updateTypes = require('./update-types');

var _updateTypes2 = _interopRequireDefault(_updateTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LEFT_MOUSE_BUTTON = 0;

var DraggableManager = function () {
  // cache the last known DraggableBounds (invalidate via `#resetBounds())


  // optional callbacks for various dragging events


  // whether to reset the bounds on window resize


  /**
   * Get the `DraggableBounds` for the current drag. The returned value is
   * cached until either `#resetBounds()` is called or the window is resized
   * (assuming `_resetBoundsOnResize` is `true`). The `DraggableBounds` defines
   * the range the current drag can span to. It also establishes the left offset
   * to adjust `clientX` by (from the `MouseEvent`s).
   */

  // convenience data


  // handlers for integration with DOM elements


  function DraggableManager(_ref) {
    var _this = this;

    var getBounds = _ref.getBounds,
        tag = _ref.tag,
        _ref$resetBoundsOnRes = _ref.resetBoundsOnResize,
        resetBoundsOnResize = _ref$resetBoundsOnRes === undefined ? true : _ref$resetBoundsOnRes,
        rest = _objectWithoutProperties(_ref, ['getBounds', 'tag', 'resetBoundsOnResize']);

    _classCallCheck(this, DraggableManager);

    this.resetBounds = function () {
      _this._bounds = undefined;
    };

    this._handleMinorMouseEvent = function (event) {
      var button = event.button,
          clientX = event.clientX,
          eventType = event.type;

      if (_this._isDragging || button !== LEFT_MOUSE_BUTTON) {
        return;
      }
      var type = '';
      var handler = void 0;
      if (eventType === 'mouseenter') {
        type = _updateTypes2.default.MOUSE_ENTER;
        handler = _this._onMouseEnter;
      } else if (eventType === 'mouseleave') {
        type = _updateTypes2.default.MOUSE_LEAVE;
        handler = _this._onMouseLeave;
      } else if (eventType === 'mousemove') {
        type = _updateTypes2.default.MOUSE_MOVE;
        handler = _this._onMouseMove;
      } else {
        throw new Error('invalid event type: ' + eventType);
      }
      if (!handler) {
        return;
      }

      var _getPosition2 = _this._getPosition(clientX),
          value = _getPosition2.value,
          x = _getPosition2.x;

      handler({
        event: event,
        type: type,
        value: value,
        x: x,
        manager: _this,
        tag: _this.tag
      });
    };

    this._handleDragEvent = function (event) {
      var button = event.button,
          clientX = event.clientX,
          eventType = event.type;

      var type = '';
      var handler = void 0;
      if (eventType === 'mousedown') {
        if (_this._isDragging || button !== LEFT_MOUSE_BUTTON) {
          return;
        }
        window.addEventListener('mousemove', _this._handleDragEvent);
        window.addEventListener('mouseup', _this._handleDragEvent);
        var style = (0, _get3.default)(document, 'body.style');
        if (style) {
          style.userSelect = 'none';
        }
        _this._isDragging = true;

        type = _updateTypes2.default.DRAG_START;
        handler = _this._onDragStart;
      } else if (eventType === 'mousemove') {
        if (!_this._isDragging) {
          return;
        }
        type = _updateTypes2.default.DRAG_MOVE;
        handler = _this._onDragMove;
      } else if (eventType === 'mouseup') {
        if (!_this._isDragging) {
          return;
        }
        _this._stopDragging();
        type = _updateTypes2.default.DRAG_END;
        handler = _this._onDragEnd;
      } else {
        throw new Error('invalid event type: ' + eventType);
      }
      if (!handler) {
        return;
      }

      var _getPosition3 = _this._getPosition(clientX),
          value = _getPosition3.value,
          x = _getPosition3.x;

      handler({
        event: event,
        type: type,
        value: value,
        x: x,
        manager: _this,
        tag: _this.tag
      });
    };

    this.handleMouseDown = this._handleDragEvent;
    this.handleMouseEnter = this._handleMinorMouseEvent;
    this.handleMouseMove = this._handleMinorMouseEvent;
    this.handleMouseLeave = this._handleMinorMouseEvent;

    this.getBounds = getBounds;
    this.tag = tag;
    this._isDragging = false;
    this._bounds = undefined;
    this._resetBoundsOnResize = Boolean(resetBoundsOnResize);
    if (this._resetBoundsOnResize) {
      window.addEventListener('resize', this.resetBounds);
    }
    this._onMouseEnter = rest.onMouseEnter;
    this._onMouseLeave = rest.onMouseLeave;
    this._onMouseMove = rest.onMouseMove;
    this._onDragStart = rest.onDragStart;
    this._onDragMove = rest.onDragMove;
    this._onDragEnd = rest.onDragEnd;
  }

  _createClass(DraggableManager, [{
    key: '_getBounds',
    value: function _getBounds() {
      if (!this._bounds) {
        this._bounds = this.getBounds(this.tag);
      }
      return this._bounds;
    }
  }, {
    key: '_getPosition',
    value: function _getPosition(clientX) {
      var _getBounds2 = this._getBounds(),
          clientXLeft = _getBounds2.clientXLeft,
          maxValue = _getBounds2.maxValue,
          minValue = _getBounds2.minValue,
          width = _getBounds2.width;

      var x = clientX - clientXLeft;
      var value = x / width;
      if (minValue != null && value < minValue) {
        value = minValue;
        x = minValue * width;
      } else if (maxValue != null && value > maxValue) {
        value = maxValue;
        x = maxValue * width;
      }
      return { value: value, x: x };
    }
  }, {
    key: '_stopDragging',
    value: function _stopDragging() {
      window.removeEventListener('mousemove', this._handleDragEvent);
      window.removeEventListener('mouseup', this._handleDragEvent);
      var style = (0, _get3.default)(document, 'body.style');
      if (style) {
        style.userSelect = null;
      }
      this._isDragging = false;
    }
  }, {
    key: 'isDragging',
    value: function isDragging() {
      return this._isDragging;
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      if (this._isDragging) {
        this._stopDragging();
      }
      if (this._resetBoundsOnResize) {
        window.removeEventListener('resize', this.resetBounds);
      }
      this._bounds = undefined;
      this._onMouseEnter = undefined;
      this._onMouseLeave = undefined;
      this._onMouseMove = undefined;
      this._onDragStart = undefined;
      this._onDragMove = undefined;
      this._onDragEnd = undefined;
    }
  }]);

  return DraggableManager;
}();

exports.default = DraggableManager;