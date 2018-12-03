'use strict';

var _scrollPage = require('./scroll-page');

var _ScrollManager = require('./ScrollManager');

var _ScrollManager2 = _interopRequireDefault(_ScrollManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/* eslint-disable import/first */
jest.mock('./scroll-page');

var SPAN_HEIGHT = 2;

function getTrace() {
  var nextSpanID = 0;
  var spans = [];
  var trace = {
    spans: spans,
    duration: 2000,
    startTime: 1000
  };
  for (var i = 0; i < 10; i++) {
    spans.push({ duration: 1, startTime: 1000, spanID: nextSpanID++ });
  }
  return trace;
}

function getAccessors() {
  return {
    getViewRange: jest.fn(function () {
      return [0, 1];
    }),
    getSearchedSpanIDs: jest.fn(),
    getCollapsedChildren: jest.fn(),
    getViewHeight: jest.fn(function () {
      return SPAN_HEIGHT * 2;
    }),
    getBottomRowIndexVisible: jest.fn(),
    getTopRowIndexVisible: jest.fn(),
    getRowPosition: jest.fn(),
    mapRowIndexToSpanIndex: jest.fn(function (n) {
      return n;
    }),
    mapSpanIndexToRowIndex: jest.fn(function (n) {
      return n;
    })
  };
}

describe('ScrollManager', function () {
  var trace = void 0;
  var accessors = void 0;
  var manager = void 0;

  beforeEach(function () {
    _scrollPage.scrollBy.mockReset();
    _scrollPage.scrollTo.mockReset();
    trace = getTrace();
    accessors = getAccessors();
    manager = new _ScrollManager2.default(trace, { scrollBy: _scrollPage.scrollBy, scrollTo: _scrollPage.scrollTo });
    manager.setAccessors(accessors);
  });

  it('saves the accessors', function () {
    var n = Math.random();
    manager.setAccessors(n);
    expect(manager._accessors).toBe(n);
  });

  describe('_scrollPast()', function () {
    it('throws if accessors is not set', function () {
      manager.setAccessors(null);
      expect(manager._scrollPast).toThrow();
    });

    it('is a noop if an invalid rowPosition is returned by the accessors', function () {
      // eslint-disable-next-line no-console
      var oldWarn = console.warn;
      // eslint-disable-next-line no-console
      console.warn = function () {};
      manager._scrollPast(null, null);
      expect(accessors.getRowPosition.mock.calls.length).toBe(1);
      expect(accessors.getViewHeight.mock.calls.length).toBe(0);
      expect(_scrollPage.scrollTo.mock.calls.length).toBe(0);
      // eslint-disable-next-line no-console
      console.warn = oldWarn;
    });

    it('scrolls up with direction is `-1`', function () {
      var y = 10;
      var expectTo = y - 0.5 * accessors.getViewHeight();
      accessors.getRowPosition.mockReturnValue({ y: y, height: SPAN_HEIGHT });
      manager._scrollPast(NaN, -1);
      expect(_scrollPage.scrollTo.mock.calls).toEqual([[expectTo]]);
    });

    it('scrolls down with direction `1`', function () {
      var y = 10;
      var vh = accessors.getViewHeight();
      var expectTo = y + SPAN_HEIGHT - 0.5 * vh;
      accessors.getRowPosition.mockReturnValue({ y: y, height: SPAN_HEIGHT });
      manager._scrollPast(NaN, 1);
      expect(_scrollPage.scrollTo.mock.calls).toEqual([[expectTo]]);
    });
  });

  describe('_scrollToVisibleSpan()', function () {
    var scrollPastMock = void 0;

    beforeEach(function () {
      scrollPastMock = jest.fn();
      manager._scrollPast = scrollPastMock;
    });
    it('throws if accessors is not set', function () {
      manager.setAccessors(null);
      expect(manager._scrollToVisibleSpan).toThrow();
    });
    it('exits if the trace is not set', function () {
      manager.setTrace(null);
      manager._scrollToVisibleSpan();
      expect(scrollPastMock.mock.calls.length).toBe(0);
    });

    it('does nothing if already at the boundary', function () {
      accessors.getTopRowIndexVisible.mockReturnValue(0);
      accessors.getBottomRowIndexVisible.mockReturnValue(trace.spans.length - 1);
      manager._scrollToVisibleSpan(-1);
      expect(scrollPastMock.mock.calls.length).toBe(0);
      manager._scrollToVisibleSpan(1);
      expect(scrollPastMock.mock.calls.length).toBe(0);
    });

    it('centers the current top or bottom span', function () {
      accessors.getTopRowIndexVisible.mockReturnValue(5);
      accessors.getBottomRowIndexVisible.mockReturnValue(5);
      manager._scrollToVisibleSpan(-1);
      expect(scrollPastMock).lastCalledWith(5, -1);
      manager._scrollToVisibleSpan(1);
      expect(scrollPastMock).lastCalledWith(5, 1);
    });

    it('skips spans that are out of view', function () {
      trace.spans[4].startTime = trace.startTime + trace.duration * 0.5;
      accessors.getViewRange = jest.fn(function () {
        return [0.4, 0.6];
      });
      accessors.getTopRowIndexVisible.mockReturnValue(trace.spans.length - 1);
      accessors.getBottomRowIndexVisible.mockReturnValue(0);
      manager._scrollToVisibleSpan(1);
      expect(scrollPastMock).lastCalledWith(4, 1);
      manager._scrollToVisibleSpan(-1);
      expect(scrollPastMock).lastCalledWith(4, -1);
    });

    it('skips spans that do not match the text search', function () {
      accessors.getTopRowIndexVisible.mockReturnValue(trace.spans.length - 1);
      accessors.getBottomRowIndexVisible.mockReturnValue(0);
      accessors.getSearchedSpanIDs = jest.fn(function () {
        return new Set([trace.spans[4].spanID]);
      });
      manager._scrollToVisibleSpan(1);
      expect(scrollPastMock).lastCalledWith(4, 1);
      manager._scrollToVisibleSpan(-1);
      expect(scrollPastMock).lastCalledWith(4, -1);
    });

    describe('scrollToNextVisibleSpan() and scrollToPrevVisibleSpan()', function () {
      function getRefs(spanID) {
        return [{ refType: 'CHILD_OF', spanID: spanID }];
      }

      beforeEach(function () {
        // change spans so 0 and 4 are top-level and their children are collapsed
        var spans = trace.spans;
        var parentID = void 0;
        for (var i = 0; i < spans.length; i++) {
          switch (i) {
            case 0:
            case 4:
              parentID = spans[i].spanID;
              break;
            default:
              spans[i].references = getRefs(parentID);
          }
        }
        // set which spans are "in-view" and which have collapsed children
        accessors.getTopRowIndexVisible.mockReturnValue(trace.spans.length - 1);
        accessors.getBottomRowIndexVisible.mockReturnValue(0);
        accessors.getCollapsedChildren.mockReturnValue(new Set([spans[0].spanID, spans[4].spanID]));
      });

      it('skips spans that are hidden because their parent is collapsed', function () {
        manager.scrollToNextVisibleSpan();
        expect(scrollPastMock).lastCalledWith(4, 1);
        manager.scrollToPrevVisibleSpan();
        expect(scrollPastMock).lastCalledWith(4, -1);
      });

      it('ignores references with unknown types', function () {
        // modify spans[2] so that it has an unknown refType
        var spans = trace.spans;
        spans[2].references = [{ refType: 'OTHER' }];
        manager.scrollToNextVisibleSpan();
        expect(scrollPastMock).lastCalledWith(2, 1);
        manager.scrollToPrevVisibleSpan();
        expect(scrollPastMock).lastCalledWith(4, -1);
      });

      it('handles more than one level of ancestry', function () {
        // modify spans[2] so that it has an unknown refType
        var spans = trace.spans;
        spans[2].references = getRefs(spans[1].spanID);
        manager.scrollToNextVisibleSpan();
        expect(scrollPastMock).lastCalledWith(4, 1);
        manager.scrollToPrevVisibleSpan();
        expect(scrollPastMock).lastCalledWith(4, -1);
      });
    });
  });

  describe('scrollPageDown() and scrollPageUp()', function () {
    it('scrolls by +/~ viewHeight when invoked', function () {
      manager.scrollPageDown();
      expect(_scrollPage.scrollBy).lastCalledWith(0.95 * accessors.getViewHeight(), true);
      manager.scrollPageUp();
      expect(_scrollPage.scrollBy).lastCalledWith(-0.95 * accessors.getViewHeight(), true);
    });

    it('is a no-op if _accessors or _scroller is not defined', function () {
      manager._accessors = null;
      manager.scrollPageDown();
      manager.scrollPageUp();
      expect(_scrollPage.scrollBy.mock.calls.length).toBe(0);
      manager._accessors = accessors;
      manager._scroller = null;
      manager.scrollPageDown();
      manager.scrollPageUp();
      expect(_scrollPage.scrollBy.mock.calls.length).toBe(0);
    });
  });

  describe('destroy()', function () {
    it('disposes', function () {
      expect(manager._trace).toBeDefined();
      expect(manager._accessors).toBeDefined();
      expect(manager._scroller).toBeDefined();
      manager.destroy();
      expect(manager._trace).not.toBeDefined();
      expect(manager._accessors).not.toBeDefined();
      expect(manager._scroller).not.toBeDefined();
    });
  });
});