'use strict';

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _isPromise = require('is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

var _jaegerApi = require('./jaeger-api');

var jaegerApiActions = _interopRequireWildcard(_jaegerApi);

var _jaeger = require('../api/jaeger');

var _jaeger2 = _interopRequireDefault(_jaeger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/* eslint-disable import/first */
jest.mock('node-fetch', function () {
  return function () {
    return Promise.resolve({
      status: 200,
      data: function data() {
        return Promise.resolve({ data: null });
      },
      json: function json() {
        return Promise.resolve({ data: null });
      }
    });
  };
});

it('@JAEGER_API/FETCH_TRACE should fetch the trace by id', function () {
  var api = _jaeger2.default;
  var id = 'my-trace-id';
  var mock = _sinon2.default.mock(api);

  mock.expects('fetchTrace').withExactArgs(id);
  jaegerApiActions.fetchTrace(id);
  expect(function () {
    return mock.verify();
  }).not.toThrow();

  mock.restore();
});

it('@JAEGER_API/FETCH_TRACE should return the promise', function () {
  var api = _jaeger2.default;
  var id = 'my-trace-id';
  var mock = _sinon2.default.mock(api);

  var _jaegerApiActions$fet = jaegerApiActions.fetchTrace(id),
      payload = _jaegerApiActions$fet.payload;

  expect((0, _isPromise2.default)(payload)).toBeTruthy();

  mock.restore();
});

it('@JAEGER_API/FETCH_TRACE should attach the id as meta', function () {
  var api = _jaeger2.default;
  var id = 'my-trace-id';
  var mock = _sinon2.default.mock(api);

  var _jaegerApiActions$fet2 = jaegerApiActions.fetchTrace(id),
      meta = _jaegerApiActions$fet2.meta;

  expect(meta.id).toBe(id);

  mock.restore();
});

it('@JAEGER_API/SEARCH_TRACES should fetch the trace by id', function () {
  var api = _jaeger2.default;
  var query = { service: 's', limit: 1 };
  var mock = _sinon2.default.mock(api);

  mock.expects('searchTraces').withExactArgs(query);
  jaegerApiActions.searchTraces(query);
  expect(function () {
    return mock.verify();
  }).not.toThrow();

  mock.restore();
});

it('@JAEGER_API/SEARCH_TRACES should return the promise', function () {
  var api = _jaeger2.default;
  var query = { myQuery: 'whatever' };
  var mock = _sinon2.default.mock(api);

  var _jaegerApiActions$sea = jaegerApiActions.searchTraces(query),
      payload = _jaegerApiActions$sea.payload;

  expect((0, _isPromise2.default)(payload)).toBeTruthy();

  mock.restore();
});

it('@JAEGER_API/SEARCH_TRACES should attach the query as meta', function () {
  var api = _jaeger2.default;
  var query = { myQuery: 'whatever' };
  var mock = _sinon2.default.mock(api);

  var _jaegerApiActions$sea2 = jaegerApiActions.searchTraces(query),
      meta = _jaegerApiActions$sea2.meta;

  expect(meta.query).toEqual(query);

  mock.restore();
});

it('@JAEGER_API/FETCH_SERVICES should return a promise', function () {
  var api = _jaeger2.default;
  var mock = _sinon2.default.mock(api);

  var _jaegerApiActions$fet3 = jaegerApiActions.fetchServices(),
      payload = _jaegerApiActions$fet3.payload;

  expect((0, _isPromise2.default)(payload)).toBeTruthy();
  mock.restore();
});

it('@JAEGER_API/FETCH_SERVICE_OPERATIONS should call the JaegerAPI', function () {
  var api = _jaeger2.default;
  var mock = _sinon2.default.mock(api);
  var called = mock.expects('fetchServiceOperations').once().withExactArgs('service');
  jaegerApiActions.fetchServiceOperations('service');
  expect(called.verify()).toBeTruthy();
  mock.restore();
});