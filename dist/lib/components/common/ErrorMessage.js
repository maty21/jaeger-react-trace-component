'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ErrorMessage;

var _react = require('react');

var React = _interopRequireWildcard(_react);

require('./ErrorMessage.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

function ErrorAttr(_ref) {
  var name = _ref.name,
      value = _ref.value;

  return React.createElement(
    'tr',
    { className: 'ErrorMessage--detailItem' },
    React.createElement(
      'td',
      { className: 'ErrorMessage--attr' },
      name
    ),
    React.createElement(
      'td',
      { className: 'ErrorMessage--value' },
      value
    )
  );
}

function Message(props) {
  var className = props.className,
      error = props.error,
      wrap = props.wrap,
      wrapperClassName = props.wrapperClassName;

  var cssClass = 'ErrorMessage--msg ' + (className || '');
  var msg = void 0;
  if (typeof error === 'string') {
    msg = React.createElement(
      'h3',
      { className: cssClass },
      error
    );
  } else {
    msg = React.createElement(
      'h3',
      { className: cssClass },
      error.message
    );
  }
  if (wrap) {
    return React.createElement(
      'div',
      { className: 'ErrorMessage ' + (wrapperClassName || '') },
      msg
    );
  }
  return msg;
}

Message.defaultProps = {
  className: undefined,
  wrap: false,
  wrapperClassName: undefined
};

function Details(props) {
  var className = props.className,
      error = props.error,
      wrap = props.wrap,
      wrapperClassName = props.wrapperClassName;

  if (typeof error === 'string') {
    return null;
  }
  var httpStatus = error.httpStatus,
      httpStatusText = error.httpStatusText,
      httpUrl = error.httpUrl,
      httpQuery = error.httpQuery,
      httpBody = error.httpBody;

  var bodyExcerpt = httpBody && httpBody.length > 1024 ? httpBody.slice(0, 1021).trim() + '...' : httpBody;
  var details = React.createElement(
    'div',
    { className: 'ErrorMessage--details ' + (className || '') + ' u-simple-scrollbars' },
    React.createElement(
      'table',
      { className: 'ErrorMessage--detailsTable' },
      React.createElement(
        'tbody',
        null,
        httpStatus ? React.createElement(ErrorAttr, { name: 'Status', value: httpStatus }) : null,
        httpStatusText ? React.createElement(ErrorAttr, { name: 'Status text', value: httpStatusText }) : null,
        httpUrl ? React.createElement(ErrorAttr, { name: 'URL', value: httpUrl }) : null,
        httpQuery ? React.createElement(ErrorAttr, { name: 'Query', value: httpQuery }) : null,
        bodyExcerpt ? React.createElement(ErrorAttr, { name: 'Response body', value: bodyExcerpt }) : null
      )
    )
  );

  if (wrap) {
    return React.createElement(
      'div',
      { className: 'ErrorMessage ' + (wrapperClassName || '') },
      details
    );
  }
  return details;
}

Details.defaultProps = {
  className: undefined,
  wrap: false,
  wrapperClassName: undefined
};

function ErrorMessage(_ref2) {
  var className = _ref2.className,
      detailClassName = _ref2.detailClassName,
      error = _ref2.error,
      messageClassName = _ref2.messageClassName;

  if (!error) {
    return null;
  }
  if (typeof error === 'string') {
    return React.createElement(Message, { className: messageClassName, error: error, wrapperClassName: className, wrap: true });
  }
  return React.createElement(
    'div',
    { className: 'ErrorMessage ' + (className || '') },
    React.createElement(Message, { error: error, className: messageClassName }),
    React.createElement(Details, { error: error, className: detailClassName })
  );
}

ErrorMessage.defaultProps = {
  className: undefined,
  detailClassName: undefined,
  messageClassName: undefined
};

ErrorMessage.Message = Message;
ErrorMessage.Details = Details;