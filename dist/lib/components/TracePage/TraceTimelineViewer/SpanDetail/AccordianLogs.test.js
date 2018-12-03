'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _AccordianKeyValues = require('./AccordianKeyValues');

var _AccordianKeyValues2 = _interopRequireDefault(_AccordianKeyValues);

var _AccordianLogs = require('./AccordianLogs');

var _AccordianLogs2 = _interopRequireDefault(_AccordianLogs);

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

describe('<AccordianLogs>', function () {
  var wrapper = void 0;

  var logs = [{
    timestamp: 10,
    fields: [{ key: 'message', value: 'oh the log message' }, { key: 'something', value: 'else' }]
  }, {
    timestamp: 20,
    fields: [{ key: 'message', value: 'oh the next log message' }, { key: 'more', value: 'stuff' }]
  }];
  var props = {
    logs: logs,
    isOpen: false,
    onItemToggle: jest.fn(),
    onToggle: function onToggle() {},
    openedItems: new Set([logs[1]]),
    timestamp: 5
  };

  beforeEach(function () {
    props.onItemToggle.mockReset();
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_AccordianLogs2.default, props));
  });

  it('renders without exploding', function () {
    expect(wrapper).toBeDefined();
  });

  it('shows the number of log entries', function () {
    var regex = new RegExp('Logs \\(' + logs.length + '\\)');
    expect(wrapper.find('a').text()).toMatch(regex);
  });

  it('hides log entries when not expanded', function () {
    expect(wrapper.find(_AccordianKeyValues2.default).exists()).toBe(false);
  });

  it('shows log entries when expanded', function () {
    expect(wrapper.find(_AccordianKeyValues2.default).exists()).toBe(false);
    wrapper.setProps({ isOpen: true });
    var logViews = wrapper.find(_AccordianKeyValues2.default);
    expect(logViews.length).toBe(logs.length);

    logViews.forEach(function (node, i) {
      var log = logs[i];
      expect(node.prop('data')).toBe(log.fields);
      node.simulate('toggle');
      expect(props.onItemToggle).toHaveBeenLastCalledWith(log);
    });
  });

  it('propagates isOpen to log items correctly', function () {
    wrapper.setProps({ isOpen: true });
    var logViews = wrapper.find(_AccordianKeyValues2.default);
    logViews.forEach(function (node, i) {
      expect(node.prop('isOpen')).toBe(props.openedItems.has(logs[i]));
    });
  });
});