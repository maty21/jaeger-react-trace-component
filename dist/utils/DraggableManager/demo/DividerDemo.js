'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DraggableManager = require('../../DraggableManager');

var _DraggableManager2 = _interopRequireDefault(_DraggableManager);

require('./DividerDemo.css');

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

var DividerDemo = function (_React$PureComponent) {
  _inherits(DividerDemo, _React$PureComponent);

  function DividerDemo(props) {
    _classCallCheck(this, DividerDemo);

    var _this = _possibleConstructorReturn(this, (DividerDemo.__proto__ || Object.getPrototypeOf(DividerDemo)).call(this, props));

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
        maxValue: 0.98,
        minValue: 0.02
      };
    };

    _this._handleDragEvent = function (_ref) {
      var value = _ref.value;

      _this.props.updateState({ dividerPosition: value });
    };

    _this._realmElm = null;

    _this._dragManager = new _DraggableManager2.default({
      getBounds: _this._getDraggingBounds,
      onDragEnd: _this._handleDragEvent,
      onDragMove: _this._handleDragEvent,
      onDragStart: _this._handleDragEvent
    });
    return _this;
  }

  _createClass(DividerDemo, [{
    key: 'render',
    value: function render() {
      var position = this.props.position;

      var style = { left: position * 100 + '%' };
      return _react2.default.createElement(
        'div',
        { className: 'DividerDemo--realm', ref: this._setRealm },
        _react2.default.createElement('div', {
          'aria-hidden': true,
          className: 'DividerDemo--divider',
          onMouseDown: this._dragManager.handleMouseDown,
          style: style
        })
      );
    }
  }]);

  return DividerDemo;
}(_react2.default.PureComponent);

exports.default = DividerDemo;