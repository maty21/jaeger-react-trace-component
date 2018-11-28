"use strict";

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


/**
 * Which items of a {@link SpanDetail} component are expanded.
 */
var DetailState = function () {
  function DetailState(oldState) {
    _classCallCheck(this, DetailState);

    var _ref = oldState || {},
        isTagsOpen = _ref.isTagsOpen,
        isProcessOpen = _ref.isProcessOpen,
        logs = _ref.logs;

    this.isTagsOpen = Boolean(isTagsOpen);
    this.isProcessOpen = Boolean(isProcessOpen);
    this.logs = {
      isOpen: Boolean(logs && logs.isOpen),
      openedItems: logs && logs.openedItems ? new Set(logs.openedItems) : new Set()
    };
  }

  _createClass(DetailState, [{
    key: "toggleTags",
    value: function toggleTags() {
      var next = new DetailState(this);
      next.isTagsOpen = !this.isTagsOpen;
      return next;
    }
  }, {
    key: "toggleProcess",
    value: function toggleProcess() {
      var next = new DetailState(this);
      next.isProcessOpen = !this.isProcessOpen;
      return next;
    }
  }, {
    key: "toggleLogs",
    value: function toggleLogs() {
      var next = new DetailState(this);
      next.logs.isOpen = !this.logs.isOpen;
      return next;
    }
  }, {
    key: "toggleLogItem",
    value: function toggleLogItem(logItem) {
      var next = new DetailState(this);
      if (next.logs.openedItems.has(logItem)) {
        next.logs.openedItems.delete(logItem);
      } else {
        next.logs.openedItems.add(logItem);
      }
      return next;
    }
  }]);

  return DetailState;
}();

exports.default = DetailState;