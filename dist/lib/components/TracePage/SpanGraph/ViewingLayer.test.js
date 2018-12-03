'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2017 Uber Technologies, Inc.
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

var _enzyme = require('enzyme');

var _GraphTicks = require('./GraphTicks');

var _GraphTicks2 = _interopRequireDefault(_GraphTicks);

var _Scrubber = require('./Scrubber');

var _Scrubber2 = _interopRequireDefault(_Scrubber);

var _ViewingLayer = require('./ViewingLayer');

var _ViewingLayer2 = _interopRequireDefault(_ViewingLayer);

var _DraggableManager = require('../../../utils/DraggableManager');

var _requestAnimationFrame = require('../../../utils/test/requestAnimationFrame');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function getViewRange(viewStart, viewEnd) {
  return {
    time: {
      current: [viewStart, viewEnd]
    }
  };
}

describe('<SpanGraph>', function () {
  (0, _requestAnimationFrame.polyfill)(window);

  var props = void 0;
  var wrapper = void 0;

  beforeEach(function () {
    props = {
      height: 60,
      numTicks: 5,
      updateNextViewRangeTime: jest.fn(),
      updateViewRangeTime: jest.fn(),
      viewRange: getViewRange(0, 1)
    };
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ViewingLayer2.default, props));
  });

  describe('_getDraggingBounds()', function () {
    beforeEach(function () {
      props = _extends({}, props, { viewRange: getViewRange(0.1, 0.9) });
      wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ViewingLayer2.default, props));
      wrapper.instance()._setRoot({
        getBoundingClientRect: function getBoundingClientRect() {
          return { left: 10, width: 100 };
        }
      });
    });

    it('throws if _root is not set', function () {
      var instance = wrapper.instance();
      instance._root = null;
      expect(function () {
        return instance._getDraggingBounds(_ViewingLayer.dragTypes.REFRAME);
      }).toThrow();
    });

    it('returns the correct bounds for reframe', function () {
      var bounds = wrapper.instance()._getDraggingBounds(_ViewingLayer.dragTypes.REFRAME);
      expect(bounds).toEqual({
        clientXLeft: 10,
        width: 100,
        maxValue: 1,
        minValue: 0
      });
    });

    it('returns the correct bounds for shiftStart', function () {
      var bounds = wrapper.instance()._getDraggingBounds(_ViewingLayer.dragTypes.SHIFT_START);
      expect(bounds).toEqual({
        clientXLeft: 10,
        width: 100,
        maxValue: 0.9,
        minValue: 0
      });
    });

    it('returns the correct bounds for shiftEnd', function () {
      var bounds = wrapper.instance()._getDraggingBounds(_ViewingLayer.dragTypes.SHIFT_END);
      expect(bounds).toEqual({
        clientXLeft: 10,
        width: 100,
        maxValue: 1,
        minValue: 0.1
      });
    });
  });

  describe('DraggableManager callbacks', function () {
    describe('reframe', function () {
      it('handles mousemove', function () {
        var value = 0.5;
        wrapper.instance()._handleReframeMouseMove({ value: value });
        var calls = props.updateNextViewRangeTime.mock.calls;
        expect(calls).toEqual([[{ cursor: value }]]);
      });

      it('handles mouseleave', function () {
        wrapper.instance()._handleReframeMouseLeave();
        var calls = props.updateNextViewRangeTime.mock.calls;
        expect(calls).toEqual([[{ cursor: null }]]);
      });

      describe('drag update', function () {
        it('handles sans anchor', function () {
          var value = 0.5;
          wrapper.instance()._handleReframeDragUpdate({ value: value });
          var calls = props.updateNextViewRangeTime.mock.calls;
          expect(calls).toEqual([[{ reframe: { anchor: value, shift: value } }]]);
        });

        it('handles the existing anchor', function () {
          var value = 0.5;
          var anchor = 0.1;
          var time = _extends({}, props.viewRange.time, { reframe: { anchor: anchor } });
          props = _extends({}, props, { viewRange: { time: time } });
          wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ViewingLayer2.default, props));
          wrapper.instance()._handleReframeDragUpdate({ value: value });
          var calls = props.updateNextViewRangeTime.mock.calls;
          expect(calls).toEqual([[{ reframe: { anchor: anchor, shift: value } }]]);
        });
      });

      describe('drag end', function () {
        var manager = void 0;

        beforeEach(function () {
          manager = { resetBounds: jest.fn() };
        });

        it('handles sans anchor', function () {
          var value = 0.5;
          wrapper.instance()._handleReframeDragEnd({ manager: manager, value: value });
          expect(manager.resetBounds.mock.calls).toEqual([[]]);
          var calls = props.updateViewRangeTime.mock.calls;
          expect(calls).toEqual([[value, value, 'minimap']]);
        });

        it('handles dragged left (anchor is greater)', function () {
          var value = 0.5;
          var anchor = 0.6;
          var time = _extends({}, props.viewRange.time, { reframe: { anchor: anchor } });
          props = _extends({}, props, { viewRange: { time: time } });
          wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ViewingLayer2.default, props));
          wrapper.instance()._handleReframeDragEnd({ manager: manager, value: value });

          expect(manager.resetBounds.mock.calls).toEqual([[]]);
          var calls = props.updateViewRangeTime.mock.calls;
          expect(calls).toEqual([[value, anchor, 'minimap']]);
        });

        it('handles dragged right (anchor is less)', function () {
          var value = 0.5;
          var anchor = 0.4;
          var time = _extends({}, props.viewRange.time, { reframe: { anchor: anchor } });
          props = _extends({}, props, { viewRange: { time: time } });
          wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ViewingLayer2.default, props));
          wrapper.instance()._handleReframeDragEnd({ manager: manager, value: value });

          expect(manager.resetBounds.mock.calls).toEqual([[]]);
          var calls = props.updateViewRangeTime.mock.calls;
          expect(calls).toEqual([[anchor, value, 'minimap']]);
        });
      });
    });

    describe('scrubber', function () {
      it('prevents the cursor from being drawn on scrubber mouseover', function () {
        wrapper.instance()._handleScrubberEnterLeave({ type: _DraggableManager.updateTypes.MOUSE_ENTER });
        expect(wrapper.state('preventCursorLine')).toBe(true);
      });

      it('prevents the cursor from being drawn on scrubber mouseleave', function () {
        wrapper.instance()._handleScrubberEnterLeave({ type: _DraggableManager.updateTypes.MOUSE_LEAVE });
        expect(wrapper.state('preventCursorLine')).toBe(false);
      });

      describe('drag start and update', function () {
        it('stops propagation on drag start', function () {
          var stopPropagation = jest.fn();
          var update = {
            event: { stopPropagation: stopPropagation },
            type: _DraggableManager.updateTypes.DRAG_START
          };
          wrapper.instance()._handleScrubberDragUpdate(update);
          expect(stopPropagation.mock.calls).toEqual([[]]);
        });

        it('updates the viewRange for shiftStart and shiftEnd', function () {
          var instance = wrapper.instance();
          var value = 0.5;
          var cases = [{
            dragUpdate: {
              value: value,
              tag: _ViewingLayer.dragTypes.SHIFT_START,
              type: _DraggableManager.updateTypes.DRAG_MOVE
            },
            viewRangeUpdate: { shiftStart: value }
          }, {
            dragUpdate: {
              value: value,
              tag: _ViewingLayer.dragTypes.SHIFT_END,
              type: _DraggableManager.updateTypes.DRAG_MOVE
            },
            viewRangeUpdate: { shiftEnd: value }
          }];
          cases.forEach(function (_case) {
            instance._handleScrubberDragUpdate(_case.dragUpdate);
            expect(props.updateNextViewRangeTime).lastCalledWith(_case.viewRangeUpdate);
          });
        });
      });

      it('updates the view on drag end', function () {
        var instance = wrapper.instance();

        var _props$viewRange$time = _slicedToArray(props.viewRange.time.current, 2),
            viewStart = _props$viewRange$time[0],
            viewEnd = _props$viewRange$time[1];

        var value = 0.5;
        var cases = [{
          dragUpdate: {
            value: value,
            manager: { resetBounds: jest.fn() },
            tag: _ViewingLayer.dragTypes.SHIFT_START
          },
          viewRangeUpdate: [value, viewEnd]
        }, {
          dragUpdate: {
            value: value,
            manager: { resetBounds: jest.fn() },
            tag: _ViewingLayer.dragTypes.SHIFT_END
          },
          viewRangeUpdate: [viewStart, value]
        }];
        cases.forEach(function (_case) {
          var _expect;

          var manager = _case.dragUpdate.manager;

          wrapper.setState({ preventCursorLine: true });
          expect(wrapper.state('preventCursorLine')).toBe(true);
          instance._handleScrubberDragEnd(_case.dragUpdate);
          expect(wrapper.state('preventCursorLine')).toBe(false);
          expect(manager.resetBounds.mock.calls).toEqual([[]]);
          (_expect = expect(props.updateViewRangeTime)).lastCalledWith.apply(_expect, _toConsumableArray(_case.viewRangeUpdate).concat(['minimap']));
        });
      });
    });
  });

  it('renders a <GraphTicks />', function () {
    expect(wrapper.find(_GraphTicks2.default).length).toBe(1);
  });

  it('renders a filtering box if leftBound exists', function () {
    var _props = _extends({}, props, { viewRange: getViewRange(0.2, 1) });
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ViewingLayer2.default, _props));

    var leftBox = wrapper.find('.ViewingLayer--inactive');
    expect(leftBox.length).toBe(1);
    var width = Number(leftBox.prop('width').slice(0, -1));
    var x = leftBox.prop('x');
    expect(Math.round(width)).toBe(20);
    expect(x).toBe(0);
  });

  it('renders a filtering box if rightBound exists', function () {
    var _props = _extends({}, props, { viewRange: getViewRange(0, 0.8) });
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ViewingLayer2.default, _props));

    var rightBox = wrapper.find('.ViewingLayer--inactive');
    expect(rightBox.length).toBe(1);
    var width = Number(rightBox.prop('width').slice(0, -1));
    var x = Number(rightBox.prop('x').slice(0, -1));
    expect(Math.round(width)).toBe(20);
    expect(x).toBe(80);
  });

  it('renders handles for the timeRangeFilter', function () {
    var _props$viewRange$time2 = _slicedToArray(props.viewRange.time.current, 2),
        viewStart = _props$viewRange$time2[0],
        viewEnd = _props$viewRange$time2[1];

    var scrubber = _react2.default.createElement(_Scrubber2.default, { position: viewStart });
    expect(wrapper.containsMatchingElement(scrubber)).toBeTruthy();
    scrubber = _react2.default.createElement(_Scrubber2.default, { position: viewEnd });
    expect(wrapper.containsMatchingElement(scrubber)).toBeTruthy();
  });
});