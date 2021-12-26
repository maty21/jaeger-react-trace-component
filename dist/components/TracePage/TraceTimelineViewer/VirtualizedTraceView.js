'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VirtualizedTraceViewImpl = exports.DEFAULT_HEIGHTS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); //      

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

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _duck = require('./duck');

var _ListView = require('./ListView');

var _ListView2 = _interopRequireDefault(_ListView);

var _SpanBarRow = require('./SpanBarRow');

var _SpanBarRow2 = _interopRequireDefault(_SpanBarRow);

var _DetailState = require('./SpanDetail/DetailState');

var _DetailState2 = _interopRequireDefault(_DetailState);

var _SpanDetailRow = require('./SpanDetailRow');

var _SpanDetailRow2 = _interopRequireDefault(_SpanDetailRow);

var _utils = require('./utils');

var _linkPatterns = require('../../../model/link-patterns');

var _linkPatterns2 = _interopRequireDefault(_linkPatterns);

var _colorGenerator = require('../../../utils/color-generator');

var _colorGenerator2 = _interopRequireDefault(_colorGenerator);

require('./VirtualizedTraceView.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// export for tests
var DEFAULT_HEIGHTS = exports.DEFAULT_HEIGHTS = {
  bar: 28,
  detail: 161,
  detailWithLogs: 197
};

var NUM_TICKS = 5;

function generateRowStates(spans, childrenHiddenIDs, detailStates) {
  if (!spans) {
    return [];
  }
  var collapseDepth = null;
  var rowStates = [];
  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];
    var spanID = span.spanID,
        depth = span.depth;

    var hidden = false;
    if (collapseDepth != null) {
      if (depth >= collapseDepth) {
        hidden = true;
      } else {
        collapseDepth = null;
      }
    }
    if (hidden) {
      continue;
    }
    if (childrenHiddenIDs.has(spanID)) {
      collapseDepth = depth + 1;
    }
    rowStates.push({
      span: span,
      isDetail: false,
      spanIndex: i
    });
    if (detailStates.has(spanID)) {
      rowStates.push({
        span: span,
        isDetail: true,
        spanIndex: i
      });
    }
  }
  return rowStates;
}

function getCssClasses(currentViewRange) {
  var _currentViewRange = _slicedToArray(currentViewRange, 2),
      zoomStart = _currentViewRange[0],
      zoomEnd = _currentViewRange[1];

  return (0, _classnames2.default)({
    'clipping-left': zoomStart > 0,
    'clipping-right': zoomEnd < 1
  });
}

// export from tests

var VirtualizedTraceViewImpl = exports.VirtualizedTraceViewImpl = function (_React$PureComponent) {
  _inherits(VirtualizedTraceViewImpl, _React$PureComponent);

  function VirtualizedTraceViewImpl(props) {
    _classCallCheck(this, VirtualizedTraceViewImpl);

    // keep "prop derivations" on the instance instead of calculating in
    // `.render()` to avoid recalculating in every invocation of `.renderRow()`
    var _this = _possibleConstructorReturn(this, (VirtualizedTraceViewImpl.__proto__ || Object.getPrototypeOf(VirtualizedTraceViewImpl)).call(this, props));

    _this.getViewRange = function () {
      return _this.props.currentViewRangeTime;
    };

    _this.getSearchedSpanIDs = function () {
      return _this.props.findMatchesIDs;
    };

    _this.getCollapsedChildren = function () {
      return _this.props.childrenHiddenIDs;
    };

    _this.mapRowIndexToSpanIndex = function (index) {
      return _this.rowStates[index].spanIndex;
    };

    _this.mapSpanIndexToRowIndex = function (index) {
      var max = _this.rowStates.length;
      for (var i = 0; i < max; i++) {
        var spanIndex = _this.rowStates[i].spanIndex;

        if (spanIndex === index) {
          return i;
        }
      }
      throw new Error('unable to find row for span index: ' + index);
    };

    _this.setListView = function (listView) {
      var isChanged = _this.listView !== listView;
      _this.listView = listView;
      if (listView && isChanged) {
        _this.props.registerAccessors(_this.getAccessors());
      }
    };

    _this.getKeyFromIndex = function (index) {
      var _this$rowStates$index = _this.rowStates[index],
          isDetail = _this$rowStates$index.isDetail,
          span = _this$rowStates$index.span;

      return span.spanID + '--' + (isDetail ? 'detail' : 'bar');
    };

    _this.getIndexFromKey = function (key) {
      var parts = key.split('--');
      var _spanID = parts[0];
      var _isDetail = parts[1] === 'detail';
      var max = _this.rowStates.length;
      for (var i = 0; i < max; i++) {
        var _this$rowStates$i = _this.rowStates[i],
            span = _this$rowStates$i.span,
            isDetail = _this$rowStates$i.isDetail;

        if (span.spanID === _spanID && isDetail === _isDetail) {
          return i;
        }
      }
      return -1;
    };

    _this.getRowHeight = function (index) {
      var _this$rowStates$index2 = _this.rowStates[index],
          span = _this$rowStates$index2.span,
          isDetail = _this$rowStates$index2.isDetail;

      if (!isDetail) {
        return DEFAULT_HEIGHTS.bar;
      }
      if (Array.isArray(span.logs) && span.logs.length) {
        return DEFAULT_HEIGHTS.detailWithLogs;
      }
      return DEFAULT_HEIGHTS.detail;
    };

    _this.linksGetter = function (span, items, itemIndex) {
      return (0, _linkPatterns2.default)(span, items, itemIndex);
    };

    _this.renderRow = function (key, style, index, attrs) {
      var _this$rowStates$index3 = _this.rowStates[index],
          isDetail = _this$rowStates$index3.isDetail,
          span = _this$rowStates$index3.span,
          spanIndex = _this$rowStates$index3.spanIndex;

      return isDetail ? _this.renderSpanDetailRow(span, key, style, attrs) : _this.renderSpanBarRow(span, spanIndex, key, style, attrs);
    };

    var currentViewRangeTime = props.currentViewRangeTime,
        childrenHiddenIDs = props.childrenHiddenIDs,
        detailStates = props.detailStates,
        trace = props.trace;

    _this.clippingCssClasses = getCssClasses(currentViewRangeTime);
    _this.rowStates = generateRowStates(trace.spans, childrenHiddenIDs, detailStates);

    var setTrace = props.setTrace;

    var traceID = trace ? trace.traceID : null;
    setTrace(traceID);
    return _this;
  }

  _createClass(VirtualizedTraceViewImpl, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      var _props = this.props,
          childrenHiddenIDs = _props.childrenHiddenIDs,
          detailStates = _props.detailStates,
          registerAccessors = _props.registerAccessors,
          trace = _props.trace,
          currentViewRangeTime = _props.currentViewRangeTime;
      var nextViewRangeTime = nextProps.currentViewRangeTime,
          nextHiddenIDs = nextProps.childrenHiddenIDs,
          nextDetailStates = nextProps.detailStates,
          nextRegisterAccessors = nextProps.registerAccessors,
          setTrace = nextProps.setTrace,
          nextTrace = nextProps.trace;

      if (trace !== nextTrace) {
        setTrace(nextTrace ? nextTrace.traceID : null);
      }
      if (trace !== nextTrace || childrenHiddenIDs !== nextHiddenIDs || detailStates !== nextDetailStates) {
        this.rowStates = nextTrace ? generateRowStates(nextTrace.spans, nextHiddenIDs, nextDetailStates) : [];
      }
      if (currentViewRangeTime !== nextViewRangeTime) {
        this.clippingCssClasses = getCssClasses(nextViewRangeTime);
      }
      if (this.listView && registerAccessors !== nextRegisterAccessors) {
        nextRegisterAccessors(this.getAccessors());
      }
    }
  }, {
    key: 'getAccessors',
    value: function getAccessors() {
      var lv = this.listView;
      if (!lv) {
        throw new Error('ListView unavailable');
      }
      return {
        getViewRange: this.getViewRange,
        getSearchedSpanIDs: this.getSearchedSpanIDs,
        getCollapsedChildren: this.getCollapsedChildren,
        getViewHeight: lv.getViewHeight,
        getBottomRowIndexVisible: lv.getBottomVisibleIndex,
        getTopRowIndexVisible: lv.getTopVisibleIndex,
        getRowPosition: lv.getRowPosition,
        mapRowIndexToSpanIndex: this.mapRowIndexToSpanIndex,
        mapSpanIndexToRowIndex: this.mapSpanIndexToRowIndex
      };
    }

    // use long form syntax to avert flow error
    // https://github.com/facebook/flow/issues/3076#issuecomment-290944051

  }, {
    key: 'renderSpanBarRow',
    value: function renderSpanBarRow(span, spanIndex, key, style, attrs) {
      var spanID = span.spanID;
      var serviceName = span.process.serviceName;
      var _props2 = this.props,
          childrenHiddenIDs = _props2.childrenHiddenIDs,
          childrenToggle = _props2.childrenToggle,
          currentViewRangeTime = _props2.currentViewRangeTime,
          detailStates = _props2.detailStates,
          detailToggle = _props2.detailToggle,
          findMatchesIDs = _props2.findMatchesIDs,
          spanNameColumnWidth = _props2.spanNameColumnWidth,
          trace = _props2.trace;

      var _currentViewRangeTime = _slicedToArray(currentViewRangeTime, 2),
          zoomStart = _currentViewRangeTime[0],
          zoomEnd = _currentViewRangeTime[1];
      // to avert flow error


      if (!trace) {
        return null;
      }
      var color = _colorGenerator2.default.getColorByKey(serviceName);
      var isCollapsed = childrenHiddenIDs.has(spanID);
      var isDetailExpanded = detailStates.has(spanID);
      var isMatchingFilter = Boolean(findMatchesIDs) && findMatchesIDs.has(spanID);
      var showErrorIcon = (0, _utils.isErrorSpan)(span) || isCollapsed && (0, _utils.spanContainsErredSpan)(trace.spans, spanIndex);
      var viewBounds = (0, _utils.getViewedBounds)({
        min: trace.startTime,
        max: trace.endTime,
        start: span.startTime,
        end: span.startTime + span.duration,
        viewStart: zoomStart,
        viewEnd: zoomEnd
      });

      // Check for direct child "server" span if the span is a "client" span.
      var rpc = null;
      if (isCollapsed) {
        var rpcSpan = (0, _utils.findServerChildSpan)(trace.spans.slice(spanIndex));
        if (rpcSpan) {
          var rpcViewBounds = (0, _utils.getViewedBounds)({
            min: trace.startTime,
            max: trace.endTime,
            start: rpcSpan.startTime,
            end: rpcSpan.startTime + rpcSpan.duration,
            viewStart: zoomStart,
            viewEnd: zoomEnd
          });
          rpc = {
            color: _colorGenerator2.default.getColorByKey(rpcSpan.process.serviceName),
            operationName: rpcSpan.operationName,
            serviceName: rpcSpan.process.serviceName,
            viewEnd: rpcViewBounds.end,
            viewStart: rpcViewBounds.start
          };
        }
      }
      return React.createElement(
        'div',
        _extends({ className: 'VirtualizedTraceView--row', key: key, style: style }, attrs),
        React.createElement(_SpanBarRow2.default, {
          className: this.clippingCssClasses,
          color: color,
          columnDivision: spanNameColumnWidth,
          depth: span.depth,
          label: (0, _utils.formatDuration)(span.duration),
          isChildrenExpanded: !isCollapsed,
          isDetailExpanded: isDetailExpanded,
          isMatchingFilter: isMatchingFilter,
          isParent: span.hasChildren,
          numTicks: NUM_TICKS,
          onDetailToggled: detailToggle,
          onChildrenToggled: childrenToggle,
          operationName: span.operationName,
          rpc: rpc,
          serviceName: span.process.serviceName,
          showErrorIcon: showErrorIcon,
          spanID: spanID,
          viewEnd: viewBounds.end,
          viewStart: viewBounds.start
        })
      );
    }
  }, {
    key: 'renderSpanDetailRow',
    value: function renderSpanDetailRow(span, key, style, attrs) {
      var spanID = span.spanID;
      var serviceName = span.process.serviceName;
      var _props3 = this.props,
          detailLogItemToggle = _props3.detailLogItemToggle,
          detailLogsToggle = _props3.detailLogsToggle,
          detailProcessToggle = _props3.detailProcessToggle,
          detailStates = _props3.detailStates,
          detailTagsToggle = _props3.detailTagsToggle,
          detailToggle = _props3.detailToggle,
          spanNameColumnWidth = _props3.spanNameColumnWidth,
          trace = _props3.trace;

      var detailState = detailStates.get(spanID);
      if (!trace || !detailState) {
        return null;
      }
      var color = _colorGenerator2.default.getColorByKey(serviceName);
      return React.createElement(
        'div',
        _extends({ className: 'VirtualizedTraceView--row', key: key, style: _extends({}, style, { zIndex: 1 }) }, attrs),
        React.createElement(_SpanDetailRow2.default, {
          color: color,
          columnDivision: spanNameColumnWidth,
          onDetailToggled: detailToggle,
          detailState: detailState,
          linksGetter: this.linksGetter,
          logItemToggle: detailLogItemToggle,
          logsToggle: detailLogsToggle,
          processToggle: detailProcessToggle,
          span: span,
          tagsToggle: detailTagsToggle,
          traceStartTime: trace.startTime
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'VirtualizedTraceView--spans' },
        React.createElement(_ListView2.default, {
          ref: this.setListView,
          dataLength: this.rowStates.length,
          itemHeightGetter: this.getRowHeight,
          itemRenderer: this.renderRow,
          viewBuffer: 300,
          viewBufferMin: 100,
          itemsWrapperClassName: 'VirtualizedTraceView--rowsWrapper',
          getKeyFromIndex: this.getKeyFromIndex,
          getIndexFromKey: this.getIndexFromKey,
          windowScroller: true
        })
      );
    }
  }]);

  return VirtualizedTraceViewImpl;
}(React.PureComponent);

/* istanbul ignore next */


function mapStateToProps(state, ownProps) {
  var traceTimeline = state.traceTimeline;
  return _extends({}, traceTimeline, ownProps);
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(_duck.actions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(VirtualizedTraceViewImpl);