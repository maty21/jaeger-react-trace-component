'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _AccordianKeyValues = require('./AccordianKeyValues');

var _AccordianKeyValues2 = _interopRequireDefault(_AccordianKeyValues);

var _AccordianKeyValues3 = require('./AccordianKeyValues.markers');

var markers = _interopRequireWildcard(_AccordianKeyValues3);

var _KeyValuesTable = require('./KeyValuesTable');

var _KeyValuesTable2 = _interopRequireDefault(_KeyValuesTable);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tags = [{ key: 'span.kind', value: 'client' }, { key: 'omg', value: 'mos-def' }]; // Copyright (c) 2017 Uber Technologies, Inc.
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

describe('<KeyValuesSummary>', function () {
  var wrapper = void 0;

  var props = { data: tags };

  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_AccordianKeyValues.KeyValuesSummary, props));
  });

  it('renders without exploding', function () {
    expect(wrapper).toBeDefined();
  });

  it('returns `null` when props.data is empty', function () {
    wrapper.setProps({ data: null });
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('generates a list from `data`', function () {
    expect(wrapper.find('li').length).toBe(tags.length);
  });

  it('renders the data as text', function () {
    var texts = wrapper.find('li').map(function (node) {
      return node.text();
    });
    var expectedTexts = tags.map(function (tag) {
      return tag.key + '=' + tag.value;
    });
    expect(texts).toEqual(expectedTexts);
  });
});

describe('<AccordianKeyValues>', function () {
  var wrapper = void 0;

  var props = {
    compact: false,
    data: tags,
    highContrast: false,
    isOpen: false,
    label: 'le-label',
    onToggle: jest.fn()
  };

  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_AccordianKeyValues2.default, props));
  });

  it('renders without exploding', function () {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the label', function () {
    var header = wrapper.find('[data-test="' + markers.LABEL + '"]');
    expect(header.length).toBe(1);
    expect(header.text()).toBe(props.label + ':');
  });

  it('renders the summary instead of the table when it is not expanded', function () {
    var summary = wrapper.find('.AccordianKeyValues--header').find(_AccordianKeyValues.KeyValuesSummary);
    expect(summary.length).toBe(1);
    expect(summary.prop('data')).toBe(tags);
    expect(wrapper.find(_KeyValuesTable2.default).length).toBe(0);
  });

  it('renders the table instead of the summarywhen it is expanded', function () {
    wrapper.setProps({ isOpen: true });
    expect(wrapper.find(_AccordianKeyValues.KeyValuesSummary).length).toBe(0);
    var table = wrapper.find(_KeyValuesTable2.default);
    expect(table.length).toBe(1);
    expect(table.prop('data')).toBe(tags);
  });
});