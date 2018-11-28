'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TracePageImpl = exports.shortcutConfig = exports.VIEW_MIN_RANGE = undefined;

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

exports.makeShortcutCallbacks = makeShortcutCallbacks;
exports.mapStateToProps = mapStateToProps;
exports.mapDispatchToProps = mapDispatchToProps;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _clamp2 = require('lodash/clamp');

var _clamp3 = _interopRequireDefault(_clamp2);

var _mapValues2 = require('lodash/mapValues');

var _mapValues3 = _interopRequireDefault(_mapValues2);

var _maxBy2 = require('lodash/maxBy');

var _maxBy3 = _interopRequireDefault(_maxBy2);

var _values2 = require('lodash/values');

var _values3 = _interopRequireDefault(_values2);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _antd = require('antd');

var _ArchiveNotifier = require('./ArchiveNotifier');

var _ArchiveNotifier2 = _interopRequireDefault(_ArchiveNotifier);

var _duck = require('./ArchiveNotifier/duck');

var _index = require('./index.track');

var _keyboardShortcuts = require('./keyboard-shortcuts');

var _scrollPage = require('./scroll-page');

var _ScrollManager = require('./ScrollManager');

var _ScrollManager2 = _interopRequireDefault(_ScrollManager);

var _SpanGraph = require('./SpanGraph');

var _SpanGraph2 = _interopRequireDefault(_SpanGraph);

var _TracePageHeader = require('./TracePageHeader');

var _TracePageHeader2 = _interopRequireDefault(_TracePageHeader);

var _TracePageHeader3 = require('./TracePageHeader.track');

var _TraceTimelineViewer = require('./TraceTimelineViewer');

var _TraceTimelineViewer2 = _interopRequireDefault(_TraceTimelineViewer);

var _ErrorMessage = require('../common/ErrorMessage');

var _ErrorMessage2 = _interopRequireDefault(_ErrorMessage);

var _LoadingIndicator = require('../common/LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _jaegerApi = require('../../actions/jaeger-api');

var jaegerApiActions = _interopRequireWildcard(_jaegerApi);

var _constants = require('../../constants');

var _traceViewer = require('../../model/trace-viewer');

var _prefixUrl = require('../../utils/prefix-url');

var _prefixUrl2 = _interopRequireDefault(_prefixUrl);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// export for tests
var VIEW_MIN_RANGE = exports.VIEW_MIN_RANGE = 0.01;
var VIEW_CHANGE_BASE = 0.005;
var VIEW_CHANGE_FAST = 0.05;

// export for tests
var shortcutConfig = exports.shortcutConfig = {
  panLeft: [-VIEW_CHANGE_BASE, -VIEW_CHANGE_BASE],
  panLeftFast: [-VIEW_CHANGE_FAST, -VIEW_CHANGE_FAST],
  panRight: [VIEW_CHANGE_BASE, VIEW_CHANGE_BASE],
  panRightFast: [VIEW_CHANGE_FAST, VIEW_CHANGE_FAST],
  zoomIn: [VIEW_CHANGE_BASE, -VIEW_CHANGE_BASE],
  zoomInFast: [VIEW_CHANGE_FAST, -VIEW_CHANGE_FAST],
  zoomOut: [-VIEW_CHANGE_BASE, VIEW_CHANGE_BASE],
  zoomOutFast: [-VIEW_CHANGE_FAST, VIEW_CHANGE_FAST]
};

// export for tests
function makeShortcutCallbacks(adjRange) {
  function getHandler(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        startChange = _ref2[0],
        endChange = _ref2[1];

    return function combokeyHandler(event) {
      event.preventDefault();
      adjRange(startChange, endChange);
    };
  }
  return (0, _mapValues3.default)(shortcutConfig, getHandler);
}

// export for tests

var TracePageImpl = exports.TracePageImpl = function (_React$PureComponent) {
  _inherits(TracePageImpl, _React$PureComponent);

  function TracePageImpl(props) {
    _classCallCheck(this, TracePageImpl);

    var _this = _possibleConstructorReturn(this, (TracePageImpl.__proto__ || Object.getPrototypeOf(TracePageImpl)).call(this, props));

    _this.setHeaderHeight = function (elm) {
      _this._headerElm = elm;
      if (elm) {
        if (_this.state.headerHeight !== elm.clientHeight) {
          _this.setState({ headerHeight: elm.clientHeight });
        }
      } else if (_this.state.headerHeight) {
        _this.setState({ headerHeight: null });
      }
    };

    _this.filterSpans = function (textFilter) {
      var spans = _this.props.trace && _this.props.trace.data && _this.props.trace.data.spans;
      if (!spans) return null;

      // if a span field includes at least one filter in includeFilters, the span is a match
      var includeFilters = [];

      // values with keys that include text in any one of the excludeKeys will be ignored
      var excludeKeys = [];

      // split textFilter by whitespace, remove empty strings, and extract includeFilters and excludeKeys
      textFilter.split(' ').map(function (s) {
        return s.trim();
      }).filter(function (s) {
        return s;
      }).forEach(function (w) {
        if (w[0] === '-') {
          excludeKeys.push(w.substr(1).toLowerCase());
        } else {
          includeFilters.push(w.toLowerCase());
        }
      });

      var isTextInFilters = function isTextInFilters(filters, text) {
        return filters.some(function (filter) {
          return text.toLowerCase().includes(filter);
        });
      };

      var isTextInKeyValues = function isTextInKeyValues(kvs) {
        return kvs ? kvs.some(function (kv) {
          // ignore checking key and value for a match if key is in excludeKeys
          if (isTextInFilters(excludeKeys, kv.key)) return false;
          // match if key or value matches an item in includeFilters
          return isTextInFilters(includeFilters, kv.key) || isTextInFilters(includeFilters, kv.value.toString());
        }) : false;
      };

      var isSpanAMatch = function isSpanAMatch(span) {
        return isTextInFilters(includeFilters, span.operationName) || isTextInFilters(includeFilters, span.process.serviceName) || isTextInKeyValues(span.tags) || span.logs.some(function (log) {
          return isTextInKeyValues(log.fields);
        }) || isTextInKeyValues(span.process.tags);
      };

      // declare as const because need to disambiguate the type
      var rv = new Set(spans.filter(isSpanAMatch).map(function (span) {
        return span.spanID;
      }));
      return rv;
    };

    _this.updateTextFilter = function (textFilter) {
      var findMatchesIDs = void 0;
      if (textFilter.trim()) {
        findMatchesIDs = _this.filterSpans(textFilter);
      } else {
        findMatchesIDs = null;
      }
      (0, _index.trackFilter)(textFilter);
      _this.setState({ textFilter: textFilter, findMatchesIDs: findMatchesIDs });
    };

    _this.clearSearch = function () {
      _this.updateTextFilter('');
      if (_this._searchBar.current) _this._searchBar.current.blur();
    };

    _this.focusOnSearchBar = function () {
      if (_this._searchBar.current) _this._searchBar.current.focus();
    };

    _this.updateViewRangeTime = function (start, end, trackSrc) {
      if (trackSrc) {
        (0, _index.trackRange)(trackSrc, [start, end], _this.state.viewRange.time.current);
      }
      var time = { current: [start, end] };
      var viewRange = _extends({}, _this.state.viewRange, { time: time });
      _this.setState({ viewRange: viewRange });
    };

    _this.updateNextViewRangeTime = function (update) {
      var time = _extends({}, _this.state.viewRange.time, update);
      var viewRange = _extends({}, _this.state.viewRange, { time: time });
      _this.setState({ viewRange: viewRange });
    };

    _this.toggleSlimView = function () {
      var slimView = _this.state.slimView;

      (0, _TracePageHeader3.trackSlimHeaderToggle)(!slimView);
      _this.setState({ slimView: !slimView });
    };

    _this.archiveTrace = function () {
      var _this$props = _this.props,
          id = _this$props.id,
          archiveTrace = _this$props.archiveTrace;

      archiveTrace(id);
    };

    _this.acknowledgeArchive = function () {
      var _this$props2 = _this.props,
          id = _this$props2.id,
          acknowledgeArchive = _this$props2.acknowledgeArchive;

      acknowledgeArchive(id);
    };

    _this.state = {
      headerHeight: null,
      slimView: false,
      textFilter: '',
      findMatchesIDs: null,
      viewRange: {
        time: {
          current: [0, 1]
        }
      }
    };
    _this._headerElm = null;
    var trace = props.trace;

    _this._scrollManager = new _ScrollManager2.default(trace && trace.data, {
      scrollBy: _scrollPage.scrollBy,
      scrollTo: _scrollPage.scrollTo
    });
    _this._searchBar = React.createRef();
    (0, _keyboardShortcuts.reset)();
    return _this;
  }

  _createClass(TracePageImpl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.ensureTraceFetched();
      this.updateViewRangeTime(0, 1);
      /* istanbul ignore if */
      if (!this._scrollManager) {
        throw new Error('Invalid state - scrollManager is unset');
      }
      var _scrollManager = this._scrollManager,
          scrollPageDown = _scrollManager.scrollPageDown,
          scrollPageUp = _scrollManager.scrollPageUp,
          scrollToNextVisibleSpan = _scrollManager.scrollToNextVisibleSpan,
          scrollToPrevVisibleSpan = _scrollManager.scrollToPrevVisibleSpan;

      var adjViewRange = function adjViewRange(a, b) {
        return _this2._adjustViewRange(a, b, 'kbd');
      };
      var shortcutCallbacks = makeShortcutCallbacks(adjViewRange);
      shortcutCallbacks.scrollPageDown = scrollPageDown;
      shortcutCallbacks.scrollPageUp = scrollPageUp;
      shortcutCallbacks.scrollToNextVisibleSpan = scrollToNextVisibleSpan;
      shortcutCallbacks.scrollToPrevVisibleSpan = scrollToPrevVisibleSpan;
      shortcutCallbacks.clearSearch = this.clearSearch;
      shortcutCallbacks.searchSpans = this.focusOnSearchBar;
      (0, _keyboardShortcuts.merge)(shortcutCallbacks);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this._scrollManager) {
        var trace = nextProps.trace;

        this._scrollManager.setTrace(trace && trace.data);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(_ref3) {
      var prevID = _ref3.id;
      var _props = this.props,
          id = _props.id,
          trace = _props.trace;

      this.setHeaderHeight(this._headerElm);
      if (!trace) {
        this.ensureTraceFetched();
        return;
      }
      if (prevID !== id) {
        this.updateViewRangeTime(0, 1);
        this.clearSearch();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _keyboardShortcuts.reset)();
      (0, _scrollPage.cancel)();
      if (this._scrollManager) {
        this._scrollManager.destroy();
        this._scrollManager = new _ScrollManager2.default(undefined, {
          scrollBy: _scrollPage.scrollBy,
          scrollTo: _scrollPage.scrollTo
        });
      }
    }
  }, {
    key: '_adjustViewRange',
    value: function _adjustViewRange(startChange, endChange, trackSrc) {
      var _state$viewRange$time = _slicedToArray(this.state.viewRange.time.current, 2),
          viewStart = _state$viewRange$time[0],
          viewEnd = _state$viewRange$time[1];

      var start = (0, _clamp3.default)(viewStart + startChange, 0, 0.99);
      var end = (0, _clamp3.default)(viewEnd + endChange, 0.01, 1);
      if (end - start < VIEW_MIN_RANGE) {
        if (startChange < 0 && endChange < 0) {
          end = start + VIEW_MIN_RANGE;
        } else if (startChange > 0 && endChange > 0) {
          end = start + VIEW_MIN_RANGE;
        } else {
          var center = viewStart + (viewEnd - viewStart) / 2;
          start = center - VIEW_MIN_RANGE / 2;
          end = center + VIEW_MIN_RANGE / 2;
        }
      }
      this.updateViewRangeTime(start, end, trackSrc);
    }
  }, {
    key: 'ensureTraceFetched',
    value: function ensureTraceFetched() {
      var _props2 = this.props,
          fetchTrace = _props2.fetchTrace,
          trace = _props2.trace,
          id = _props2.id;

      if (!trace) {
        fetchTrace(id);
        return;
      }
      var history = this.props.history;

      if (id && id !== id.toLowerCase()) {
        history.push((0, _prefixUrl2.default)('/trace/' + id.toLowerCase()));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          archiveEnabled = _props3.archiveEnabled,
          archiveTraceState = _props3.archiveTraceState,
          trace = _props3.trace;
      var _state = this.state,
          slimView = _state.slimView,
          headerHeight = _state.headerHeight,
          textFilter = _state.textFilter,
          viewRange = _state.viewRange,
          findMatchesIDs = _state.findMatchesIDs;

      if (!trace || trace.state === _constants.fetchedState.LOADING) {
        return React.createElement(_LoadingIndicator2.default, { className: 'u-mt-vast', centered: true });
      }
      var data = trace.data;

      if (trace.state === _constants.fetchedState.ERROR || !data) {
        return React.createElement(_ErrorMessage2.default, { className: 'ub-m3', error: trace.error || 'Unknown error' });
      }
      var duration = data.duration,
          processes = data.processes,
          spans = data.spans,
          startTime = data.startTime,
          traceID = data.traceID;

      var maxSpanDepth = (0, _maxBy3.default)(spans, 'depth').depth + 1;
      var numberOfServices = new Set((0, _values3.default)(processes).map(function (p) {
        return p.serviceName;
      })).size;
      return React.createElement(
        'div',
        null,
        archiveEnabled && React.createElement(_ArchiveNotifier2.default, { acknowledge: this.acknowledgeArchive, archivedState: archiveTraceState }),
        React.createElement(
          'div',
          { className: 'Tracepage--headerSection', ref: this.setHeaderHeight },
          !slimView && React.createElement(_SpanGraph2.default, {
            trace: data,
            viewRange: viewRange,
            updateNextViewRangeTime: this.updateNextViewRangeTime,
            updateViewRangeTime: this.updateViewRangeTime
          })
        ),
        headerHeight && React.createElement(
          'section',
          { style: { paddingTop: headerHeight } },
          React.createElement(_TraceTimelineViewer2.default, {
            registerAccessors: this._scrollManager.setAccessors,
            findMatchesIDs: findMatchesIDs,
            trace: data,
            updateNextViewRangeTime: this.updateNextViewRangeTime,
            updateViewRangeTime: this.updateViewRangeTime,
            viewRange: viewRange
          })
        )
      );
    }
  }]);

  return TracePageImpl;
}(React.PureComponent);

// export for tests


function mapStateToProps(state, ownProps) {
  var id = ownProps.match.params.id;

  var trace = id ? state.trace.traces[id] : null;
  var archiveTraceState = id ? state.archive[id] : null;
  var archiveEnabled = Boolean(state.config.archiveEnabled);
  return { archiveEnabled: archiveEnabled, archiveTraceState: archiveTraceState, id: id, trace: trace };
}

// export for tests
function mapDispatchToProps(dispatch) {
  var _bindActionCreators = (0, _redux.bindActionCreators)(jaegerApiActions, dispatch),
      fetchTrace = _bindActionCreators.fetchTrace;

  var _bindActionCreators2 = (0, _redux.bindActionCreators)(_duck.actions, dispatch),
      archiveTrace = _bindActionCreators2.archiveTrace,
      acknowledgeArchive = _bindActionCreators2.acknowledge;

  return { acknowledgeArchive: acknowledgeArchive, archiveTrace: archiveTrace, fetchTrace: fetchTrace };
}

//export default connect(mapStateToProps, mapDispatchToProps)(TracePageImpl);
exports.default = TracePageImpl;