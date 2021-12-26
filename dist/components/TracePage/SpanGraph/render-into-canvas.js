'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderIntoCanvas;
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

// exported for tests
var BG_COLOR = exports.BG_COLOR = '#f5f5f5';
var ITEM_ALPHA = exports.ITEM_ALPHA = 0.8;
var MIN_ITEM_HEIGHT = exports.MIN_ITEM_HEIGHT = 2;
var MAX_TOTAL_HEIGHT = exports.MAX_TOTAL_HEIGHT = 200;
var MIN_ITEM_WIDTH = exports.MIN_ITEM_WIDTH = 10;
var MIN_TOTAL_HEIGHT = exports.MIN_TOTAL_HEIGHT = 60;

function renderIntoCanvas(canvas, items, totalValueWidth, getFillColor) {
  var fillCache = new Map();
  var cHeight = items.length < MIN_TOTAL_HEIGHT ? MIN_TOTAL_HEIGHT : Math.min(items.length, MAX_TOTAL_HEIGHT);
  var cWidth = window.innerWidth * 2;
  // eslint-disable-next-line no-param-reassign
  canvas.width = cWidth;
  // eslint-disable-next-line no-param-reassign
  canvas.height = cHeight;
  var itemHeight = Math.max(MIN_ITEM_HEIGHT, cHeight / items.length);
  var itemYChange = cHeight / items.length;

  var ctx = canvas.getContext('2d', { alpha: false });
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, cWidth, cHeight);
  for (var i = 0; i < items.length; i++) {
    var _items$i = items[i],
        valueWidth = _items$i.valueWidth,
        valueOffset = _items$i.valueOffset,
        serviceName = _items$i.serviceName;

    var x = valueOffset / totalValueWidth * cWidth;
    var width = valueWidth / totalValueWidth * cWidth;
    if (width < MIN_ITEM_WIDTH) {
      width = MIN_ITEM_WIDTH;
    }
    var fillStyle = fillCache.get(serviceName);
    if (!fillStyle) {
      fillStyle = 'rgba(' + getFillColor(serviceName).concat(ITEM_ALPHA).join() + ')';
      fillCache.set(serviceName, fillStyle);
    }
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, i * itemYChange, width, itemHeight);
  }
}