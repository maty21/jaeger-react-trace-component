'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ErrorMessage = require('./ErrorMessage');

var _ErrorMessage2 = _interopRequireDefault(_ErrorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<ErrorMessage>', function () {
  var wrapper = void 0;
  var error = void 0;

  beforeEach(function () {
    error = 'some-error';
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ErrorMessage2.default, { error: error }));
  });

  it('is ok when not passed an error', function () {
    wrapper.setProps({ error: null });
    expect(wrapper).toBeDefined();
  });

  it('renders a message when passed a string', function () {
    var msg = wrapper.find('Message');
    expect(msg.length).toBe(1);
    expect(msg.shallow().text()).toMatch(error);
  });

  describe('rendering more complex errors', function () {
    it('renders the error message', function () {
      error = new Error('another-error');
      wrapper.setProps({ error: error });
      var msg = wrapper.find('Message');
      expect(msg.length).toBe(1);
      expect(msg.shallow().text()).toMatch(error.message);
    });

    it('renders HTTP related data from the error', function () {
      error = {
        message: 'some-http-ish-message',
        httpStatus: 'value-httpStatus',
        httpStatusText: 'value-httpStatusText',
        httpUrl: 'value-httpUrl',
        httpQuery: 'value-httpQuery',
        httpBody: 'value-httpBody'
      };
      wrapper.setProps({ error: error });
      var details = wrapper.find('Details');
      expect(details.length).toBe(1);
      var detailsWrapper = details.shallow();
      Object.keys(error).forEach(function (key) {
        if (key === 'message') {
          return;
        }
        var errorAttr = detailsWrapper.find('ErrorAttr[value="' + error[key] + '"]');
        expect(errorAttr.length).toBe(1);
      });
    });
  });

  it('is fine when mounted', function () {
    error = { message: 'le-error', httpStatus: 'some-status' };
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ErrorMessage2.default, { error: error }));
    expect(wrapper).toBeDefined();
  });
}); // Copyright (c) 2017 Uber Technologies, Inc.
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