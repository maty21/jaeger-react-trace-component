'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _Positions = require('./Positions');

var _Positions2 = _interopRequireDefault(_Positions);

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

/**
 * @typedef
 */

/**
 * Virtualized list view component, for the most part, only renders the window
 * of items that are in-view with some buffer before and after. Listens for
 * scroll events and updates which items are rendered. See react-virtualized
 * for a suite of components with similar, but generalized, functinality.
 * https://github.com/bvaughn/react-virtualized
 *
 * Note: Presently, ListView cannot be a PureComponent. This is because ListView
 * is sensitive to the underlying state that drives the list items, but it
 * doesn't actually receive that state. So, a render may still be required even
 * if ListView's props are unchanged.
 *
 * @export
 * @class ListView
 */
var ListView = function (_React$Component) {
  _inherits(ListView, _React$Component);

  function ListView(props) {
    _classCallCheck(this, ListView);

    var _this = _possibleConstructorReturn(this, (ListView.__proto__ || Object.getPrototypeOf(ListView)).call(this, props));

    _this.getViewHeight = function () {
      return _this._viewHeight;
    };

    _this.getBottomVisibleIndex = function () {
      var bottomY = _this._scrollTop + _this._viewHeight;
      return _this._yPositions.findFloorIndex(bottomY, _this._getHeight);
    };

    _this.getTopVisibleIndex = function () {
      return _this._yPositions.findFloorIndex(_this._scrollTop, _this._getHeight);
    };

    _this.getRowPosition = function (index) {
      return _this._yPositions.getRowPosition(index, _this._getHeight);
    };

    _this._onScroll = function () {
      if (!_this._isScrolledOrResized) {
        _this._isScrolledOrResized = true;
        window.requestAnimationFrame(_this._positionList);
      }
    };

    _this._positionList = function () {
      _this._isScrolledOrResized = false;
      if (!_this._wrapperElm) {
        return;
      }
      _this._calcViewIndexes();
      // indexes drawn should be padded by at least props.viewBufferMin
      var maxStart = _this.props.viewBufferMin > _this._startIndex ? 0 : _this._startIndex - _this.props.viewBufferMin;
      var minEnd = _this.props.viewBufferMin < _this.props.dataLength - _this._endIndex ? _this._endIndex + _this.props.viewBufferMin : _this.props.dataLength - 1;
      if (maxStart < _this._startIndexDrawn || minEnd > _this._endIndexDrawn) {
        _this.forceUpdate();
      }
    };

    _this._initWrapper = function (elm) {
      _this._wrapperElm = elm;
      if (!_this.props.windowScroller) {
        _this._viewHeight = elm && elm.clientHeight;
      }
    };

    _this._initItemHolder = function (elm) {
      _this._itemHolderElm = elm;
      _this._scanItemHeights();
    };

    _this._scanItemHeights = function () {
      var getIndexFromKey = _this.props.getIndexFromKey;
      if (!_this._itemHolderElm) {
        return;
      }
      // note the keys for the first and last altered heights, the `yPositions`
      // needs to be updated
      var lowDirtyKey = null;
      var highDirtyKey = null;
      var isDirty = false;
      // iterating childNodes is faster than children
      // https://jsperf.com/large-htmlcollection-vs-large-nodelist
      var nodes = _this._itemHolderElm.childNodes;
      var max = nodes.length;
      for (var i = 0; i < max; i++) {
        var node = nodes[i];
        // use `.getAttribute(...)` instead of `.dataset` for jest / JSDOM
        var itemKey = node.getAttribute('data-item-key');
        if (!itemKey) {
          // eslint-disable-next-line no-console
          console.warn('itemKey not found');
          continue;
        }
        // measure the first child, if it's available, otherwise the node itself
        // (likely not transferable to other contexts, and instead is specific to
        // how we have the items rendered)
        var measureSrc = node.firstElementChild || node;
        var observed = measureSrc.clientHeight;
        var known = _this._knownHeights.get(itemKey);
        if (observed !== known) {
          _this._knownHeights.set(itemKey, observed);
          if (!isDirty) {
            isDirty = true;
            // eslint-disable-next-line no-multi-assign
            lowDirtyKey = highDirtyKey = itemKey;
          } else {
            highDirtyKey = itemKey;
          }
        }
      }
      if (lowDirtyKey != null && highDirtyKey != null) {
        // update yPositions, then redraw
        var imin = getIndexFromKey(lowDirtyKey);
        var imax = highDirtyKey === lowDirtyKey ? imin : getIndexFromKey(highDirtyKey);
        _this._yPositions.calcHeights(imax, _this._getHeight, imin);
        _this.forceUpdate();
      }
    };

    _this._getHeight = function (i) {
      var key = _this.props.getKeyFromIndex(i);
      var known = _this._knownHeights.get(key);
      // known !== known iff known is NaN
      // eslint-disable-next-line no-self-compare
      if (known != null && known === known) {
        return known;
      }
      return _this.props.itemHeightGetter(i, key);
    };

    _this._yPositions = new _Positions2.default(200);
    // _knownHeights is (item-key -> observed height) of list items
    _this._knownHeights = new Map();

    _this._startIndexDrawn = Math.pow(2, 20);
    _this._endIndexDrawn = -Math.pow(2, 20);
    _this._startIndex = 0;
    _this._endIndex = 0;
    _this._viewHeight = -1;
    _this._scrollTop = -1;
    _this._isScrolledOrResized = false;

    _this._htmlTopOffset = -1;
    _this._windowScrollListenerAdded = false;
    // _htmlElm is only relevant if props.windowScroller is true
    _this._htmlElm = document.documentElement;
    _this._wrapperElm = undefined;
    _this._itemHolderElm = undefined;
    return _this;
  }

  /**
   * Keeps track of the height and y-value of items, by item index, in the
   * ListView.
   */

  /**
   * Keep track of the known / measured heights of the rendered items; populated
   * with values through observation and keyed on the item key, not the item
   * index.
   */

  /**
   * The start index of the items currently drawn.
   */

  /**
   * The end index of the items currently drawn.
   */

  /**
   * The start index of the items currently in view.
   */

  /**
   * The end index of the items currently in view.
   */

  /**
   * Height of the visual window, e.g. height of the scroller element.
   */

  /**
   * `scrollTop` of the current scroll position.
   */

  /**
   * Used to keep track of whether or not a re-calculation of what should be
   * drawn / viewable has been scheduled.
   */

  /**
   * If `windowScroller` is true, this notes how far down the page the scroller
   * is located. (Note: repositioning and below-the-fold views are untested)
   */

  /**
   * HTMLElement holding the scroller.
   */

  /**
   * HTMLElement holding the rendered items.
   */

  _createClass(ListView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.windowScroller) {
        if (this._wrapperElm) {
          var _wrapperElm$getBoundi = this._wrapperElm.getBoundingClientRect(),
              top = _wrapperElm$getBoundi.top;

          this._htmlTopOffset = top + this._htmlElm.scrollTop;
        }
        window.addEventListener('scroll', this._onScroll);
        this._windowScrollListenerAdded = true;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this._itemHolderElm) {
        this._scanItemHeights();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._windowScrollListenerAdded) {
        window.removeEventListener('scroll', this._onScroll);
      }
    }

    /**
     * Get the index of the item at the bottom of the current view.
     */


    /**
     * Get the index of the item at the top of the current view.
     */


    /**
     * Scroll event listener that schedules a remeasuring of which items should be
     * rendered.
     */

  }, {
    key: '_isViewChanged',


    /**
     * Returns true is the view height (scroll window) or scroll position have
     * changed.
     */
    value: function _isViewChanged() {
      if (!this._wrapperElm) {
        return false;
      }
      var useRoot = this.props.windowScroller;
      var clientHeight = useRoot ? this._htmlElm.clientHeight : this._wrapperElm.clientHeight;
      var scrollTop = useRoot ? this._htmlElm.scrollTop : this._wrapperElm.scrollTop;
      return clientHeight !== this._viewHeight || scrollTop !== this._scrollTop;
    }

    /**
     * Recalculate _startIndex and _endIndex, e.g. which items are in view.
     */

  }, {
    key: '_calcViewIndexes',
    value: function _calcViewIndexes() {
      var useRoot = this.props.windowScroller;
      // funky if statement is to satisfy flow
      if (!useRoot) {
        /* istanbul ignore next */
        if (!this._wrapperElm) {
          this._viewHeight = -1;
          this._startIndex = 0;
          this._endIndex = 0;
          return;
        }
        this._viewHeight = this._wrapperElm.clientHeight;
        this._scrollTop = this._wrapperElm.scrollTop;
      } else {
        this._viewHeight = window.innerHeight - this._htmlTopOffset;
        this._scrollTop = window.scrollY;
      }
      var yStart = this._scrollTop;
      var yEnd = this._scrollTop + this._viewHeight;
      this._startIndex = this._yPositions.findFloorIndex(yStart, this._getHeight);
      this._endIndex = this._yPositions.findFloorIndex(yEnd, this._getHeight);
    }

    /**
     * Checked to see if the currently rendered items are sufficient, if not,
     * force an update to trigger more items to be rendered.
     */


    /**
     * Go through all items that are rendered and save their height based on their
     * item-key (which is on a data-* attribute). If any new or adjusted heights
     * are found, re-measure the current known y-positions (via .yPositions).
     */


    /**
     * Get the height of the element at index `i`; first check the known heigths,
     * fallbck to `.props.itemHeightGetter(...)`.
     */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          dataLength = _props.dataLength,
          getKeyFromIndex = _props.getKeyFromIndex,
          initialDraw = _props.initialDraw,
          itemRenderer = _props.itemRenderer,
          viewBuffer = _props.viewBuffer,
          viewBufferMin = _props.viewBufferMin;

      var heightGetter = this._getHeight;
      var items = [];
      var start = void 0;
      var end = void 0;

      this._yPositions.profileData(dataLength);

      if (!this._wrapperElm) {
        start = 0;
        end = (initialDraw < dataLength ? initialDraw : dataLength) - 1;
      } else {
        if (this._isViewChanged()) {
          this._calcViewIndexes();
        }
        var maxStart = viewBufferMin > this._startIndex ? 0 : this._startIndex - viewBufferMin;
        var minEnd = viewBufferMin < dataLength - this._endIndex ? this._endIndex + viewBufferMin : dataLength - 1;
        if (maxStart < this._startIndexDrawn || minEnd > this._endIndexDrawn) {
          start = viewBuffer > this._startIndex ? 0 : this._startIndex - viewBuffer;
          end = this._endIndex + viewBuffer;
          if (end >= dataLength) {
            end = dataLength - 1;
          }
        } else {
          start = this._startIndexDrawn;
          end = this._endIndexDrawn > dataLength - 1 ? dataLength - 1 : this._endIndexDrawn;
        }
      }

      this._yPositions.calcHeights(end, heightGetter, start || -1);
      this._startIndexDrawn = start;
      this._endIndexDrawn = end;

      items.length = end - start + 1;
      for (var i = start; i <= end; i++) {
        var _yPositions$getRowPos = this._yPositions.getRowPosition(i, heightGetter),
            top = _yPositions$getRowPos.y,
            height = _yPositions$getRowPos.height;

        var style = {
          height: height,
          top: top,
          position: 'absolute'
        };
        var itemKey = getKeyFromIndex(i);
        var attrs = { 'data-item-key': itemKey };
        items.push(itemRenderer(itemKey, style, i, attrs));
      }

      var wrapperProps = {
        style: {
          overflowY: 'auto',
          position: 'relative',
          height: '100%'
        },
        ref: this._initWrapper
      };
      if (!this.props.windowScroller) {
        wrapperProps.onScroll = this._onScroll;
      }
      var scrollerStyle = {
        position: 'relative',
        height: this._yPositions.getEstimatedHeight()
      };
      return React.createElement(
        'div',
        wrapperProps,
        React.createElement(
          'div',
          { style: scrollerStyle },
          React.createElement(
            'div',
            {
              style: {
                position: 'absolute',
                top: 0,
                margin: 0,
                padding: 0
              },
              className: this.props.itemsWrapperClassName,
              ref: this._initItemHolder
            },
            items
          )
        )
      );
    }
  }]);

  return ListView;
}(React.Component);

ListView.defaultProps = {
  /**
   * E.g.`str => Number(str)`
   */
  getIndexFromKey: Number,
  /**
   * E.g.`num => String(num)`
   */
  getKeyFromIndex: String,
  initialDraw: 300,
  itemsWrapperClassName: '',
  viewBuffer: 90,
  viewBufferMin: 30,
  windowScroller: false
};
exports.default = ListView;