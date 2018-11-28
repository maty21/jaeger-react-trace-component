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

var _Tween = require('./Tween');

var _Tween2 = _interopRequireDefault(_Tween);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Tween', function () {
  var oldNow = Date.now;
  var nowFn = jest.fn();
  var oldSetTimeout = window.setTimeout;
  var setTimeoutFn = jest.fn();
  var oldRaf = window.requestAnimationFrame;
  var rafFn = jest.fn();

  var baseOptions = { duration: 10, from: 0, to: 1 };

  Date.now = nowFn;
  window.setTimeout = setTimeoutFn;
  window.requestAnimationFrame = rafFn;

  beforeEach(function () {
    nowFn.mockReset();
    nowFn.mockReturnValue(0);
    setTimeoutFn.mockReset();
    rafFn.mockReset();
  });

  afterAll(function () {
    Date.now = oldNow;
    window.setTimeout = oldSetTimeout;
    window.requestAnimationFrame = oldRaf;
  });

  describe('ctor', function () {
    it('set startTime to the current time', function () {
      var n = Math.random();
      nowFn.mockReturnValue(n);
      var tween = new _Tween2.default(baseOptions);
      expect(tween.startTime).toBe(n);
    });

    it('adds delay to the startTime', function () {
      var n = Math.random();
      nowFn.mockReturnValue(n);
      var tween = new _Tween2.default(_extends({}, baseOptions, { delay: 10 }));
      expect(tween.startTime).toBe(n + 10);
    });

    describe('with callbacks', function () {
      it('schedules setTimeout if there is a delay', function () {
        var delay = 10;
        var tween = new _Tween2.default(_extends({}, baseOptions, { delay: delay, onUpdate: jest.fn() }));
        expect(setTimeoutFn).lastCalledWith(tween._frameCallback, delay);
      });

      it('schedules animation frame if there isnt a delay', function () {
        var tween = new _Tween2.default(_extends({}, baseOptions, { onUpdate: jest.fn() }));
        expect(rafFn).lastCalledWith(tween._frameCallback);
      });
    });
  });

  describe('getCurrent()', function () {
    it('returns `{done: false, value: from}` when time is before the delay is finished', function () {
      var tween = new _Tween2.default(_extends({}, baseOptions, { delay: 1 }));
      var current = tween.getCurrent();
      expect(current).toEqual({ done: false, value: baseOptions.from });
    });

    describe('in progress tweens', function () {
      it('returns `{done: false...`}', function () {
        var tween = new _Tween2.default(baseOptions);
        nowFn.mockReturnValue(1);
        var current = tween.getCurrent();
        expect(current.done).toBe(false);
        expect(nowFn()).toBeLessThan(tween.startTime + tween.duration);
        expect(nowFn()).toBeGreaterThan(tween.startTime);
      });

      it('progresses `{..., value} as time progresses', function () {
        var tween = new _Tween2.default(baseOptions);
        var lastValue = tween.getCurrent().value;
        for (var i = 1; i < baseOptions.duration; i++) {
          nowFn.mockReturnValue(i);

          var _tween$getCurrent = tween.getCurrent(),
              done = _tween$getCurrent.done,
              value = _tween$getCurrent.value;

          expect(done).toBe(false);
          expect(value).toBeGreaterThan(lastValue);
          lastValue = value;
        }
      });
    });

    it('returns `{done: true, value: to}` when the time is past the duration', function () {
      var tween = new _Tween2.default(baseOptions);
      nowFn.mockReturnValue(baseOptions.duration);
      var current = tween.getCurrent();
      expect(current).toEqual({ done: true, value: baseOptions.to });
    });
  });

  describe('_frameCallback', function () {
    it('freezes the callback argument', function () {
      var current = void 0;
      var fn = jest.fn(function (_current) {
        current = _current;
      });
      var tween = new _Tween2.default(_extends({}, baseOptions, { onUpdate: fn }));
      tween._frameCallback();
      expect(current).toBeDefined();
      var copy = _extends({}, current);
      try {
        current.done = !current.done;
        // eslint-disable-next-line no-empty
      } catch (_) {}
      expect(current).toEqual(copy);
    });

    it('calls onUpdate if there is an onUpdate callback', function () {
      var fn = jest.fn();
      var tween = new _Tween2.default(_extends({}, baseOptions, { onUpdate: fn }));
      tween._frameCallback();
      var current = tween.getCurrent();
      expect(current).toBeDefined();
      expect(fn).lastCalledWith(current);
    });

    it('does not call onComplete if there is an onComplete callback and the tween is not complete', function () {
      var fn = jest.fn();
      var tween = new _Tween2.default(_extends({}, baseOptions, { onComplete: fn }));
      tween._frameCallback();
      expect(fn.mock.calls.length).toBe(0);
    });

    it('calls onComplete if there is an onComplete callback and the tween is complete', function () {
      var fn = jest.fn();
      var tween = new _Tween2.default(_extends({}, baseOptions, { onComplete: fn }));
      nowFn.mockReturnValue(nowFn() + baseOptions.duration);
      tween._frameCallback();
      var current = tween.getCurrent();
      expect(fn.mock.calls).toEqual([[current]]);
      expect(current.done).toBe(true);
    });

    it('schedules an animatinon frame if the tween is not complete', function () {
      expect(rafFn.mock.calls.length).toBe(0);
      var tween = new _Tween2.default(_extends({}, baseOptions, { onUpdate: function onUpdate() {} }));
      nowFn.mockReturnValue(nowFn() + 0.5 * baseOptions.duration);
      rafFn.mockReset();
      tween._frameCallback();
      expect(rafFn.mock.calls).toEqual([[tween._frameCallback]]);
    });
  });

  describe('cancel()', function () {
    it('cancels scheduled timeouts or animation frames', function () {
      var oldClearTimeout = window.clearTimeout;
      var oldCancelRaf = window.cancelAnimationFrame;
      var clearFn = jest.fn();
      window.clearTimeout = clearFn;
      var cancelFn = jest.fn();
      window.cancelAnimationFrame = cancelFn;

      var tween = new _Tween2.default(baseOptions);
      var id = 1;
      tween.timeoutID = id;
      tween.requestID = id;
      tween.cancel();
      expect(clearFn.mock.calls).toEqual([[id]]);
      expect(cancelFn.mock.calls).toEqual([[id]]);
      expect(tween.timeoutID).toBe(undefined);
      expect(tween.requestID).toBe(undefined);

      window.clearTimeout = oldClearTimeout;
      window.cancelAnimationFrame = oldCancelRaf;
    });

    it('releases references to callbacks', function () {
      var tween = new _Tween2.default(_extends({}, baseOptions, { onComplete: function onComplete() {}, onUpdate: function onUpdate() {} }));
      tween.cancel();
      expect(tween.callbackComplete).toBe(undefined);
      expect(tween.callbackUpdate).toBe(undefined);
    });
  });
});