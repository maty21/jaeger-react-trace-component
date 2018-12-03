'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _getConfig = require('./get-config');

var _getConfig2 = _interopRequireDefault(_getConfig);

var _processDeprecation = require('./process-deprecation');

var _processDeprecation2 = _interopRequireDefault(_processDeprecation);

var _defaultConfig = require('../../constants/default-config');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

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

/* eslint-disable no-console, import/first */

jest.mock('./process-deprecation');

describe('getConfig()', function () {
  var oldWarn = void 0;
  var warnFn = void 0;

  beforeEach(function () {
    oldWarn = console.warn;
    warnFn = jest.fn();
    console.warn = warnFn;
  });

  afterEach(function () {
    console.warn = oldWarn;
  });

  describe('`window.getJaegerUiConfig` is not a function', function () {
    it('warns once', function () {
      (0, _getConfig2.default)();
      expect(warnFn.mock.calls.length).toBe(1);
      (0, _getConfig2.default)();
      expect(warnFn.mock.calls.length).toBe(1);
    });

    it('returns the default config', function () {
      expect((0, _getConfig2.default)()).toEqual(_defaultConfig2.default);
    });
  });

  describe('`window.getJaegerUiConfig` is a function', function () {
    var embedded = void 0;
    var getJaegerUiConfig = void 0;

    beforeEach(function () {
      embedded = {};
      getJaegerUiConfig = jest.fn(function () {
        return embedded;
      });
      window.getJaegerUiConfig = getJaegerUiConfig;
    });

    it('returns the default config when the embedded config is `null`', function () {
      embedded = null;
      expect((0, _getConfig2.default)()).toEqual(_defaultConfig2.default);
    });

    it('merges the defaultConfig with the embedded config ', function () {
      embedded = { novel: 'prop' };
      expect((0, _getConfig2.default)()).toEqual(_extends({}, _defaultConfig2.default, embedded));
    });

    describe('overwriting precedence and merging', function () {
      describe('fields not in __mergeFields', function () {
        it('gives precedence to the embedded config', function () {
          var mergeFields = new Set(_defaultConfig2.default.__mergeFields);
          var keys = Object.keys(_defaultConfig2.default).filter(function (k) {
            return !mergeFields.has(k);
          });
          embedded = {};
          keys.forEach(function (key) {
            embedded[key] = key;
          });
          expect((0, _getConfig2.default)()).toEqual(_extends({}, _defaultConfig2.default, embedded));
        });
      });

      describe('fields in __mergeFields', function () {
        it('gives precedence to non-objects in embedded', function () {
          embedded = {};
          _defaultConfig2.default.__mergeFields.forEach(function (k, i) {
            embedded[k] = i ? true : null;
          });
          expect((0, _getConfig2.default)()).toEqual(_extends({}, _defaultConfig2.default, embedded));
        });

        it('merges object values', function () {
          embedded = {};
          var key = _defaultConfig2.default.__mergeFields[0];
          if (!key) {
            throw new Error('invalid __mergeFields');
          }
          embedded[key] = { a: true, b: false };
          var expected = _extends({}, _defaultConfig2.default, embedded);
          expected[key] = _extends({}, _defaultConfig2.default[key], embedded[key]);
          expect((0, _getConfig2.default)()).toEqual(expected);
        });
      });
    });

    it('processes deprecations every time `getConfig` is invoked', function () {
      _processDeprecation2.default.mockClear();
      (0, _getConfig2.default)();
      expect(_processDeprecation2.default.mock.calls.length).toBe(_defaultConfig.deprecations.length);
      (0, _getConfig2.default)();
      expect(_processDeprecation2.default.mock.calls.length).toBe(2 * _defaultConfig.deprecations.length);
    });
  });
});

describe('getConfigValue(...)', function () {
  it('returns embedded paths, e.g. "a.b"', function () {
    expect((0, _getConfig.getConfigValue)('dependencies.menuEnabled')).toBe(true);
  });

  it('handles non-existent paths"', function () {
    expect((0, _getConfig.getConfigValue)('not.a.real.path')).toBe(undefined);
  });
});