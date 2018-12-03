'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackSlimHeaderToggle = exports.trackAltViewOpen = undefined;

var _common = require('../../utils/tracking/common');

var _tracking = require('../../utils/tracking');

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

var CATEGORY_ALT_VIEW = 'jaeger/ux/trace/alt-view';
var CATEGORY_SLIM_HEADER = 'jaeger/ux/trace/slim-header';

// use a closure instead of bind to prevent forwarding any arguments to trackEvent()
var trackAltViewOpen = exports.trackAltViewOpen = function trackAltViewOpen() {
  return (0, _tracking.trackEvent)(CATEGORY_ALT_VIEW, _common.OPEN);
};

var trackSlimHeaderToggle = exports.trackSlimHeaderToggle = function trackSlimHeaderToggle(isOpen) {
  return (0, _tracking.trackEvent)(CATEGORY_SLIM_HEADER, (0, _common.getToggleValue)(isOpen));
};