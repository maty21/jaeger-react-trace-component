'use strict';

var _Positions = require('./Positions');

var _Positions2 = _interopRequireDefault(_Positions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Positions', function () {
  var bufferLen = 1;
  var getHeight = function getHeight(i) {
    return i * 2 + 2;
  };
  var ps = void 0;

  beforeEach(function () {
    ps = new _Positions2.default(bufferLen);
    ps.profileData(10);
  });

  describe('constructor()', function () {
    it('intializes member variables correctly', function () {
      ps = new _Positions2.default(1);
      expect(ps.ys).toEqual([]);
      expect(ps.heights).toEqual([]);
      expect(ps.bufferLen).toBe(1);
      expect(ps.dataLen).toBe(-1);
      expect(ps.lastI).toBe(-1);
    });
  });

  describe('profileData(...)', function () {
    it('manages increases in data length correctly', function () {
      expect(ps.dataLen).toBe(10);
      expect(ps.ys.length).toBe(10);
      expect(ps.heights.length).toBe(10);
      expect(ps.lastI).toBe(-1);
    });

    it('manages decreases in data length correctly', function () {
      ps.lastI = 9;
      ps.profileData(5);
      expect(ps.dataLen).toBe(5);
      expect(ps.ys.length).toBe(5);
      expect(ps.heights.length).toBe(5);
      expect(ps.lastI).toBe(4);
    });

    it('does nothing when data length is unchanged', function () {
      expect(ps.dataLen).toBe(10);
      expect(ps.ys.length).toBe(10);
      expect(ps.heights.length).toBe(10);
      expect(ps.lastI).toBe(-1);
      ps.profileData(10);
      expect(ps.dataLen).toBe(10);
      expect(ps.ys.length).toBe(10);
      expect(ps.heights.length).toBe(10);
      expect(ps.lastI).toBe(-1);
    });
  });

  describe('calcHeights()', function () {
    it('updates lastI correctly', function () {
      ps.calcHeights(1, getHeight);
      expect(ps.lastI).toBe(bufferLen + 1);
    });

    it('saves the heights and y-values up to `lastI <= max + bufferLen`', function () {
      var ys = [0, 2, 6, 12];
      ys.length = 10;
      var heights = [2, 4, 6];
      heights.length = 10;
      ps.calcHeights(1, getHeight);
      expect(ps.ys).toEqual(ys);
      expect(ps.heights).toEqual(heights);
    });

    it('does nothing when `max + buffer <= lastI`', function () {
      ps.calcHeights(2, getHeight);
      var ys = ps.ys.slice();
      var heights = ps.heights.slice();
      ps.calcHeights(1, getHeight);
      expect(ps.ys).toEqual(ys);
      expect(ps.heights).toEqual(heights);
    });

    describe('recalculates values up to `max + bufferLen` when `max + buffer <= lastI` and `forcedLastI = 0` is passed', function () {
      beforeEach(function () {
        // the initial state for the test
        ps.calcHeights(2, getHeight);
      });

      it('test-case has a valid initial state', function () {
        var initialYs = [0, 2, 6, 12, 20];
        initialYs.length = 10;
        var initialHeights = [2, 4, 6, 8];
        initialHeights.length = 10;
        expect(ps.ys).toEqual(initialYs);
        expect(ps.heights).toEqual(initialHeights);
        expect(ps.lastI).toBe(3);
      });

      it('recalcualtes the y-values correctly', function () {
        // recalc a sub-set of the calcualted values using a different getHeight
        ps.calcHeights(1, function () {
          return 2;
        }, 0);
        var ys = [0, 2, 4, 6, 20];
        ys.length = 10;
        expect(ps.ys).toEqual(ys);
      });
      it('recalcualtes the heights correctly', function () {
        // recalc a sub-set of the calcualted values using a different getHeight
        ps.calcHeights(1, function () {
          return 2;
        }, 0);
        var heights = [2, 2, 2, 8];
        heights.length = 10;
        expect(ps.heights).toEqual(heights);
      });
      it('saves lastI correctly', function () {
        // recalc a sub-set of the calcualted values
        ps.calcHeights(1, getHeight, 0);
        expect(ps.lastI).toBe(2);
      });
    });

    it('limits caclulations to the known data length', function () {
      ps.calcHeights(999, getHeight);
      expect(ps.lastI).toBe(ps.dataLen - 1);
    });
  });

  describe('calcYs()', function () {
    it('scans forward until `yValue` is met or exceeded', function () {
      ps.calcYs(11, getHeight);
      var ys = [0, 2, 6, 12, 20];
      ys.length = 10;
      var heights = [2, 4, 6, 8];
      heights.length = 10;
      expect(ps.ys).toEqual(ys);
      expect(ps.heights).toEqual(heights);
    });

    it('exits early if the known y-values exceed `yValue`', function () {
      ps.calcYs(11, getHeight);
      var spy = jest.spyOn(ps, 'calcHeights');
      ps.calcYs(10, getHeight);
      expect(spy).not.toHaveBeenCalled();
    });

    it('exits when exceeds the data length even if yValue is unmet', function () {
      ps.calcYs(999, getHeight);
      expect(ps.ys[ps.ys.length - 1]).toBeLessThan(999);
    });
  });

  describe('findFloorIndex()', function () {
    beforeEach(function () {
      ps.calcYs(11, getHeight);
      // Note: ps.ys = [0, 2, 6, 12, 20, undefined x 5];
    });

    it('scans y-values for index that equals or preceeds `yValue`', function () {
      var i = ps.findFloorIndex(3, getHeight);
      expect(i).toBe(1);
      i = ps.findFloorIndex(21, getHeight);
      expect(i).toBe(4);
      ps.calcYs(999, getHeight);
      i = ps.findFloorIndex(11, getHeight);
      expect(i).toBe(2);
      i = ps.findFloorIndex(12, getHeight);
      expect(i).toBe(3);
      i = ps.findFloorIndex(20, getHeight);
      expect(i).toBe(4);
    });

    it('is robust against non-positive y-values', function () {
      var i = ps.findFloorIndex(0, getHeight);
      expect(i).toBe(0);
      i = ps.findFloorIndex(-10, getHeight);
      expect(i).toBe(0);
    });

    it('scans no further than dataLen even if `yValue` is unmet', function () {
      var i = ps.findFloorIndex(999, getHeight);
      expect(i).toBe(ps.lastI);
    });
  });

  describe('getEstimatedHeight()', function () {
    var simpleGetHeight = function simpleGetHeight() {
      return 2;
    };

    beforeEach(function () {
      ps.calcYs(5, simpleGetHeight);
      // Note: ps.ys = [0, 2, 4, 6, 8, undefined x 5];
    });

    it('returns the estimated max height, surpassing known values', function () {
      var estHeight = ps.getEstimatedHeight();
      expect(estHeight).toBeGreaterThan(ps.heights[ps.lastI]);
    });

    it('returns the known max height, if all heights have been calculated', function () {
      ps.calcYs(999, simpleGetHeight);
      var totalHeight = ps.getEstimatedHeight();
      expect(totalHeight).toBeGreaterThan(ps.heights[ps.heights.length - 1]);
    });
  });

  describe('confirmHeight()', function () {
    var simpleGetHeight = function simpleGetHeight() {
      return 2;
    };

    beforeEach(function () {
      ps.calcYs(5, simpleGetHeight);
      // Note: ps.ys = [0, 2, 4, 6, 8, undefined x 5];
    });

    it('calculates heights up to and including `_i` if necessary', function () {
      var startNumHeights = ps.heights.filter(Boolean).length;
      var calcHeightsSpy = jest.spyOn(ps, 'calcHeights');
      ps.confirmHeight(7, simpleGetHeight);
      var endNumHeights = ps.heights.filter(Boolean).length;
      expect(startNumHeights).toBeLessThan(endNumHeights);
      expect(calcHeightsSpy).toHaveBeenCalled();
    });

    it('invokes `heightGetter` at `_i` to compare result with known height', function () {
      var getHeightSpy = jest.fn(simpleGetHeight);
      ps.confirmHeight(ps.lastI - 1, getHeightSpy);
      expect(getHeightSpy).toHaveBeenCalled();
    });

    it('cascades difference in observed height vs known height to known y-values', function () {
      var getLargerHeight = function getLargerHeight() {
        return simpleGetHeight() + 2;
      };
      var knownYs = ps.ys.slice();
      var expectedYValues = knownYs.map(function (value) {
        return value ? value + 2 : value;
      });
      ps.confirmHeight(0, getLargerHeight);
      expect(ps.ys).toEqual(expectedYValues);
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