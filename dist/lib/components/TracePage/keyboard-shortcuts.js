'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kbdMappings = undefined;
exports.merge = merge;
exports.reset = reset;

var _combokeys = require('combokeys');

var _combokeys2 = _interopRequireDefault(_combokeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var kbdMappings = exports.kbdMappings = {
  scrollPageDown: 's',
  scrollPageUp: 'w',
  scrollToNextVisibleSpan: 'f',
  scrollToPrevVisibleSpan: 'b',
  panLeft: ['a', 'left'],
  panLeftFast: ['shift+a', 'shift+left'],
  panRight: ['d', 'right'],
  panRightFast: ['shift+d', 'shift+right'],
  zoomIn: 'up',
  zoomInFast: 'shift+up',
  zoomOut: 'down',
  zoomOutFast: 'shift+down',
  collapseAll: ']',
  expandAll: '[',
  collapseOne: 'p',
  expandOne: 'o',
  searchSpans: 'ctrl+b',
  clearSearch: 'escape'
}; //      

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

var instance = void 0;

function getInstance() {
  if (!instance) {
    instance = new _combokeys2.default(document.body);
  }
  return instance;
}

function merge(callbacks) {
  var inst = getInstance();
  Object.keys(callbacks).forEach(function (name) {
    var keysHandler = callbacks[name];
    if (keysHandler) {
      inst.bind(kbdMappings[name], keysHandler);
    }
  });
}

function reset() {
  var combokeys = getInstance();
  combokeys.reset();
}