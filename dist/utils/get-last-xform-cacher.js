"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLastXformCacher;
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
 * Given a transformer function, returns a function that invokes the
 * transformer on the argument and caches the transformation before returning
 * it. If the source value changes, the transformation is recalculated, cached
 * and returned.
 *
 * @param  {function} xformer The transformer function, the most recent result
 *                            of which is cached.
 * @return {function} A wrapper around the transformer function which caches
 *                    the last transformation, returning the cached value if
 *                    the source value is the same.
 */
function getLastXformCacher(xformer) {
  var lastArgs = null;
  var lastXformed = null;

  return function getOrCache() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var sameArgs = lastArgs && lastArgs.length === args.length && lastArgs.every(function (lastArg, i) {
      return lastArg === args[i];
    });
    if (sameArgs) {
      return lastXformed;
    }
    lastArgs = args;
    lastXformed = xformer.apply(undefined, args);
    return lastXformed;
  };
}