'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processDeprecation;

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _set2 = require('lodash/set');

var _set3 = _interopRequireDefault(_set2);

var _unset2 = require('lodash/unset');

var _unset3 = _interopRequireDefault(_unset2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Processes a deprecated config property with respect to a configuration.
 * NOTE: This mutates `config`.
 *
 * If the deprecated config property is found to be set on `config`, it is
 * moved to the new config property unless a conflicting setting exists. If
 * `issueWarning` is `true`, warnings are issues when:
 *
 * - The deprecated config property is found to be set on `config`
 * - The value at the deprecated config property is moved to the new property
 * - The value at the deprecated config property is ignored in favor of the value at the new property
 */
//      

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

function processDeprecation(config, deprecation, issueWarning) {
  var formerKey = deprecation.formerKey,
      currentKey = deprecation.currentKey;

  if ((0, _has3.default)(config, formerKey)) {
    var isTransfered = false;
    var isIgnored = false;
    if (!(0, _has3.default)(config, currentKey)) {
      // the new key is not set so transfer the value at the old key
      var value = (0, _get3.default)(config, formerKey);
      (0, _set3.default)(config, currentKey, value);
      isTransfered = true;
    } else {
      isIgnored = true;
    }
    (0, _unset3.default)(config, formerKey);

    if (issueWarning) {
      var warnings = ['"' + formerKey + '" is deprecated, instead use "' + currentKey + '"'];
      if (isTransfered) {
        warnings.push('The value at "' + formerKey + '" has been moved to "' + currentKey + '"');
      }
      if (isIgnored) {
        warnings.push('The value at "' + formerKey + '" is being ignored in favor of the value at "' + currentKey + '"');
      }
      // eslint-disable-next-line no-console
      console.warn(warnings.join('\n'));
    }
  }
}