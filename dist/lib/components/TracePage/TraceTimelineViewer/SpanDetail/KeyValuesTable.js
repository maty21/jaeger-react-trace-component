'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //      

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

exports.default = KeyValuesTable;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _jsonMarkup = require('json-markup');

var _jsonMarkup2 = _interopRequireDefault(_jsonMarkup);

var _antd = require('antd');

require('./KeyValuesTable.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function parseIfJson(value) {
  try {
    var data = JSON.parse(value);
    if (data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
      return data;
    }
    // eslint-disable-next-line no-empty
  } catch (_) {}
  return value;
}

var LinkValue = function LinkValue(props) {
  return React.createElement(
    'a',
    { href: props.href, title: props.title, target: '_blank', rel: 'noopener noreferrer' },
    props.children,
    ' ',
    React.createElement(_antd.Icon, { className: 'KeyValueTable--linkIcon', type: 'export' })
  );
};

var linkValueList = function linkValueList(links) {
  return React.createElement(
    _antd.Menu,
    null,
    links.map(function (_ref, index) {
      var text = _ref.text,
          url = _ref.url;
      return (
        // `index` is necessary in the key because url can repeat
        // eslint-disable-next-line react/no-array-index-key
        React.createElement(
          _antd.Menu.Item,
          { key: url + '-' + index },
          React.createElement(
            LinkValue,
            { href: url },
            text
          )
        )
      );
    })
  );
};

function KeyValuesTable(props) {
  var data = props.data,
      linksGetter = props.linksGetter;

  return React.createElement(
    'div',
    { className: 'KeyValueTable u-simple-scrollbars' },
    React.createElement(
      'table',
      { className: 'u-width-100' },
      React.createElement(
        'tbody',
        { className: 'KeyValueTable--body' },
        data.map(function (row, i) {
          var markup = {
            __html: (0, _jsonMarkup2.default)(parseIfJson(row.value))
          };
          // eslint-disable-next-line react/no-danger
          var jsonTable = React.createElement('div', { className: 'ub-inline-block', dangerouslySetInnerHTML: markup });
          var links = linksGetter ? linksGetter(data, i) : null;
          var valueMarkup = void 0;
          if (links && links.length === 1) {
            valueMarkup = React.createElement(
              'div',
              null,
              React.createElement(
                LinkValue,
                { href: links[0].url, title: links[0].text },
                jsonTable
              )
            );
          } else if (links && links.length > 1) {
            valueMarkup = React.createElement(
              'div',
              null,
              React.createElement(
                _antd.Dropdown,
                { overlay: linkValueList(links), placement: 'bottomRight', trigger: ['click'] },
                React.createElement(
                  'a',
                  null,
                  jsonTable,
                  ' ',
                  React.createElement(_antd.Icon, { className: 'KeyValueTable--linkIcon', type: 'profile' })
                )
              )
            );
          } else {
            valueMarkup = jsonTable;
          }
          return (
            // `i` is necessary in the key because row.key can repeat
            // eslint-disable-next-line react/no-array-index-key
            React.createElement(
              'tr',
              { key: row.key + '-' + i },
              React.createElement(
                'td',
                { className: 'KeyValueTable--keyColumn' },
                row.key
              ),
              React.createElement(
                'td',
                null,
                valueMarkup
              )
            )
          );
        })
      )
    )
  );
}

KeyValuesTable.LinkValue = LinkValue;