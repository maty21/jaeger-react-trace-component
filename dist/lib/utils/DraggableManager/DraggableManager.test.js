'use strict';

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

var _DraggableManager = require('./DraggableManager');

var _DraggableManager2 = _interopRequireDefault(_DraggableManager);

var _updateTypes = require('./update-types');

var _updateTypes2 = _interopRequireDefault(_updateTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DraggableManager', function () {
  var baseClientX = 100;
  // left button mouse events have `.button === 0`
  var baseMouseEvt = { button: 0, clientX: baseClientX };
  var tag = 'some-tag';
  var bounds = void 0;
  var getBounds = void 0;
  var ctorOpts = void 0;
  var instance = void 0;

  function startDragging(dragManager) {
    dragManager.handleMouseDown(_extends({}, baseMouseEvt, { type: 'mousedown' }));
    expect(dragManager.isDragging()).toBe(true);
  }

  beforeEach(function () {
    bounds = {
      clientXLeft: 50,
      maxValue: 0.9,
      minValue: 0.1,
      width: 100
    };
    getBounds = jest.fn(function () {
      return bounds;
    });
    ctorOpts = {
      getBounds: getBounds,
      tag: tag,
      onMouseEnter: jest.fn(),
      onMouseLeave: jest.fn(),
      onMouseMove: jest.fn(),
      onDragStart: jest.fn(),
      onDragMove: jest.fn(),
      onDragEnd: jest.fn(),
      resetBoundsOnResize: false
    };
    instance = new _DraggableManager2.default(ctorOpts);
  });

  describe('_getPosition()', function () {
    it('invokes the getBounds ctor argument', function () {
      instance._getPosition(0);
      expect(ctorOpts.getBounds.mock.calls).toEqual([[tag]]);
    });

    it('converts clientX to x and [0, 1] value', function () {
      var left = 100;
      var pos = instance._getPosition(left);
      expect(pos).toEqual({
        x: left - bounds.clientXLeft,
        value: (left - bounds.clientXLeft) / bounds.width
      });
    });

    it('clamps x and [0, 1] value based on getBounds().minValue', function () {
      var left = 0;
      var pos = instance._getPosition(left);
      expect(pos).toEqual({
        x: bounds.minValue * bounds.width,
        value: bounds.minValue
      });
    });

    it('clamps x and [0, 1] value based on getBounds().maxValue', function () {
      var left = 10000;
      var pos = instance._getPosition(left);
      expect(pos).toEqual({
        x: bounds.maxValue * bounds.width,
        value: bounds.maxValue
      });
    });
  });

  describe('window resize event listener', function () {
    it('is added in the ctor iff `resetBoundsOnResize` param is truthy', function () {
      var oldFn = window.addEventListener;
      window.addEventListener = jest.fn();

      ctorOpts.resetBoundsOnResize = false;
      instance = new _DraggableManager2.default(ctorOpts);
      expect(window.addEventListener.mock.calls).toEqual([]);
      ctorOpts.resetBoundsOnResize = true;
      instance = new _DraggableManager2.default(ctorOpts);
      expect(window.addEventListener.mock.calls).toEqual([['resize', expect.any(Function)]]);

      window.addEventListener = oldFn;
    });

    it('is removed in `.dispose()` iff `resetBoundsOnResize` param is truthy', function () {
      var oldFn = window.removeEventListener;
      window.removeEventListener = jest.fn();

      ctorOpts.resetBoundsOnResize = false;
      instance = new _DraggableManager2.default(ctorOpts);
      instance.dispose();
      expect(window.removeEventListener.mock.calls).toEqual([]);
      ctorOpts.resetBoundsOnResize = true;
      instance = new _DraggableManager2.default(ctorOpts);
      instance.dispose();
      expect(window.removeEventListener.mock.calls).toEqual([['resize', expect.any(Function)]]);

      window.removeEventListener = oldFn;
    });
  });

  describe('minor mouse events', function () {
    it('throws an error for invalid event types', function () {
      var type = 'invalid-event-type';
      var throwers = [function () {
        return instance.handleMouseEnter(_extends({}, baseMouseEvt, { type: type }));
      }, function () {
        return instance.handleMouseMove(_extends({}, baseMouseEvt, { type: type }));
      }, function () {
        return instance.handleMouseLeave(_extends({}, baseMouseEvt, { type: type }));
      }];
      throwers.forEach(function (thrower) {
        return expect(thrower).toThrow();
      });
    });

    it('does nothing if already dragging', function () {
      startDragging(instance);
      expect(getBounds.mock.calls.length).toBe(1);

      instance.handleMouseEnter(_extends({}, baseMouseEvt, { type: 'mouseenter' }));
      instance.handleMouseMove(_extends({}, baseMouseEvt, { type: 'mousemove' }));
      instance.handleMouseLeave(_extends({}, baseMouseEvt, { type: 'mouseleave' }));
      expect(ctorOpts.onMouseEnter).not.toHaveBeenCalled();
      expect(ctorOpts.onMouseMove).not.toHaveBeenCalled();
      expect(ctorOpts.onMouseLeave).not.toHaveBeenCalled();

      var evt = _extends({}, baseMouseEvt, { type: 'invalid-type' });
      expect(function () {
        return instance.handleMouseEnter(evt);
      }).not.toThrow();

      expect(getBounds.mock.calls.length).toBe(1);
    });

    it('passes data based on the mouse event type to callbacks', function () {
      var x = baseClientX - bounds.clientXLeft;
      var value = (baseClientX - bounds.clientXLeft) / bounds.width;
      var cases = [{
        type: 'mouseenter',
        handler: instance.handleMouseEnter,
        callback: ctorOpts.onMouseEnter,
        updateType: _updateTypes2.default.MOUSE_ENTER
      }, {
        type: 'mousemove',
        handler: instance.handleMouseMove,
        callback: ctorOpts.onMouseMove,
        updateType: _updateTypes2.default.MOUSE_MOVE
      }, {
        type: 'mouseleave',
        handler: instance.handleMouseLeave,
        callback: ctorOpts.onMouseLeave,
        updateType: _updateTypes2.default.MOUSE_LEAVE
      }];

      cases.forEach(function (testCase) {
        var type = testCase.type,
            handler = testCase.handler,
            callback = testCase.callback,
            updateType = testCase.updateType;

        var event = _extends({}, baseMouseEvt, { type: type });
        handler(event);
        expect(callback.mock.calls).toEqual([[{ event: event, tag: tag, value: value, x: x, manager: instance, type: updateType }]]);
      });
    });
  });

  describe('drag events', function () {
    var realWindowAddEvent = void 0;
    var realWindowRmEvent = void 0;

    beforeEach(function () {
      realWindowAddEvent = window.addEventListener;
      realWindowRmEvent = window.removeEventListener;
      window.addEventListener = jest.fn();
      window.removeEventListener = jest.fn();
    });

    afterEach(function () {
      window.addEventListener = realWindowAddEvent;
      window.removeEventListener = realWindowRmEvent;
    });

    it('throws an error for invalid event types', function () {
      expect(function () {
        return instance.handleMouseDown(_extends({}, baseMouseEvt, { type: 'invalid-event-type' }));
      }).toThrow();
    });

    describe('mousedown', function () {
      it('is ignored if already dragging', function () {
        startDragging(instance);
        window.addEventListener.mockReset();
        ctorOpts.onDragStart.mockReset();

        expect(getBounds.mock.calls.length).toBe(1);
        instance.handleMouseDown(_extends({}, baseMouseEvt, { type: 'mousedown' }));
        expect(getBounds.mock.calls.length).toBe(1);

        expect(window.addEventListener).not.toHaveBeenCalled();
        expect(ctorOpts.onDragStart).not.toHaveBeenCalled();
      });

      it('sets `isDragging()` to true', function () {
        instance.handleMouseDown(_extends({}, baseMouseEvt, { type: 'mousedown' }));
        expect(instance.isDragging()).toBe(true);
      });

      it('adds the window mouse listener events', function () {
        instance.handleMouseDown(_extends({}, baseMouseEvt, { type: 'mousedown' }));
        expect(window.addEventListener.mock.calls).toEqual([['mousemove', expect.any(Function)], ['mouseup', expect.any(Function)]]);
      });
    });

    describe('mousemove', function () {
      it('is ignored if not already dragging', function () {
        instance._handleDragEvent(_extends({}, baseMouseEvt, { type: 'mousemove' }));
        expect(ctorOpts.onDragMove).not.toHaveBeenCalled();
        startDragging(instance);
        instance._handleDragEvent(_extends({}, baseMouseEvt, { type: 'mousemove' }));
        expect(ctorOpts.onDragMove).toHaveBeenCalled();
      });
    });

    describe('mouseup', function () {
      it('is ignored if not already dragging', function () {
        instance._handleDragEvent(_extends({}, baseMouseEvt, { type: 'mouseup' }));
        expect(ctorOpts.onDragEnd).not.toHaveBeenCalled();
        startDragging(instance);
        instance._handleDragEvent(_extends({}, baseMouseEvt, { type: 'mouseup' }));
        expect(ctorOpts.onDragEnd).toHaveBeenCalled();
      });

      it('sets `isDragging()` to false', function () {
        startDragging(instance);
        expect(instance.isDragging()).toBe(true);
        instance._handleDragEvent(_extends({}, baseMouseEvt, { type: 'mouseup' }));
        expect(instance.isDragging()).toBe(false);
      });

      it('removes the window mouse listener events', function () {
        startDragging(instance);
        expect(window.removeEventListener).not.toHaveBeenCalled();
        instance._handleDragEvent(_extends({}, baseMouseEvt, { type: 'mouseup' }));
        expect(window.removeEventListener.mock.calls).toEqual([['mousemove', expect.any(Function)], ['mouseup', expect.any(Function)]]);
      });
    });

    it('passes drag event data to the callbacks', function () {
      var x = baseClientX - bounds.clientXLeft;
      var value = (baseClientX - bounds.clientXLeft) / bounds.width;
      var cases = [{
        type: 'mousedown',
        handler: instance.handleMouseDown,
        callback: ctorOpts.onDragStart,
        updateType: _updateTypes2.default.DRAG_START
      }, {
        type: 'mousemove',
        handler: instance._handleDragEvent,
        callback: ctorOpts.onDragMove,
        updateType: _updateTypes2.default.DRAG_MOVE
      }, {
        type: 'mouseup',
        handler: instance._handleDragEvent,
        callback: ctorOpts.onDragEnd,
        updateType: _updateTypes2.default.DRAG_END
      }];

      cases.forEach(function (testCase) {
        var type = testCase.type,
            handler = testCase.handler,
            callback = testCase.callback,
            updateType = testCase.updateType;

        var event = _extends({}, baseMouseEvt, { type: type });
        handler(event);
        expect(callback.mock.calls).toEqual([[{ event: event, tag: tag, value: value, x: x, manager: instance, type: updateType }]]);
      });
    });
  });
});