'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DraggableManager = require('../../../../utils/DraggableManager');

var _DraggableManager2 = _interopRequireDefault(_DraggableManager);

require('./TimelineColumnResizer.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //      

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

var TimelineColumnResizer = function (_React$PureComponent) {
  _inherits(TimelineColumnResizer, _React$PureComponent);

  function TimelineColumnResizer(props) {
    _classCallCheck(this, TimelineColumnResizer);

    var _this = _possibleConstructorReturn(this, (TimelineColumnResizer.__proto__ || Object.getPrototypeOf(TimelineColumnResizer)).call(this, props));

    _this._setRootElm = function (elm) {
      _this._rootElm = elm;
    };

    _this._getDraggingBounds = function () {
      if (!_this._rootElm) {
        throw new Error('invalid state');
      }

      var _this$_rootElm$getBou = _this._rootElm.getBoundingClientRect(),
          clientXLeft = _this$_rootElm$getBou.left,
          width = _this$_rootElm$getBou.width;

      var _this$props = _this.props,
          min = _this$props.min,
          max = _this$props.max;

      return {
        clientXLeft: clientXLeft,
        width: width,
        maxValue: max,
        minValue: min
      };
    };

    _this._handleDragUpdate = function (_ref) {
      var value = _ref.value;

      _this.setState({ dragPosition: value });
    };

    _this._handleDragEnd = function (_ref2) {
      var manager = _ref2.manager,
          value = _ref2.value;

      manager.resetBounds();
      _this.setState({ dragPosition: null });
      _this.props.onChange(value);
    };

    _this._dragManager = new _DraggableManager2.default({
      getBounds: _this._getDraggingBounds,
      onDragEnd: _this._handleDragEnd,
      onDragMove: _this._handleDragUpdate,
      onDragStart: _this._handleDragUpdate
    });
    _this._rootElm = undefined;
    _this.state = {
      dragPosition: null
    };
    return _this;
  }

  _createClass(TimelineColumnResizer, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._dragManager.dispose();
    }
  }, {
    key: 'render',
    value: function render() {
      var left = void 0;
      var draggerStyle = void 0;
      var wrapperCls = '';
      var dragPosition = this.state.dragPosition;

      if (this._dragManager.isDragging() && this._rootElm && dragPosition != null) {
        var position = this.props.position;

        wrapperCls = (0, _classnames2.default)({
          isDraggingLeft: dragPosition < position,
          isDraggingRight: dragPosition > position
        });
        left = dragPosition * 100 + '%';
        // Draw a highlight from the current dragged position back to the original
        // position, e.g. highlight the change. Draw the highlight via `left` and
        // `right` css styles (simpler than using `width`).
        var draggerLeft = Math.min(position, dragPosition) * 100 + '%';
        // subtract 1px for draggerRight to deal with the right border being off
        // by 1px when dragging left
        var draggerRight = 'calc(' + (1 - Math.max(position, dragPosition)) * 100 + '% - 1px)';
        draggerStyle = { left: draggerLeft, right: draggerRight };
      } else {
        var _position = this.props.position;

        left = _position * 100 + '%';
        draggerStyle = { left: left };
      }
      return React.createElement(
        'div',
        { className: 'TimelineColumnResizer', ref: this._setRootElm },
        React.createElement(
          'div',
          { className: 'TimelineColumnResizer--wrapper ' + wrapperCls, style: { left: left } },
          React.createElement('div', { className: 'TimelineColumnResizer--gripIcon' }),
          React.createElement('div', {
            'aria-hidden': true,
            className: 'TimelineColumnResizer--dragger',
            onMouseDown: this._dragManager.handleMouseDown,
            style: draggerStyle
          })
        )
      );
    }
  }]);

  return TimelineColumnResizer;
}(React.PureComponent);

exports.default = TimelineColumnResizer;