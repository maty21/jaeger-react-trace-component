'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./index.css');

var _antd = require('antd');

var _index = require('./components/TracePage/index');

var _index2 = _interopRequireDefault(_index);

var _stub = require('./stub');

var _stub2 = _interopRequireDefault(_stub);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _configureStore = require('./configure-store');

var _configureStore2 = _interopRequireDefault(_configureStore);

require('u-basscss/css/flexbox.css');

require('u-basscss/css/layout.css');

require('u-basscss/css/margin.css');

require('u-basscss/css/padding.css');

require('u-basscss/css/position.css');

require('u-basscss/css/typography.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import App from './App';
var trace_ = {
    data: { trace: _stub2.default }
};
//add css for use it independently
//import 'antd/dist/antd.css';
//import * as serviceWorker from './serviceWorker';

//import ReactDOM from 'react-dom';
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content;

var cont = {};
//const store = createStore(() => { })
var Trace = function Trace() {
    var trace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : trace_;
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : cont;
    return _react2.default.createElement(
        _reactRedux.Provider,
        { context: context, store: (0, _configureStore2.default)() },
        _react2.default.createElement(_index2.default, { trace: trace.trace })
    );
};

exports.default = Trace;
// ReactDOM.render(

//     , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA