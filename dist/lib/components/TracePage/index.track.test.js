'use strict';

var _throttle2 = require('lodash/throttle');

var _throttle3 = _interopRequireDefault(_throttle2);

var _index = require('./index.track');

var _tracking = require('../../utils/tracking');

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

jest.mock('lodash/throttle', function () {
  return jest.fn(function (fn) {
    return fn;
  });
});
jest.mock('../../utils/tracking');

describe('trackFilter', function () {
  beforeEach(function () {
    _tracking.trackEvent.mockClear();
  });

  it('uses lodash throttle with 750ms and leading: false', function () {
    var calls = _throttle3.default.mock.calls;
    expect(calls.length).toBe(2);
    expect(calls).toEqual([[expect.any(Function), 750, { leading: false }], [expect.any(Function), 750, { leading: false }]]);
  });

  it('tracks filter set when setting values', function () {
    expect(_tracking.trackEvent.mock.calls.length).toBe(0);
    (0, _index.trackFilter)('abc');
    expect(_tracking.trackEvent.mock.calls.length).toBe(1);
    expect(_tracking.trackEvent.mock.calls[0]).toEqual([_index.CATEGORY_FILTER, _index.ACTION_FILTER_SET]);
  });

  it('tracks filter clear when clearing the value', function () {
    expect(_tracking.trackEvent.mock.calls.length).toBe(0);
    (0, _index.trackFilter)();
    expect(_tracking.trackEvent.mock.calls.length).toBe(1);
    expect(_tracking.trackEvent.mock.calls[0]).toEqual([_index.CATEGORY_FILTER, _index.ACTION_FILTER_CLEAR]);
  });
});

describe('trackRange', function () {
  beforeEach(function () {
    _tracking.trackEvent.mockClear();
  });

  var cases = [{
    msg: 'returns shift if start is unchanged',
    rangeType: _index.ACTION_RANGE_SHIFT,
    source: '' + Math.random(),
    from: [0, 0.5],
    to: [0, 0.6]
  }, {
    msg: 'returns shift if end is unchanged',
    rangeType: _index.ACTION_RANGE_SHIFT,
    source: '' + Math.random(),
    from: [0, 0.5],
    to: [0.1, 0.5]
  }, {
    msg: 'returns shift if increasing start and end by same amount',
    rangeType: _index.ACTION_RANGE_SHIFT,
    source: '' + Math.random(),
    from: [0.25, 0.75],
    to: [0.5, 1]
  }, {
    msg: 'returns shift if decreasing start and end by same amount',
    rangeType: _index.ACTION_RANGE_SHIFT,
    source: '' + Math.random(),
    from: [0.25, 0.75],
    to: [0, 0.5]
  }, {
    msg: 'returns reframe if increasing start and end by different amounts',
    rangeType: _index.ACTION_RANGE_REFRAME,
    source: '' + Math.random(),
    from: [0.25, 0.75],
    to: [0.35, 1]
  }, {
    msg: 'returns reframe if decreasing start and end by different amounts',
    rangeType: _index.ACTION_RANGE_REFRAME,
    source: '' + Math.random(),
    from: [0.25, 0.75],
    to: [0, 0.65]
  }, {
    msg: 'returns reframe when widening to a superset',
    rangeType: _index.ACTION_RANGE_REFRAME,
    source: '' + Math.random(),
    from: [0.25, 0.75],
    to: [0, 1]
  }, {
    msg: 'returns reframe when contracting to a subset',
    rangeType: _index.ACTION_RANGE_REFRAME,
    source: '' + Math.random(),
    from: [0.25, 0.75],
    to: [0.45, 0.55]
  }];

  cases.forEach(function (_case) {
    var msg = _case.msg,
        rangeType = _case.rangeType,
        source = _case.source,
        from = _case.from,
        to = _case.to;


    it(msg, function () {
      expect(_tracking.trackEvent.mock.calls.length).toBe(0);
      (0, _index.trackRange)(source, from, to);
      expect(_tracking.trackEvent.mock.calls.length).toBe(1);
      expect(_tracking.trackEvent.mock.calls[0]).toEqual([_index.CATEGORY_RANGE, rangeType, source]);
    });
  });
});