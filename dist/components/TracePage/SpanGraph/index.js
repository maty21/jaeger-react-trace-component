'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _CanvasSpanGraph = require('./CanvasSpanGraph');

var _CanvasSpanGraph2 = _interopRequireDefault(_CanvasSpanGraph);

var _TickLabels = require('./TickLabels');

var _TickLabels2 = _interopRequireDefault(_TickLabels);

var _ViewingLayer = require('./ViewingLayer');

var _ViewingLayer2 = _interopRequireDefault(_ViewingLayer);

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

var TIMELINE_TICK_INTERVAL = 4;

/**
 * Store `items` in state so they are not regenerated every render. Otherwise,
 * the canvas graph will re-render itself every time.
 */

function getItem(span) {
  return {
    valueOffset: span.relativeStartTime,
    valueWidth: span.duration,
    serviceName: span.process.serviceName
  };
}

var SpanGraph = function (_React$PureComponent) {
  _inherits(SpanGraph, _React$PureComponent);

  function SpanGraph(props) {
    _classCallCheck(this, SpanGraph);

    var _this = _possibleConstructorReturn(this, (SpanGraph.__proto__ || Object.getPrototypeOf(SpanGraph)).call(this, props));

    var trace = props.trace;

    _this.state = {
      items: trace ? trace.spans.map(getItem) : []
    };
    return _this;
  }

  _createClass(SpanGraph, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var trace = nextProps.trace;

      if (this.props.trace !== trace) {
        this.setState({
          items: trace ? trace.spans.map(getItem) : []
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          height = _props.height,
          trace = _props.trace,
          viewRange = _props.viewRange,
          updateNextViewRangeTime = _props.updateNextViewRangeTime,
          updateViewRangeTime = _props.updateViewRangeTime;

      if (!trace) {
        return React.createElement('div', null);
      }
      var items = this.state.items;

      return React.createElement(
        'div',
        { className: 'ub-px2' },
        React.createElement(_TickLabels2.default, { numTicks: TIMELINE_TICK_INTERVAL, duration: trace.duration }),
        React.createElement(
          'div',
          { className: 'ub-relative' },
          React.createElement(_CanvasSpanGraph2.default, { valueWidth: trace.duration, items: items }),
          React.createElement(_ViewingLayer2.default, {
            viewRange: viewRange,
            numTicks: TIMELINE_TICK_INTERVAL,
            height: height,
            updateViewRangeTime: updateViewRangeTime,
            updateNextViewRangeTime: updateNextViewRangeTime
          })
        )
      );
    }
  }]);

  return SpanGraph;
}(React.PureComponent);

SpanGraph.defaultProps = {
  height: 60
};
exports.default = SpanGraph;