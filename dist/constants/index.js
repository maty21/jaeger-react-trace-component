'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

var TOP_NAV_HEIGHT = exports.TOP_NAV_HEIGHT = 47;

var FALLBACK_DAG_MAX_NUM_SERVICES = exports.FALLBACK_DAG_MAX_NUM_SERVICES = 100;
var FALLBACK_TRACE_NAME = exports.FALLBACK_TRACE_NAME = '<trace-without-root-span>';

var FETCH_DONE = exports.FETCH_DONE = 'FETCH_DONE';
var FETCH_ERROR = exports.FETCH_ERROR = 'FETCH_ERROR';
var FETCH_LOADING = exports.FETCH_LOADING = 'FETCH_LOADING';

var fetchedState = exports.fetchedState = {
  DONE: FETCH_DONE,
  ERROR: FETCH_ERROR,
  LOADING: FETCH_LOADING
};