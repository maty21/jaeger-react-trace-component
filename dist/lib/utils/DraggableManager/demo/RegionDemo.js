'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DraggableManager = require('../../DraggableManager');

var _DraggableManager2 = _interopRequireDefault(_DraggableManager);

require('./RegionDemo.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var RegionDemo = function (_React$PureComponent) {
  _inherits(RegionDemo, _React$PureComponent);

  function RegionDemo(props) {
    _classCallCheck(this, RegionDemo);

    var _this = _possibleConstructorReturn(this, (RegionDemo.__proto__ || Object.getPrototypeOf(RegionDemo)).call(this, props));

    _this._setRealm = function (elm) {
      _this._realmElm = elm;
    };

    _this._getDraggingBounds = function () {
      if (!_this._realmElm) {
        throw new Error('invalid state');
      }

      var _this$_realmElm$getBo = _this._realmElm.getBoundingClientRect(),
          clientXLeft = _this$_realmElm$getBo.left,
          width = _this$_realmElm$getBo.width;

      return {
        clientXLeft: clientXLeft,
        width: width,
        maxValue: 1,
        minValue: 0
      };
    };

    _this._handleMouseMove = function (_ref) {
      var value = _ref.value;

      _this.props.updateState({ regionCursor: value });
    };

    _this._handleMouseLeave = function () {
      _this.props.updateState({ regionCursor: null });
    };

    _this._handleDragUpdate = function (_ref2) {
      var value = _ref2.value;
      var prevRegionDragging = _this.props.regionDragging;

      var regionDragging = void 0;
      if (prevRegionDragging) {
        regionDragging = [prevRegionDragging[0], value];
      } else {
        regionDragging = [value, value];
      }
      _this.props.updateState({ regionDragging: regionDragging });
    };

    _this._handleDragEnd = function (_ref3) {
      var value = _ref3.value;

      _this.props.updateState({ regionDragging: null, regionCursor: value });
    };

    _this._realmElm = null;

    _this._dragManager = new _DraggableManager2.default({
      getBounds: _this._getDraggingBounds,
      onDragEnd: _this._handleDragEnd,
      onDragMove: _this._handleDragUpdate,
      onDragStart: _this._handleDragUpdate,
      onMouseMove: _this._handleMouseMove,
      onMouseLeave: _this._handleMouseLeave
    });
    return _this;
  }

  _createClass(RegionDemo, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          regionCursor = _props.regionCursor,
          regionDragging = _props.regionDragging;

      var cursorElm = void 0;
      var regionElm = void 0;
      if (regionDragging) {
        var _regionDragging = _slicedToArray(regionDragging, 2),
            a = _regionDragging[0],
            b = _regionDragging[1];

        var _ref4 = a < b ? [a, 1 - b] : [b, 1 - a],
            _ref5 = _slicedToArray(_ref4, 2),
            left = _ref5[0],
            right = _ref5[1];

        var regionStyle = { left: left * 100 + '%', right: right * 100 + '%' };
        regionElm = _react2.default.createElement('div', { className: 'RegionDemo--region', style: regionStyle });
      } else if (regionCursor) {
        var cursorStyle = { left: regionCursor * 100 + '%' };
        cursorElm = _react2.default.createElement('div', { className: 'RegionDemo--regionCursor', style: cursorStyle });
      }
      return _react2.default.createElement(
        'div',
        {
          'aria-hidden': true,
          className: 'RegionDemo--realm',
          onMouseDown: this._dragManager.handleMouseDown,
          onMouseMove: this._dragManager.handleMouseMove,
          onMouseLeave: this._dragManager.handleMouseMove,
          ref: this._setRealm
        },
        regionElm,
        cursorElm
      );
    }
  }]);

  return RegionDemo;
}(_react2.default.PureComponent);

exports.default = RegionDemo;