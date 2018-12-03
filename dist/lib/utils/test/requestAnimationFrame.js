"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requestAnimationFrame;
exports.cancelAnimationFrame = cancelAnimationFrame;
exports.polyfill = polyfill;
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

var DEFAULT_ELAPSE = 0;

function requestAnimationFrame(callback) {
  return setTimeout(callback, DEFAULT_ELAPSE);
}

function cancelAnimationFrame(id) {
  return clearTimeout(id);
}

function polyfill(target) {
  var msElapse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_ELAPSE;

  var _target = target || global;
  if (!_target.requestAnimationFrame) {
    if (msElapse === DEFAULT_ELAPSE) {
      // eslint-disable-next-line no-param-reassign
      _target.requestAnimationFrame = requestAnimationFrame;
    } else {
      // eslint-disable-next-line no-param-reassign, no-shadow
      _target.requestAnimationFrame = function (callback) {
        return setTimeout(callback, msElapse);
      };
    }
  }
  if (!_target.cancelAnimationFrame) {
    // eslint-disable-next-line no-param-reassign
    _target.cancelAnimationFrame = cancelAnimationFrame;
  }
}