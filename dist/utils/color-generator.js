'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var COLORS_HEX = ['#17B8BE', '#F8DCA1', '#B7885E', '#FFCB99', '#F89570', '#829AE3', '#E79FD5', '#1E96BE', '#89DAC1', '#B3AD9E', '#12939A', '#DDB27C', '#88572C', '#FF9833', '#EF5D28', '#162A65', '#DA70BF', '#125C77', '#4DC19C', '#776E57'];

function mapHexToRgb(colors) {
  var hexRegex = /\w\w/g;
  return colors.map(function (s) {
    var _s = s.slice(1);
    var rv = [];
    var match = hexRegex.exec(_s);
    while (match) {
      var hex = match[0];
      var b10 = parseInt(hex, 16);
      rv.push(b10);
      match = hexRegex.exec(_s);
    }
    return Object.freeze(rv);
  });
}

var ColorGenerator = exports.ColorGenerator = function () {
  function ColorGenerator() {
    var colorsHex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : COLORS_HEX;

    _classCallCheck(this, ColorGenerator);

    this.colorsHex = colorsHex;
    this.colorsRgb = mapHexToRgb(colorsHex);
    this.cache = new Map();
    this.currentIdx = 0;
  }

  _createClass(ColorGenerator, [{
    key: '_getColorIndex',
    value: function _getColorIndex(key) {
      var i = this.cache.get(key);
      if (i == null) {
        i = this.currentIdx;
        this.cache.set(key, this.currentIdx);
        this.currentIdx = ++this.currentIdx % this.colorsHex.length;
      }
      return i;
    }
    /**
     * Will assign a color to an arbitrary key.
     * If the key has been used already, it will
     * use the same color.
     *
     * @param  {String} key Key name
     * @return {String} HEX Color
     */

  }, {
    key: 'getColorByKey',
    value: function getColorByKey(key) {
      var i = this._getColorIndex(key);
      return this.colorsHex[i];
    }

    /**
     * Retrieve the RGB values associated with a key. Adds the key and associates
     * it with a color if the key is not recognized.
     * @return {number[]} An array of three ints [0, 255] representing a color.
     */

  }, {
    key: 'getRgbColorByKey',
    value: function getRgbColorByKey(key) {
      var i = this._getColorIndex(key);
      return this.colorsRgb[i];
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.cache.clear();
      this.currentIdx = 0;
    }
  }]);

  return ColorGenerator;
}();

exports.default = new ColorGenerator();