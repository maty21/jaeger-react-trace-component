'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Copyright (c) 2017 Uber Technologies, Inc.
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

var _react2 = _interopRequireDefault(_react);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _enzyme = require('enzyme');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _requestAnimationFrame = require('../../../../utils/test/requestAnimationFrame');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// Util to get list of all callbacks added to an event emitter by event type.
// jest adds "error" event listeners to window, this util makes it easier to
// ignore those calls.
function getListenersByType(mockFn) {
  var rv = {};
  mockFn.calls.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        eventType = _ref2[0],
        callback = _ref2[1];

    if (!rv[eventType]) {
      rv[eventType] = [callback];
    } else {
      rv[eventType].push(callback);
    }
  });
  return rv;
}

describe('<ListView>', function () {
  // polyfill window.requestAnimationFrame (and cancel) into jsDom's window
  (0, _requestAnimationFrame.polyfill)(window);

  var DATA_LENGTH = 40;

  function getHeight(index) {
    return index * 2 + 2;
  }

  function Item(props) {
    // eslint-disable-next-line react/prop-types
    var children = props.children,
        rest = _objectWithoutProperties(props, ['children']);

    return _react2.default.createElement(
      'div',
      rest,
      children
    );
  }

  function renderItem(itemKey, styles, itemIndex, attrs) {
    return _react2.default.createElement(
      Item,
      _extends({ key: itemKey, style: styles }, attrs),
      itemIndex
    );
  }

  var wrapper = void 0;
  var instance = void 0;

  var props = {
    dataLength: DATA_LENGTH,
    initialDraw: 5,
    itemHeightGetter: getHeight,
    itemRenderer: renderItem,
    itemsWrapperClassName: 'SomeClassName',
    viewBuffer: 10,
    viewBufferMin: 5,
    windowScroller: false
  };

  describe('shallow tests', function () {
    beforeEach(function () {
      wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, props));
    });

    it('renders without exploding', function () {
      expect(wrapper).toBeDefined();
    });

    it('matches a snapshot', function () {
      expect(wrapper).toMatchSnapshot();
    });

    it('initialDraw sets the number of items initially drawn', function () {
      expect(wrapper.find(Item).length).toBe(props.initialDraw);
    });

    it('sets the height of the items according to the height func', function () {
      var items = wrapper.find(Item);
      var expectedHeights = [];
      var heights = items.map(function (node, i) {
        expectedHeights.push(getHeight(i));
        return node.prop('style').height;
      });
      expect(heights.length).toBe(props.initialDraw);
      expect(heights).toEqual(expectedHeights);
    });

    it('saves the currently drawn indexes to _startIndexDrawn and _endIndexDrawn', function () {
      var inst = wrapper.instance();
      expect(inst._startIndexDrawn).toBe(0);
      expect(inst._endIndexDrawn).toBe(props.initialDraw - 1);
    });
  });

  describe('mount tests', function () {
    describe('accessor functions', function () {
      var clientHeight = 2;
      var scrollTop = 3;

      var oldRender = void 0;
      var oldInitWrapper = void 0;
      var initWrapperMock = jest.fn(function (elm) {
        if (elm != null) {
          // jsDom requires `defineProperties` instead of just setting the props
          Object.defineProperties(elm, {
            clientHeight: {
              get: function get() {
                return clientHeight;
              }
            },
            scrollTop: {
              get: function get() {
                return scrollTop;
              }
            }
          });
        }
        oldInitWrapper.call(undefined, elm);
      });

      beforeAll(function () {
        oldRender = _index2.default.prototype.render;
        // `_initWrapper` is not on the prototype, so it needs to be mocked
        // on each instance, use `render()` as a hook to do that
        _index2.default.prototype.render = function altRender() {
          if (this._initWrapper !== initWrapperMock) {
            oldInitWrapper = this._initWrapper;
            this._initWrapper = initWrapperMock;
          }
          return oldRender.call(this);
        };
      });

      afterAll(function () {
        _index2.default.prototype.render = oldRender;
      });

      beforeEach(function () {
        initWrapperMock.mockClear();
        wrapper = (0, _enzyme.mount)(_react2.default.createElement(_index2.default, props));
        instance = wrapper.instance();
      });

      it('getViewHeight() returns the viewHeight', function () {
        expect(instance.getViewHeight()).toBe(clientHeight);
      });

      it('getBottomVisibleIndex() returns a number', function () {
        var n = instance.getBottomVisibleIndex();
        expect(isNaN(n)).toBe(false);
        expect(n).toEqual(expect.any(Number));
      });

      it('getTopVisibleIndex() returns a number', function () {
        var n = instance.getTopVisibleIndex();
        expect(isNaN(n)).toBe(false);
        expect(n).toEqual(expect.any(Number));
      });

      it('getRowPosition() returns a number', function () {
        var _instance$getRowPosit = instance.getRowPosition(2),
            height = _instance$getRowPosit.height,
            y = _instance$getRowPosit.y;

        expect(height).toEqual(expect.any(Number));
        expect(y).toEqual(expect.any(Number));
      });
    });

    describe('windowScroller', function () {
      var windowAddListenerSpy = void 0;
      var windowRmListenerSpy = void 0;

      beforeEach(function () {
        windowAddListenerSpy = jest.spyOn(window, 'addEventListener');
        windowRmListenerSpy = jest.spyOn(window, 'removeEventListener');
        var wsProps = _extends({}, props, { windowScroller: true });
        wrapper = (0, _enzyme.mount)(_react2.default.createElement(_index2.default, wsProps));
        instance = wrapper.instance();
      });

      afterEach(function () {
        windowAddListenerSpy.mockRestore();
      });

      it('adds the onScroll listener to the window element after the component mounts', function () {
        var eventListeners = getListenersByType(windowAddListenerSpy.mock);
        expect(eventListeners.scroll).toEqual([instance._onScroll]);
      });

      it('removes the onScroll listener from window when unmounting', function () {
        // jest adds "error" event listeners to window, ignore those calls
        var eventListeners = getListenersByType(windowRmListenerSpy.mock);
        expect(eventListeners.scroll).not.toBeDefined();
        wrapper.unmount();
        eventListeners = getListenersByType(windowRmListenerSpy.mock);
        expect(eventListeners.scroll).toEqual([instance._onScroll]);
      });

      it('calls _positionList when the document is scrolled', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var event, fn;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                event = new Event('scroll');
                fn = jest.spyOn(instance, '_positionList');

                expect(instance._isScrolledOrResized).toBe(false);
                window.dispatchEvent(event);
                expect(instance._isScrolledOrResized).toBe(true);
                _context.next = 7;
                return _bluebird2.default.resolve().delay(0);

              case 7:
                expect(fn).toHaveBeenCalled();

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      })));

      it('uses the root HTML element to determine if the view has changed', function () {
        var htmlElm = instance._htmlElm;
        expect(htmlElm).toBeTruthy();
        var spyFns = {
          clientHeight: jest.fn(function () {
            return instance._viewHeight + 1;
          }),
          scrollTop: jest.fn(function () {
            return instance._scrollTop + 1;
          })
        };
        Object.defineProperties(htmlElm, {
          clientHeight: {
            get: spyFns.clientHeight
          },
          scrollTop: {
            get: spyFns.scrollTop
          }
        });
        var hasChanged = instance._isViewChanged();
        expect(spyFns.clientHeight).toHaveBeenCalled();
        expect(spyFns.scrollTop).toHaveBeenCalled();
        expect(hasChanged).toBe(true);
      });
    });
  });
});