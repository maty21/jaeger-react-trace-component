'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//      

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
 * `Accessors` is necessary because `ScrollManager` needs to be created by
 * `TracePage` so it can be passed into the keyboard shortcut manager. But,
 * `ScrollManager` needs to know about the state of `ListView` and `Positions`,
 * which are very low-level. And, storing their state info in redux or
 * `TracePage#state` would be inefficient because the state info only rarely
 * needs to be accessed (when a keyboard shortcut is triggered). `Accessors`
 * allows that state info to be accessed in a loosely coupled fashion on an
 * as-needed basis.
 */

/**
 * Returns `{ isHidden: true, ... }` if one of the parents of `span` is
 * collapsed, e.g. has children hidden.
 *
 * @param {Span} span The Span to check for.
 * @param {Set<string>} childrenAreHidden The set of Spans known to have hidden
 *                                        children, either because it is
 *                                        collapsed or has a collapsed parent.
 * @param {Map<string, ?Span} spansMap Mapping from spanID to Span.
 * @returns {{ isHidden: boolean, parentIds: Set<string> }}
 */
function isSpanHidden(span, childrenAreHidden, spansMap) {
  var parentIDs = new Set();
  var references = span.references;

  var parentID = void 0;
  var checkRef = function checkRef(ref) {
    if (ref.refType === 'CHILD_OF' || ref.refType === 'FOLLOWS_FROM') {
      parentID = ref.spanID;
      parentIDs.add(parentID);
      return childrenAreHidden.has(parentID);
    }
    return false;
  };
  while (Array.isArray(references) && references.length) {
    var isHidden = references.some(checkRef);
    if (isHidden) {
      return { isHidden: isHidden, parentIDs: parentIDs };
    }
    if (!parentID) {
      break;
    }
    var parent = spansMap.get(parentID);
    parentID = undefined;
    references = parent && parent.references;
  }
  return { parentIDs: parentIDs, isHidden: false };
}

/**
 * ScrollManager is intended for scrolling the TracePage. Has two modes, paging
 * and scrolling to the previous or next visible span.
 */

var ScrollManager = function () {
  function ScrollManager(trace, scroller) {
    var _this = this;

    _classCallCheck(this, ScrollManager);

    this.setAccessors = function (accessors) {
      _this._accessors = accessors;
    };

    this.scrollPageDown = function () {
      if (!_this._scroller || !_this._accessors) {
        return;
      }
      _this._scroller.scrollBy(0.95 * _this._accessors.getViewHeight(), true);
    };

    this.scrollPageUp = function () {
      if (!_this._scroller || !_this._accessors) {
        return;
      }
      _this._scroller.scrollBy(-0.95 * _this._accessors.getViewHeight(), true);
    };

    this.scrollToNextVisibleSpan = function () {
      _this._scrollToVisibleSpan(1);
    };

    this.scrollToPrevVisibleSpan = function () {
      _this._scrollToVisibleSpan(-1);
    };

    this._trace = trace;
    this._scroller = scroller;
    this._accessors = undefined;
  }

  _createClass(ScrollManager, [{
    key: '_scrollPast',
    value: function _scrollPast(rowIndex, direction) {
      var xrs = this._accessors;
      /* istanbul ignore next */
      if (!xrs) {
        throw new Error('Accessors not set');
      }
      var isUp = direction < 0;
      var position = xrs.getRowPosition(rowIndex);
      if (!position) {
        // eslint-disable-next-line no-console
        console.warn('Invalid row index');
        return;
      }
      var y = position.y;

      var vh = xrs.getViewHeight();
      if (!isUp) {
        y += position.height;
        // scrollTop is based on the top of the window
        y -= vh;
      }
      y += direction * 0.5 * vh;
      this._scroller.scrollTo(y);
    }
  }, {
    key: '_scrollToVisibleSpan',
    value: function _scrollToVisibleSpan(direction) {
      var xrs = this._accessors;
      /* istanbul ignore next */
      if (!xrs) {
        throw new Error('Accessors not set');
      }
      if (!this._trace) {
        return;
      }
      var _trace = this._trace,
          duration = _trace.duration,
          spans = _trace.spans,
          traceStartTime = _trace.startTime;

      var isUp = direction < 0;
      var boundaryRow = isUp ? xrs.getTopRowIndexVisible() : xrs.getBottomRowIndexVisible();
      var spanIndex = xrs.mapRowIndexToSpanIndex(boundaryRow);
      if (spanIndex === 0 && isUp || spanIndex === spans.length - 1 && !isUp) {
        return;
      }
      // fullViewSpanIndex is one row inside the view window unless already at the top or bottom
      var fullViewSpanIndex = spanIndex;
      if (spanIndex !== 0 && spanIndex !== spans.length - 1) {
        fullViewSpanIndex -= direction;
      }

      var _xrs$getViewRange = xrs.getViewRange(),
          _xrs$getViewRange2 = _slicedToArray(_xrs$getViewRange, 2),
          viewStart = _xrs$getViewRange2[0],
          viewEnd = _xrs$getViewRange2[1];

      var checkVisibility = viewStart !== 0 || viewEnd !== 1;
      // use NaN as fallback to make flow happy
      var startTime = checkVisibility ? traceStartTime + duration * viewStart : NaN;
      var endTime = checkVisibility ? traceStartTime + duration * viewEnd : NaN;
      var findMatches = xrs.getSearchedSpanIDs();
      var _collapsed = xrs.getCollapsedChildren();
      var childrenAreHidden = _collapsed ? new Set(_collapsed) : null;
      // use empty Map as fallback to make flow happy
      var spansMap = childrenAreHidden ? new Map(spans.map(function (s) {
        return [s.spanID, s];
      })) : new Map();
      var boundary = direction < 0 ? -1 : spans.length;
      var nextSpanIndex = void 0;
      for (var i = fullViewSpanIndex + direction; i !== boundary; i += direction) {
        var span = spans[i];
        var spanDuration = span.duration,
            spanID = span.spanID,
            spanStartTime = span.startTime;

        var spanEndTime = spanStartTime + spanDuration;
        if (checkVisibility && (spanStartTime > endTime || spanEndTime < startTime)) {
          // span is not visible within the view range
          continue;
        }
        if (findMatches && !findMatches.has(spanID)) {
          // skip to search matches (when searching)
          continue;
        }
        if (childrenAreHidden) {
          // make sure the span is not collapsed
          var _isSpanHidden = isSpanHidden(span, childrenAreHidden, spansMap),
              isHidden = _isSpanHidden.isHidden,
              parentIDs = _isSpanHidden.parentIDs;

          if (isHidden) {
            childrenAreHidden.add.apply(childrenAreHidden, _toConsumableArray(parentIDs));
            continue;
          }
        }
        nextSpanIndex = i;
        break;
      }
      if (!nextSpanIndex || nextSpanIndex === boundary) {
        // might as well scroll to the top or bottom
        nextSpanIndex = boundary - direction;
      }
      var nextRow = xrs.mapSpanIndexToRowIndex(nextSpanIndex);
      this._scrollPast(nextRow, direction);
    }

    /**
     * Sometimes the ScrollManager is created before the trace is loaded. This
     * setter allows the trace to be set asynchronously.
     */

  }, {
    key: 'setTrace',
    value: function setTrace(trace) {
      this._trace = trace;
    }

    /**
     * `setAccessors` is bound in the ctor, so it can be passed as a prop to
     * children components.
     */


    /**
     * Scrolls around one page down (0.95x). It is bounds in the ctor, so it can
     * be used as a keyboard shortcut handler.
     */


    /**
     * Scrolls around one page up (0.95x). It is bounds in the ctor, so it can
     * be used as a keyboard shortcut handler.
     */


    /**
     * Scrolls to the next visible span, ignoring spans that do not match the
     * text filter, if there is one. It is bounds in the ctor, so it can
     * be used as a keyboard shortcut handler.
     */


    /**
     * Scrolls to the previous visible span, ignoring spans that do not match the
     * text filter, if there is one. It is bounds in the ctor, so it can
     * be used as a keyboard shortcut handler.
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this._trace = undefined;
      this._scroller = undefined;
      this._accessors = undefined;
    }
  }]);

  return ScrollManager;
}();

exports.default = ScrollManager;