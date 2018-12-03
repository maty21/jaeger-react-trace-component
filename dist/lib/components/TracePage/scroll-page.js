'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollBy = scrollBy;
exports.scrollTo = scrollTo;
exports.cancel = cancel;

var _Tween = require('./Tween');

var _Tween2 = _interopRequireDefault(_Tween);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DURATION_MS = 350; //      

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

var lastTween = void 0;

// TODO(joe): this util can be modified a bit to be generalized (e.g. take in
// an element as a parameter and use scrollTop instead of window.scrollTo)

function _onTweenUpdate(_ref) {
  var done = _ref.done,
      value = _ref.value;

  window.scrollTo(window.scrollX, value);
  if (done) {
    lastTween = null;
  }
}

function scrollBy(yDelta) {
  var appendToLast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var _window = window,
      scrollY = _window.scrollY;

  var targetFrom = scrollY;
  if (appendToLast && lastTween) {
    var currentDirection = lastTween.to < scrollY ? 'up' : 'down';
    var nextDirection = yDelta < 0 ? 'up' : 'down';
    if (currentDirection === nextDirection) {
      targetFrom = lastTween.to;
    }
  }
  var to = targetFrom + yDelta;
  lastTween = new _Tween2.default({ to: to, duration: DURATION_MS, from: scrollY, onUpdate: _onTweenUpdate });
}

function scrollTo(y) {
  var _window2 = window,
      scrollY = _window2.scrollY;

  lastTween = new _Tween2.default({ duration: DURATION_MS, from: scrollY, to: y, onUpdate: _onTweenUpdate });
}

function cancel() {
  if (lastTween) {
    lastTween.cancel();
    lastTween = undefined;
  }
}