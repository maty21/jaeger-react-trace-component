'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _alert = require('react-icons/lib/io/alert');

var _alert2 = _interopRequireDefault(_alert);

var _arrowRightA = require('react-icons/lib/io/arrow-right-a');

var _arrowRightA2 = _interopRequireDefault(_arrowRightA);

var _TimelineRow = require('./TimelineRow');

var _TimelineRow2 = _interopRequireDefault(_TimelineRow);

var _SpanTreeOffset = require('./SpanTreeOffset');

var _SpanTreeOffset2 = _interopRequireDefault(_SpanTreeOffset);

var _SpanBar = require('./SpanBar');

var _SpanBar2 = _interopRequireDefault(_SpanBar);

var _Ticks = require('./Ticks');

var _Ticks2 = _interopRequireDefault(_Ticks);

require('./SpanBarRow.css');

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

/**
 * This was originally a stateless function, but changing to a PureComponent
 * reduced the render time of expanding a span row detail by ~50%. This is
 * even true in the case where the stateless function has the same prop types as
 * this class and arrow functions are created in the stateless function as
 * handlers to the onClick props. E.g. for now, the PureComponent is more
 * performance than the stateless function.
 */
var SpanBarRow = function (_React$PureComponent) {
  _inherits(SpanBarRow, _React$PureComponent);

  function SpanBarRow() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SpanBarRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SpanBarRow.__proto__ || Object.getPrototypeOf(SpanBarRow)).call.apply(_ref, [this].concat(args))), _this), _this._detailToggle = function () {
      _this.props.onDetailToggled(_this.props.spanID);
    }, _this._childrenToggle = function () {
      _this.props.onChildrenToggled(_this.props.spanID);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SpanBarRow, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          color = _props.color,
          columnDivision = _props.columnDivision,
          depth = _props.depth,
          isChildrenExpanded = _props.isChildrenExpanded,
          isDetailExpanded = _props.isDetailExpanded,
          isMatchingFilter = _props.isMatchingFilter,
          isParent = _props.isParent,
          label = _props.label,
          numTicks = _props.numTicks,
          operationName = _props.operationName,
          rpc = _props.rpc,
          serviceName = _props.serviceName,
          showErrorIcon = _props.showErrorIcon,
          viewEnd = _props.viewEnd,
          viewStart = _props.viewStart;


      var labelDetail = serviceName + '::' + operationName;
      var longLabel = void 0;
      var hintSide = void 0;
      if (viewStart > 1 - viewEnd) {
        longLabel = labelDetail + ' | ' + label;
        hintSide = 'left';
      } else {
        longLabel = label + ' | ' + labelDetail;
        hintSide = 'right';
      }
      return React.createElement(
        _TimelineRow2.default,
        {
          className: '\n          span-row\n          ' + (className || '') + '\n          ' + (isDetailExpanded ? 'is-expanded' : '') + '\n          ' + (isMatchingFilter ? 'is-matching-filter' : '') + '\n        '
        },
        React.createElement(
          _TimelineRow2.default.Cell,
          { className: 'span-name-column', width: columnDivision },
          React.createElement(
            'div',
            { className: 'span-name-wrapper ' + (isMatchingFilter ? 'is-matching-filter' : '') },
            React.createElement(_SpanTreeOffset2.default, {
              level: depth + 1,
              hasChildren: isParent,
              childrenVisible: isChildrenExpanded,
              onClick: isParent ? this._childrenToggle : null
            }),
            React.createElement(
              'a',
              {
                className: 'span-name ' + (isDetailExpanded ? 'is-detail-expanded' : ''),
                'aria-checked': isDetailExpanded,
                onClick: this._detailToggle,
                role: 'switch',
                style: { borderColor: color },
                tabIndex: '0'
              },
              React.createElement(
                'span',
                {
                  className: 'span-svc-name ' + (isParent && !isChildrenExpanded ? 'is-children-collapsed' : '')
                },
                showErrorIcon && React.createElement(_alert2.default, { className: 'SpanBarRow--errorIcon' }),
                serviceName,
                ' ',
                rpc && React.createElement(
                  'span',
                  null,
                  React.createElement(_arrowRightA2.default, null),
                  ' ',
                  React.createElement('i', { className: 'SpanBarRow--rpcColorMarker', style: { background: rpc.color } }),
                  rpc.serviceName
                )
              ),
              React.createElement(
                'small',
                { className: 'endpoint-name' },
                rpc ? rpc.operationName : operationName
              )
            )
          )
        ),
        React.createElement(
          _TimelineRow2.default.Cell,
          {
            className: 'span-view',
            style: { cursor: 'pointer' },
            width: 1 - columnDivision,
            onClick: this._detailToggle
          },
          React.createElement(_Ticks2.default, { numTicks: numTicks }),
          React.createElement(_SpanBar2.default, {
            rpc: rpc,
            viewStart: viewStart,
            viewEnd: viewEnd,
            color: color,
            shortLabel: label,
            longLabel: longLabel,
            hintSide: hintSide
          })
        )
      );
    }
  }]);

  return SpanBarRow;
}(React.PureComponent);

SpanBarRow.defaultProps = {
  className: '',
  rpc: null
};
exports.default = SpanBarRow;