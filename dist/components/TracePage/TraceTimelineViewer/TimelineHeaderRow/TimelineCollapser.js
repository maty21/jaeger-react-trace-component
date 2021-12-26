'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

require('./TimelineCollapser.css');

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

function getTitle(value) {
  return _react2.default.createElement(
    'span',
    { className: 'TimelineCollapser--tooltipTitle' },
    value
  );
}

var TimelineCollapser = function (_React$PureComponent) {
  _inherits(TimelineCollapser, _React$PureComponent);

  function TimelineCollapser(props) {
    _classCallCheck(this, TimelineCollapser);

    var _this = _possibleConstructorReturn(this, (TimelineCollapser.__proto__ || Object.getPrototypeOf(TimelineCollapser)).call(this, props));

    _this.getContainer = function () {
      return _this.containerRef.current;
    };

    _this.containerRef = _react2.default.createRef();
    return _this;
  }

  _createClass(TimelineCollapser, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          onExpandAll = _props.onExpandAll,
          onExpandOne = _props.onExpandOne,
          onCollapseAll = _props.onCollapseAll,
          onCollapseOne = _props.onCollapseOne;

      return _react2.default.createElement(
        'div',
        { className: 'TimelineCollapser', ref: this.containerRef },
        _react2.default.createElement(
          _antd.Tooltip,
          { title: getTitle('Expand +1'), getPopupContainer: this.getContainer },
          _react2.default.createElement(_antd.Icon, { type: 'right', onClick: onExpandOne, className: 'TimelineCollapser--btn-expand' })
        ),
        _react2.default.createElement(
          _antd.Tooltip,
          { title: getTitle('Collapse +1'), getPopupContainer: this.getContainer },
          _react2.default.createElement(_antd.Icon, { type: 'right', onClick: onCollapseOne, className: 'TimelineCollapser--btn' })
        ),
        _react2.default.createElement(
          _antd.Tooltip,
          { title: getTitle('Expand All'), getPopupContainer: this.getContainer },
          _react2.default.createElement(_antd.Icon, { type: 'double-right', onClick: onExpandAll, className: 'TimelineCollapser--btn-expand' })
        ),
        _react2.default.createElement(
          _antd.Tooltip,
          { title: getTitle('Collapse All'), getPopupContainer: this.getContainer },
          _react2.default.createElement(_antd.Icon, { type: 'double-right', onClick: onCollapseAll, className: 'TimelineCollapser--btn' })
        )
      );
    }
  }]);

  return TimelineCollapser;
}(_react2.default.PureComponent);

exports.default = TimelineCollapser;