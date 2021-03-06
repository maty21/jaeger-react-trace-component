'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DividerDemo = require('./DividerDemo');

var _DividerDemo2 = _interopRequireDefault(_DividerDemo);

var _RegionDemo = require('./RegionDemo');

var _RegionDemo2 = _interopRequireDefault(_RegionDemo);

require('./DraggableManagerDemo.css');

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

var DraggableManagerDemo = function (_React$PureComponent) {
  _inherits(DraggableManagerDemo, _React$PureComponent);

  function DraggableManagerDemo(props) {
    _classCallCheck(this, DraggableManagerDemo);

    var _this = _possibleConstructorReturn(this, (DraggableManagerDemo.__proto__ || Object.getPrototypeOf(DraggableManagerDemo)).call(this, props));

    _this._udpateState = function (nextState) {
      _this.setState(nextState);
    };

    _this.state = {
      dividerPosition: 0.25,
      regionCursor: null,
      regionDragging: null
    };
    return _this;
  }

  _createClass(DraggableManagerDemo, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          dividerPosition = _state.dividerPosition,
          regionCursor = _state.regionCursor,
          regionDragging = _state.regionDragging;

      return _react2.default.createElement(
        'div',
        { className: 'DraggableManagerDemo' },
        _react2.default.createElement(
          'h1',
          null,
          'DraggableManager demo'
        ),
        _react2.default.createElement(
          'section',
          { className: 'DraggableManagerDemo--scenario' },
          _react2.default.createElement(
            'h2',
            null,
            'Dragging a Divider'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Click and drag the gray divider in the colored area, below.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Value: ',
            dividerPosition.toFixed(3)
          ),
          _react2.default.createElement(
            'div',
            { className: 'DraggableManagerDemo--realm' },
            _react2.default.createElement(_DividerDemo2.default, { position: dividerPosition, updateState: this._udpateState })
          )
        ),
        _react2.default.createElement(
          'section',
          { className: 'DraggableManagerDemo--scenario' },
          _react2.default.createElement(
            'h2',
            null,
            'Dragging a Sub-Region'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Click and drag horizontally somewhere in the colored area, below.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Value: ',
            regionDragging && regionDragging.map(function (n) {
              return n.toFixed(3);
            }).join(', ')
          ),
          _react2.default.createElement(
            'div',
            { className: 'DraggableManagerDemo--realm' },
            _react2.default.createElement(_RegionDemo2.default, {
              regionCursor: regionCursor,
              regionDragging: regionDragging,
              updateState: this._udpateState
            })
          )
        )
      );
    }
  }]);

  return DraggableManagerDemo;
}(_react2.default.PureComponent);

exports.default = DraggableManagerDemo;