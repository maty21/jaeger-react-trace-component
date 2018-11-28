'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _renderIntoCanvas = require('./render-into-canvas');

var _renderIntoCanvas2 = _interopRequireDefault(_renderIntoCanvas);

var _colorGenerator = require('../../../utils/color-generator');

var _colorGenerator2 = _interopRequireDefault(_colorGenerator);

require('./CanvasSpanGraph.css');

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

var getColor = function getColor(str) {
  return _colorGenerator2.default.getRgbColorByKey(str);
};

var CanvasSpanGraph = function (_React$PureComponent) {
  _inherits(CanvasSpanGraph, _React$PureComponent);

  function CanvasSpanGraph(props) {
    _classCallCheck(this, CanvasSpanGraph);

    var _this = _possibleConstructorReturn(this, (CanvasSpanGraph.__proto__ || Object.getPrototypeOf(CanvasSpanGraph)).call(this, props));

    _this._setCanvasRef = function (elm) {
      _this._canvasElm = elm;
    };

    _this._canvasElm = undefined;
    return _this;
  }

  _createClass(CanvasSpanGraph, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._draw();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._draw();
    }
  }, {
    key: '_draw',
    value: function _draw() {
      if (this._canvasElm) {
        var _props = this.props,
            totalValueWidth = _props.valueWidth,
            items = _props.items;

        (0, _renderIntoCanvas2.default)(this._canvasElm, items, totalValueWidth, getColor);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('canvas', { className: 'CanvasSpanGraph', ref: this._setCanvasRef });
    }
  }]);

  return CanvasSpanGraph;
}(React.PureComponent);

exports.default = CanvasSpanGraph;