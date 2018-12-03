'use strict';

var _utils = require('./utils');

var _traceGenerators = require('../../../demo/trace-generators');

var _traceGenerators2 = _interopRequireDefault(_traceGenerators);

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

describe('TraceTimelineViewer/utils', function () {
  describe('getViewedBounds()', function () {
    it('works for the full range', function () {
      var args = { min: 1, max: 2, start: 1, end: 2, viewStart: 0, viewEnd: 1 };

      var _getViewedBounds = (0, _utils.getViewedBounds)(args),
          start = _getViewedBounds.start,
          end = _getViewedBounds.end;

      expect(start).toBe(0);
      expect(end).toBe(1);
    });

    it('works for a sub-range with a full view', function () {
      var args = { min: 1, max: 2, start: 1.25, end: 1.75, viewStart: 0, viewEnd: 1 };

      var _getViewedBounds2 = (0, _utils.getViewedBounds)(args),
          start = _getViewedBounds2.start,
          end = _getViewedBounds2.end;

      expect(start).toBe(0.25);
      expect(end).toBe(0.75);
    });

    it('works for a sub-range that fills the view', function () {
      var args = { min: 1, max: 2, start: 1.25, end: 1.75, viewStart: 0.25, viewEnd: 0.75 };

      var _getViewedBounds3 = (0, _utils.getViewedBounds)(args),
          start = _getViewedBounds3.start,
          end = _getViewedBounds3.end;

      expect(start).toBe(0);
      expect(end).toBe(1);
    });

    it('works for a sub-range that within a sub-view', function () {
      var args = { min: 100, max: 200, start: 130, end: 170, viewStart: 0.1, viewEnd: 0.9 };

      var _getViewedBounds4 = (0, _utils.getViewedBounds)(args),
          start = _getViewedBounds4.start,
          end = _getViewedBounds4.end;

      expect(start).toBe(0.25);
      expect(end).toBe(0.75);
    });
  });

  describe('spanHasTag() and variants', function () {
    it('returns true iff the key/value pair is found', function () {
      var tags = _traceGenerators2.default.tags();
      tags.push({ key: 'span.kind', value: 'server' });
      expect((0, _utils.spanHasTag)('span.kind', 'client', { tags: tags })).toBe(false);
      expect((0, _utils.spanHasTag)('span.kind', 'client', { tags: tags })).toBe(false);
      expect((0, _utils.spanHasTag)('span.kind', 'server', { tags: tags })).toBe(true);
    });

    var spanTypeTestCases = [{ fn: _utils.isClientSpan, name: 'isClientSpan', key: 'span.kind', value: 'client' }, { fn: _utils.isServerSpan, name: 'isServerSpan', key: 'span.kind', value: 'server' }, { fn: _utils.isErrorSpan, name: 'isErrorSpan', key: 'error', value: true }, { fn: _utils.isErrorSpan, name: 'isErrorSpan', key: 'error', value: 'true' }];

    spanTypeTestCases.forEach(function (testCase) {
      var msg = testCase.name + '() is true only when a ' + testCase.key + '=' + testCase.value + ' tag is present';
      it(msg, function () {
        var span = { tags: _traceGenerators2.default.tags() };
        expect(testCase.fn(span)).toBe(false);
        span.tags.push(testCase);
        expect(testCase.fn(span)).toBe(true);
      });
    });
  });

  describe('spanContainsErredSpan()', function () {
    it('returns true only when a descendant has an error tag', function () {
      var errorTag = { key: 'error', type: 'bool', value: true };
      var getTags = function getTags(withError) {
        return withError ? _traceGenerators2.default.tags().concat(errorTag) : _traceGenerators2.default.tags();
      };

      // Using a string to generate the test spans. Each line results in a span. The
      // left number indicates whether or not the generated span has a descendant
      // with an error tag (the expectation). The length of the line indicates the
      // depth of the span (i.e. further right is higher depth). The right number
      // indicates whether or not the span has an error tag.
      var config = '\n        1   0\n        1     0\n        0       1\n        0     0\n        1     0\n        1       1\n        0         1\n        0           0\n        1         0\n        0           1\n        0   0\n      '.trim().split('\n').map(function (s) {
        return s.trim();
      });
      // Get the expectation, str -> number -> bool
      var expectations = config.map(function (s) {
        return Boolean(Number(s[0]));
      });
      var spans = config.map(function (line) {
        return {
          depth: line.length,
          tags: getTags(+line.slice(-1))
        };
      });

      expectations.forEach(function (target, i) {
        // include the index in the expect condition to know which span failed
        // (if there is a failure, that is)
        var result = [i, (0, _utils.spanContainsErredSpan)(spans, i)];
        expect(result).toEqual([i, target]);
      });
    });
  });

  describe('findServerChildSpan()', function () {
    var spans = void 0;

    beforeEach(function () {
      spans = [{ depth: 0, tags: [{ key: 'span.kind', value: 'client' }] }, { depth: 1, tags: [] }, { depth: 1, tags: [{ key: 'span.kind', value: 'server' }] }, { depth: 1, tags: [{ key: 'span.kind', value: 'third-kind' }] }, { depth: 1, tags: [{ key: 'span.kind', value: 'server' }] }];
    });

    it('returns falsy if the frist span is not a client', function () {
      expect((0, _utils.findServerChildSpan)(spans.slice(1))).toBeFalsy();
    });

    it('returns the first server span', function () {
      var span = (0, _utils.findServerChildSpan)(spans);
      expect(span).toBe(spans[2]);
    });

    it('bails when a non-child-depth span is encountered', function () {
      spans[1].depth++;
      expect((0, _utils.findServerChildSpan)(spans)).toBeFalsy();
      spans[1].depth = spans[0].depth;
      expect((0, _utils.findServerChildSpan)(spans)).toBeFalsy();
    });
  });
});