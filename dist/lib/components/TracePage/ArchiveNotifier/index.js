'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _antd = require('antd');

var _ErrorMessage = require('../../common/ErrorMessage');

var _ErrorMessage2 = _interopRequireDefault(_ErrorMessage);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //      

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

var NOTIFIED_PROGRESS = 'NOTIFIED_PROGRESS';
var NOTIFIED_OUTCOME = 'NOTIFIED_OUTCOME';

function getNextNotifiedState(props) {
  var archivedState = props.archivedState;

  if (!archivedState) {
    return null;
  }
  if (archivedState.isLoading) {
    return NOTIFIED_PROGRESS;
  }
  return archivedState.isAcknowledged ? null : NOTIFIED_OUTCOME;
}

function updateNotification(oldState, nextState, props) {
  if (oldState === nextState) {
    return;
  }
  if (oldState) {
    _antd.notification.close(oldState);
  }
  if (nextState === NOTIFIED_PROGRESS) {
    _antd.notification.info({
      key: NOTIFIED_PROGRESS,
      message: 'Archiving trace...',
      icon: React.createElement(_antd.Icon, { type: 'loading' }),
      duration: 0
    });
    return;
  }
  var acknowledge = props.acknowledge,
      archivedState = props.archivedState;

  if (nextState === NOTIFIED_OUTCOME) {
    if (archivedState && archivedState.error) {
      var error = typeof archivedState.error === 'string' ? archivedState.error : archivedState.error;
      _antd.notification.warn({
        key: NOTIFIED_OUTCOME,
        className: 'ArchiveNotifier--errorNotification',
        message: React.createElement(_ErrorMessage2.default.Message, { error: error, wrap: true }),
        description: React.createElement(_ErrorMessage2.default.Details, { error: error, wrap: true }),
        duration: null,
        icon: React.createElement(_antd.Icon, { type: 'clock-circle-o', className: 'ArchiveNotifier--errorIcon' }),
        onClose: acknowledge
      });
    } else if (archivedState && archivedState.isArchived) {
      _antd.notification.success({
        key: NOTIFIED_OUTCOME,
        message: 'This trace has been archived.',
        icon: React.createElement(_antd.Icon, { type: 'clock-circle-o', className: 'ArchiveNotifier--doneIcon' }),
        duration: null,
        onClose: acknowledge
      });
    } else {
      throw new Error('Unexpected condition');
    }
  }
}

function processProps(notifiedState, props) {
  var nxNotifiedState = getNextNotifiedState(props);
  updateNotification(notifiedState, nxNotifiedState, props);
  return nxNotifiedState;
}

var ArchiveNotifier = function (_React$PureComponent) {
  _inherits(ArchiveNotifier, _React$PureComponent);

  function ArchiveNotifier(props) {
    _classCallCheck(this, ArchiveNotifier);

    var _this = _possibleConstructorReturn(this, (ArchiveNotifier.__proto__ || Object.getPrototypeOf(ArchiveNotifier)).call(this, props));

    var notifiedState = processProps(null, props);
    _this.state = { notifiedState: notifiedState };
    return _this;
  }

  _createClass(ArchiveNotifier, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var notifiedState = processProps(this.state.notifiedState, nextProps);
      if (this.state.notifiedState !== notifiedState) {
        this.setState({ notifiedState: notifiedState });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var notifiedState = this.state.notifiedState;

      if (notifiedState) {
        _antd.notification.close(notifiedState);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return ArchiveNotifier;
}(React.PureComponent);

exports.default = ArchiveNotifier;