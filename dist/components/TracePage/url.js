'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROUTE_PATH = undefined;
exports.getUrl = getUrl;

var _prefixUrl = require('../../utils/prefix-url');

var _prefixUrl2 = _interopRequireDefault(_prefixUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROUTE_PATH = exports.ROUTE_PATH = (0, _prefixUrl2.default)('/trace/:id'); //      

// Copyright (c) 2018 Uber Technologies, Inc.
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

function getUrl(id) {
  return (0, _prefixUrl2.default)('/trace/' + id);
}