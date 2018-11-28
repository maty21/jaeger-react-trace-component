'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SpanDetail = require('./SpanDetail');

var _SpanDetail2 = _interopRequireDefault(_SpanDetail);

var _DetailState = require('./SpanDetail/DetailState');

var _DetailState2 = _interopRequireDefault(_DetailState);

var _SpanTreeOffset = require('./SpanTreeOffset');

var _SpanTreeOffset2 = _interopRequireDefault(_SpanTreeOffset);

var _TimelineRow = require('./TimelineRow');

var _TimelineRow2 = _interopRequireDefault(_TimelineRow);

require('./SpanDetailRow.css');

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

var SpanDetailRow = function (_React$PureComponent) {
  _inherits(SpanDetailRow, _React$PureComponent);

  function SpanDetailRow() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SpanDetailRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SpanDetailRow.__proto__ || Object.getPrototypeOf(SpanDetailRow)).call.apply(_ref, [this].concat(args))), _this), _this._detailToggle = function () {
      _this.props.onDetailToggled(_this.props.span.spanID);
    }, _this._linksGetter = function (items, itemIndex) {
      var _this$props = _this.props,
          linksGetter = _this$props.linksGetter,
          span = _this$props.span;

      return linksGetter ? linksGetter(span, items, itemIndex) : [];
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SpanDetailRow, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          color = _props.color,
          columnDivision = _props.columnDivision,
          detailState = _props.detailState,
          logItemToggle = _props.logItemToggle,
          logsToggle = _props.logsToggle,
          processToggle = _props.processToggle,
          span = _props.span,
          tagsToggle = _props.tagsToggle,
          traceStartTime = _props.traceStartTime;

      return _react2.default.createElement(
        _TimelineRow2.default,
        { className: 'detail-row' },
        _react2.default.createElement(
          _TimelineRow2.default.Cell,
          { width: columnDivision },
          _react2.default.createElement(_SpanTreeOffset2.default, { level: span.depth + 1 }),
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement('span', {
              className: 'detail-row-expanded-accent',
              'aria-checked': 'true',
              onClick: this._detailToggle,
              role: 'switch',
              style: { borderColor: color }
            })
          )
        ),
        _react2.default.createElement(
          _TimelineRow2.default.Cell,
          { width: 1 - columnDivision },
          _react2.default.createElement(
            'div',
            { className: 'detail-info-wrapper', style: { borderTopColor: color } },
            _react2.default.createElement(_SpanDetail2.default, {
              detailState: detailState,
              linksGetter: this._linksGetter,
              logItemToggle: logItemToggle,
              logsToggle: logsToggle,
              processToggle: processToggle,
              span: span,
              tagsToggle: tagsToggle,
              traceStartTime: traceStartTime
            })
          )
        )
      );
    }
  }]);

  return SpanDetailRow;
}(_react2.default.PureComponent);

exports.default = SpanDetailRow;