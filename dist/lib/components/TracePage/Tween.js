'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //      

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

var _tweenFunctions = require('tween-functions');

var _tweenFunctions2 = _interopRequireDefault(_tweenFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tween = function () {
  function Tween(_ref) {
    var _this = this;

    var duration = _ref.duration,
        from = _ref.from,
        to = _ref.to,
        delay = _ref.delay,
        onUpdate = _ref.onUpdate,
        onComplete = _ref.onComplete;

    _classCallCheck(this, Tween);

    this._frameCallback = function () {
      _this.timeoutID = undefined;
      _this.requestID = undefined;
      var current = Object.freeze(_this.getCurrent());
      if (_this.callbackUpdate) {
        _this.callbackUpdate(current);
      }
      if (_this.callbackComplete && current.done) {
        _this.callbackComplete(current);
      }
      if (current.done) {
        _this.callbackComplete = undefined;
        _this.callbackUpdate = undefined;
      } else {
        _this.requestID = window.requestAnimationFrame(_this._frameCallback);
      }
    };

    this.startTime = Date.now() + (delay || 0);
    this.duration = duration;
    this.from = from;
    this.to = to;
    if (!onUpdate && !onComplete) {
      this.callbackComplete = undefined;
      this.callbackUpdate = undefined;
      this.timeoutID = undefined;
      this.requestID = undefined;
    } else {
      this.callbackComplete = onComplete;
      this.callbackUpdate = onUpdate;
      if (delay) {
        this.timeoutID = setTimeout(this._frameCallback, delay);
        this.requestID = undefined;
      } else {
        this.requestID = window.requestAnimationFrame(this._frameCallback);
        this.timeoutID = undefined;
      }
    }
  }

  _createClass(Tween, [{
    key: 'cancel',
    value: function cancel() {
      if (this.timeoutID != null) {
        clearTimeout(this.timeoutID);
        this.timeoutID = undefined;
      }
      if (this.requestID != null) {
        window.cancelAnimationFrame(this.requestID);
        this.requestID = undefined;
      }
      this.callbackComplete = undefined;
      this.callbackUpdate = undefined;
    }
  }, {
    key: 'getCurrent',
    value: function getCurrent() {
      var t = Date.now() - this.startTime;
      if (t <= 0) {
        // still in the delay period
        return { done: false, value: this.from };
      }
      if (t >= this.duration) {
        // after the expiration
        return { done: true, value: this.to };
      }
      // mid-tween
      return { done: false, value: _tweenFunctions2.default.easeOutQuint(t, this.from, this.to, this.duration) };
    }
  }]);

  return Tween;
}();

exports.default = Tween;