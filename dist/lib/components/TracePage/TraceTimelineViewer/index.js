'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TraceTimelineViewerImpl = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _duck = require('./duck');

var _TimelineHeaderRow = require('./TimelineHeaderRow');

var _TimelineHeaderRow2 = _interopRequireDefault(_TimelineHeaderRow);

var _VirtualizedTraceView = require('./VirtualizedTraceView');

var _VirtualizedTraceView2 = _interopRequireDefault(_VirtualizedTraceView);

var _keyboardShortcuts = require('../keyboard-shortcuts');

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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

var NUM_TICKS = 5;

/**
 * `TraceTimelineViewer` now renders the header row because it is sensitive to
 * `props.viewRange.time.cursor`. If `VirtualizedTraceView` renders it, it will
 * re-render the ListView every time the cursor is moved on the trace minimap
 * or `TimelineHeaderRow`.
 */

var TraceTimelineViewerImpl = exports.TraceTimelineViewerImpl = function (_React$PureComponent) {
  _inherits(TraceTimelineViewerImpl, _React$PureComponent);

  function TraceTimelineViewerImpl() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TraceTimelineViewerImpl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TraceTimelineViewerImpl.__proto__ || Object.getPrototypeOf(TraceTimelineViewerImpl)).call.apply(_ref, [this].concat(args))), _this), _this.collapseAll = function () {
      _duck.actions.collapseAll(_this.props.trace.spans);
    }, _this.collapseOne = function () {
      _duck.actions.collapseOne(_this.props.trace.spans);
    }, _this.expandAll = function () {
      _duck.actions.expandAll();
    }, _this.expandOne = function () {
      _duck.actions.expandOne(_this.props.trace.spans);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TraceTimelineViewerImpl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _keyboardShortcuts.merge)({
        collapseAll: this.collapseAll,
        expandAll: this.expandAll,
        collapseOne: this.collapseOne,
        expandOne: this.expandOne
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          setSpanNameColumnWidth = _props.setSpanNameColumnWidth,
          updateNextViewRangeTime = _props.updateNextViewRangeTime,
          updateViewRangeTime = _props.updateViewRangeTime,
          viewRange = _props.viewRange,
          rest = _objectWithoutProperties(_props, ['setSpanNameColumnWidth', 'updateNextViewRangeTime', 'updateViewRangeTime', 'viewRange']);

      var spanNameColumnWidth = rest.spanNameColumnWidth,
          trace = rest.trace;


      return _react2.default.createElement(
        'div',
        { className: 'TraceTimelineViewer' },
        _react2.default.createElement(_TimelineHeaderRow2.default, {
          duration: trace.duration,
          nameColumnWidth: spanNameColumnWidth,
          numTicks: NUM_TICKS,
          onCollapseAll: this.collapseAll,
          onCollapseOne: this.collapseOne,
          onColummWidthChange: setSpanNameColumnWidth,
          onExpandAll: this.expandAll,
          onExpandOne: this.expandOne,
          viewRangeTime: viewRange.time,
          updateNextViewRangeTime: updateNextViewRangeTime,
          updateViewRangeTime: updateViewRangeTime
        }),
        _react2.default.createElement(_VirtualizedTraceView2.default, _extends({}, rest, { currentViewRangeTime: viewRange.time.current }))
      );
    }
  }]);

  return TraceTimelineViewerImpl;
}(_react2.default.PureComponent);

function mapStateToProps(state, ownProps) {
  var spanNameColumnWidth = state.traceTimeline.spanNameColumnWidth;
  return _extends({ spanNameColumnWidth: spanNameColumnWidth }, ownProps);
}

function mapDispatchToProps(dispatch) {
  var _bindActionCreators = (0, _redux.bindActionCreators)(_duck.actions, dispatch),
      setSpanNameColumnWidth = _bindActionCreators.setSpanNameColumnWidth,
      expandAll = _bindActionCreators.expandAll,
      expandOne = _bindActionCreators.expandOne,
      collapseAll = _bindActionCreators.collapseAll,
      collapseOne = _bindActionCreators.collapseOne;

  return { setSpanNameColumnWidth: setSpanNameColumnWidth, expandAll: expandAll, expandOne: expandOne, collapseAll: collapseAll, collapseOne: collapseOne };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TraceTimelineViewerImpl);

//export default TraceTimelineViewerImpl;