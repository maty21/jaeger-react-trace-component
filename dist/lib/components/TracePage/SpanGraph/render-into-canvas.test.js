'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright (c) 2017 Uber Technologies, Inc.
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

var _range2 = require('lodash/range');

var _range3 = _interopRequireDefault(_range2);

var _renderIntoCanvas = require('./render-into-canvas');

var _renderIntoCanvas2 = _interopRequireDefault(_renderIntoCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getCanvasWidth = function getCanvasWidth() {
  return window.innerWidth * 2;
};
var getBgFillRect = function getBgFillRect(items) {
  return {
    fillStyle: _renderIntoCanvas.BG_COLOR,
    height: !items || items.length < _renderIntoCanvas.MIN_TOTAL_HEIGHT ? _renderIntoCanvas.MIN_TOTAL_HEIGHT : Math.min(_renderIntoCanvas.MAX_TOTAL_HEIGHT, items.length),
    width: getCanvasWidth(),
    x: 0,
    y: 0
  };
};

describe('renderIntoCanvas()', function () {
  var basicItem = { valueWidth: 100, valueOffset: 50, serviceName: 'some-name' };

  var CanvasContext = function () {
    function CanvasContext() {
      _classCallCheck(this, CanvasContext);

      this.fillStyle = undefined;
      this.fillRectAccumulator = [];
    }

    _createClass(CanvasContext, [{
      key: 'fillRect',
      value: function fillRect(x, y, width, height) {
        var fillStyle = this.fillStyle;
        this.fillRectAccumulator.push({
          fillStyle: fillStyle,
          height: height,
          width: width,
          x: x,
          y: y
        });
      }
    }]);

    return CanvasContext;
  }();

  var Canvas = function () {
    function Canvas() {
      _classCallCheck(this, Canvas);

      this.contexts = [];
      this.height = NaN;
      this.width = NaN;
      this.getContext = jest.fn(this._getContext.bind(this));
    }

    _createClass(Canvas, [{
      key: '_getContext',
      value: function _getContext() {
        var ctx = new CanvasContext();
        this.contexts.push(ctx);
        return ctx;
      }
    }]);

    return Canvas;
  }();

  function getColorFactory() {
    var i = 0;
    var inputOutput = [];
    function getFakeColor(str) {
      var rv = [i, i, i];
      i++;
      inputOutput.push({
        input: str,
        output: rv.slice()
      });
      return rv;
    }
    getFakeColor.inputOutput = inputOutput;
    return getFakeColor;
  }

  it('sets the width', function () {
    var canvas = new Canvas();
    expect(canvas.width !== canvas.width).toBe(true);
    (0, _renderIntoCanvas2.default)(canvas, [basicItem], 150, getColorFactory());
    expect(canvas.width).toBe(getCanvasWidth());
  });

  describe('when there are limited number of items', function () {
    it('sets the height', function () {
      var canvas = new Canvas();
      expect(canvas.height !== canvas.height).toBe(true);
      (0, _renderIntoCanvas2.default)(canvas, [basicItem], 150, getColorFactory());
      expect(canvas.height).toBe(_renderIntoCanvas.MIN_TOTAL_HEIGHT);
    });

    it('draws the background', function () {
      var expectedDrawing = [getBgFillRect()];
      var canvas = new Canvas();
      var items = [];
      var totalValueWidth = 4000;
      var getFillColor = getColorFactory();
      (0, _renderIntoCanvas2.default)(canvas, items, totalValueWidth, getFillColor);
      expect(canvas.getContext.mock.calls).toEqual([['2d', { alpha: false }]]);
      expect(canvas.contexts.length).toBe(1);
      expect(canvas.contexts[0].fillRectAccumulator).toEqual(expectedDrawing);
    });

    it('draws the map', function () {
      var totalValueWidth = 4000;
      var items = [{ valueWidth: 50, valueOffset: 50, serviceName: 'service-name-0' }, { valueWidth: 100, valueOffset: 100, serviceName: 'service-name-1' }, { valueWidth: 150, valueOffset: 150, serviceName: 'service-name-2' }];
      var expectedColors = [{ input: items[0].serviceName, output: [0, 0, 0] }, { input: items[1].serviceName, output: [1, 1, 1] }, { input: items[2].serviceName, output: [2, 2, 2] }];
      var expectedDrawings = [getBgFillRect()].concat(_toConsumableArray(items.map(function (item, i) {
        var valueWidth = item.valueWidth,
            valueOffset = item.valueOffset;

        var color = expectedColors[i].output;
        var fillStyle = 'rgba(' + color.concat(_renderIntoCanvas.ITEM_ALPHA).join() + ')';
        var height = _renderIntoCanvas.MIN_TOTAL_HEIGHT / items.length;
        var width = valueWidth / totalValueWidth * getCanvasWidth();
        var x = valueOffset / totalValueWidth * getCanvasWidth();
        var y = height * i;
        return { fillStyle: fillStyle, height: height, width: width, x: x, y: y };
      })));
      var canvas = new Canvas();
      var getFillColor = getColorFactory();
      (0, _renderIntoCanvas2.default)(canvas, items, totalValueWidth, getFillColor);
      expect(getFillColor.inputOutput).toEqual(expectedColors);
      expect(canvas.getContext.mock.calls).toEqual([['2d', { alpha: false }]]);
      expect(canvas.contexts.length).toBe(1);
      expect(canvas.contexts[0].fillRectAccumulator).toEqual(expectedDrawings);
    });
  });

  describe('when there are many items', function () {
    it('sets the height when there are many items', function () {
      var canvas = new Canvas();
      var items = [];
      for (var i = 0; i < _renderIntoCanvas.MIN_TOTAL_HEIGHT + 1; i++) {
        items.push(basicItem);
      }
      expect(canvas.height !== canvas.height).toBe(true);
      (0, _renderIntoCanvas2.default)(canvas, items, 150, getColorFactory());
      expect(canvas.height).toBe(items.length);
    });

    it('draws the map', function () {
      var totalValueWidth = 4000;
      var items = (0, _range3.default)(_renderIntoCanvas.MIN_TOTAL_HEIGHT * 10).map(function (i) {
        return {
          valueWidth: i,
          valueOffset: i,
          serviceName: 'service-name-' + i
        };
      });
      var expectedColors = items.map(function (item, i) {
        return {
          input: item.serviceName,
          output: [i, i, i]
        };
      });
      var expectedDrawings = [getBgFillRect(items)].concat(_toConsumableArray(items.map(function (item, i) {
        var valueWidth = item.valueWidth,
            valueOffset = item.valueOffset;

        var color = expectedColors[i].output;
        var fillStyle = 'rgba(' + color.concat(_renderIntoCanvas.ITEM_ALPHA).join() + ')';
        var height = _renderIntoCanvas.MIN_ITEM_HEIGHT;
        var width = Math.max(_renderIntoCanvas.MIN_ITEM_WIDTH, valueWidth / totalValueWidth * getCanvasWidth());
        var x = valueOffset / totalValueWidth * getCanvasWidth();
        var y = _renderIntoCanvas.MAX_TOTAL_HEIGHT / items.length * i;
        return { fillStyle: fillStyle, height: height, width: width, x: x, y: y };
      })));
      var canvas = new Canvas();
      var getFillColor = getColorFactory();
      (0, _renderIntoCanvas2.default)(canvas, items, totalValueWidth, getFillColor);
      expect(getFillColor.inputOutput).toEqual(expectedColors);
      expect(canvas.getContext.mock.calls).toEqual([['2d', { alpha: false }]]);
      expect(canvas.contexts.length).toBe(1);
      expect(canvas.contexts[0].fillRectAccumulator).toEqual(expectedDrawings);
    });
  });
});