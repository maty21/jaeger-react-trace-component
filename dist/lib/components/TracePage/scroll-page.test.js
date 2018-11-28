'use strict';

var _scrollPage = require('./scroll-page');

var _Tween = require('./Tween');

var _Tween2 = _interopRequireDefault(_Tween);

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
jest.mock('./Tween');

// keep track of instances, manually
// https://github.com/facebook/jest/issues/5019
var tweenInstances = [];

describe('scroll-by', function () {
  beforeEach(function () {
    window.scrollY = 100;
    tweenInstances.length = 0;
    _Tween2.default.mockClear();
    _Tween2.default.mockImplementation(function (opts) {
      var rv = { to: opts.to, onUpdate: opts.onUpdate };
      Object.keys(_Tween2.default.prototype).forEach(function (name) {
        if (name !== 'constructor') {
          rv[name] = jest.fn();
        }
      });
      tweenInstances.push(rv);
      return rv;
    });
  });

  afterEach(function () {
    (0, _scrollPage.cancel)();
  });

  describe('scrollBy()', function () {
    describe('when `appendToLast` is `false`', function () {
      it('scrolls from `window.scrollY` to `window.scrollY + yDelta`', function () {
        var yDelta = 10;
        (0, _scrollPage.scrollBy)(yDelta);
        var spec = expect.objectContaining({ to: window.scrollY + yDelta });
        expect(_Tween2.default.mock.calls).toEqual([[spec]]);
      });
    });

    describe('when `appendToLast` is true', function () {
      it('is the same as `appendToLast === false` without an in-progress scroll', function () {
        var yDelta = 10;
        (0, _scrollPage.scrollBy)(yDelta, true);
        expect(_Tween2.default.mock.calls.length).toBe(1);
        (0, _scrollPage.scrollBy)(yDelta, false);
        expect(_Tween2.default.mock.calls[0]).toEqual(_Tween2.default.mock.calls[1]);
      });

      it('is additive when an in-progress scroll is the same direction', function () {
        var yDelta = 10;
        var spec = expect.objectContaining({ to: window.scrollY + 2 * yDelta });
        (0, _scrollPage.scrollBy)(yDelta);
        (0, _scrollPage.scrollBy)(yDelta, true);
        expect(_Tween2.default.mock.calls.length).toBe(2);
        expect(_Tween2.default.mock.calls[1]).toEqual([spec]);
      });

      it('ignores the in-progress scroll is the other direction', function () {
        var yDelta = 10;
        var spec = expect.objectContaining({ to: window.scrollY - yDelta });
        (0, _scrollPage.scrollBy)(yDelta);
        (0, _scrollPage.scrollBy)(-yDelta, true);
        expect(_Tween2.default.mock.calls.length).toBe(2);
        expect(_Tween2.default.mock.calls[1]).toEqual([spec]);
      });
    });
  });

  describe('scrollTo', function () {
    it('scrolls to `y`', function () {
      var to = 10;
      var spec = expect.objectContaining({ to: to });
      (0, _scrollPage.scrollTo)(to);
      expect(_Tween2.default.mock.calls).toEqual([[spec]]);
    });

    it('ignores the in-progress scroll', function () {
      var to = 10;
      var spec = expect.objectContaining({ to: to });
      (0, _scrollPage.scrollTo)(Math.random());
      (0, _scrollPage.scrollTo)(to);
      expect(_Tween2.default.mock.calls.length).toBe(2);
      expect(_Tween2.default.mock.calls[1]).toEqual([spec]);
    });
  });

  describe('cancel', function () {
    it('cancels the in-progress scroll', function () {
      (0, _scrollPage.scrollTo)(10);
      // there is now an in-progress tween
      expect(tweenInstances.length).toBe(1);
      var tw = tweenInstances[0];
      (0, _scrollPage.cancel)();
      expect(tw.cancel.mock.calls).toEqual([[]]);
    });

    it('is a noop if there is not an in-progress scroll', function () {
      (0, _scrollPage.scrollTo)(10);
      // there is now an in-progress tween
      expect(tweenInstances.length).toBe(1);
      var tw = tweenInstances[0];
      (0, _scrollPage.cancel)();
      expect(tw.cancel.mock.calls).toEqual([[]]);
      tw.cancel.mockReset();
      // now, we check to see if `cancel()` has an effect on the last created tween
      (0, _scrollPage.cancel)();
      expect(tw.cancel.mock.calls.length).toBe(0);
    });
  });

  describe('_onTweenUpdate', function () {
    var oldScrollTo = void 0;

    beforeEach(function () {
      oldScrollTo = window.scrollTo;
      window.scrollTo = jest.fn();
    });

    afterEach(function () {
      window.scrollTo = oldScrollTo;
    });

    it('scrolls to `value`', function () {
      var value = 123;
      // cause a `Tween` to be created to get a reference to _onTweenUpdate
      (0, _scrollPage.scrollTo)(10);
      var onUpdate = tweenInstances[0].onUpdate;

      onUpdate({ value: value, done: false });
      expect(window.scrollTo.mock.calls.length).toBe(1);
      expect(window.scrollTo.mock.calls[0][1]).toBe(value);
    });

    it('discards the in-progress scroll if the scroll is done', function () {
      // cause a `Tween` to be created to get a reference to _onTweenUpdate
      (0, _scrollPage.scrollTo)(10);
      var _tweenInstances$ = tweenInstances[0],
          onUpdate = _tweenInstances$.onUpdate,
          twCancel = _tweenInstances$.cancel;

      onUpdate({ value: 123, done: true });
      // if the tween is not discarded, `cancel()` will cancel it
      (0, _scrollPage.cancel)();
      expect(twCancel.mock.calls.length).toBe(0);
    });
  });
});