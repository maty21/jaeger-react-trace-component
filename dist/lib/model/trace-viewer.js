'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTraceName = getTraceName;
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

// eslint-disable-next-line import/prefer-default-export
function getTraceName(spans) {
  var span = spans.filter(function (sp) {
    return !sp.references || !sp.references.length;
  })[0];
  return span ? span.process.serviceName + ': ' + span.operationName : '';
}