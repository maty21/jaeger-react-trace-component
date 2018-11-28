'use strict';

var _processDeprecation = require('./process-deprecation');

var _processDeprecation2 = _interopRequireDefault(_processDeprecation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('processDeprecation()', function () {
  var currentKey = 'current.key';
  var formerKey = 'former.key';
  var deprecation = { currentKey: currentKey, formerKey: formerKey };

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

  it('does nothing if `formerKey` is not set', function () {
    var config = {};
    (0, _processDeprecation2.default)(config, deprecation, true);
    expect(config).toEqual({});
    expect(warnFn.mock.calls.length).toBe(0);
  });
  describe('`formerKey` is set', function () {
    var value = void 0;
    var config = void 0;

    describe('`currentKey` is not set', function () {
      function generateConfig() {
        value = Math.random();
        config = {
          former: { key: value }
        };
      }

      beforeEach(function () {
        generateConfig();
        (0, _processDeprecation2.default)(config, deprecation, false);
      });

      it('moves the value to `currentKey`', function () {
        expect(config.current.key).toBe(value);
      });

      it('deletes `currentKey`', function () {
        expect(config.former.key).not.toBeDefined();
      });

      it('does not `console.warn()` when `issueWarning` is `false`', function () {
        expect(warnFn.mock.calls.length).toBe(0);
      });

      it('`console.warn()`s when `issueWarning` is `true`', function () {
        generateConfig();
        (0, _processDeprecation2.default)(config, deprecation, true);
        expect(warnFn.mock.calls.length).toBe(1);
        expect(warnFn.mock.calls[0].length).toBe(1);
        var msg = warnFn.mock.calls[0][0];
        expect(msg).toMatch(/is deprecated/);
        expect(msg).toMatch(/has been moved/);
      });
    });

    describe('`currentKey` is set', function () {
      function generateConfig() {
        value = Math.random();
        config = {
          former: { key: value * 2 },
          current: { key: value }
        };
      }

      beforeEach(function () {
        generateConfig();
        (0, _processDeprecation2.default)(config, deprecation, false);
      });

      it('leaves `currentKey` as-is', function () {
        expect(config.current.key).toBe(value);
      });

      it('deletes `former`', function () {
        expect(config.former.key).not.toBeDefined();
      });

      it('does not `console.warn()` when `issueWarning` is `false`', function () {
        expect(warnFn.mock.calls.length).toBe(0);
      });

      it('`console.warn()`s when `issueWarning` is `true`', function () {
        generateConfig();
        (0, _processDeprecation2.default)(config, deprecation, true);
        expect(warnFn.mock.calls.length).toBe(1);
        expect(warnFn.mock.calls[0].length).toBe(1);
        var msg = warnFn.mock.calls[0][0];
        expect(msg).toMatch(/is deprecated/);
        expect(msg).toMatch(/is being ignored/);
      });
    });
  });
}); // Copyright (c) 2017 Uber Technologies, Inc.
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

/* eslint-disable no-console */