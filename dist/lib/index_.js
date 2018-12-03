'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('./index.css');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _antd = require('antd');

require('antd/dist/antd.css');

var _trace = require('./trace');

var _trace2 = _interopRequireDefault(_trace);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _configureStore = require('./configure-store');

var _configureStore2 = _interopRequireDefault(_configureStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import 'u-basscss/css/flexbox.css';
// import 'u-basscss/css/layout.css';
// import 'u-basscss/css/margin.css';
// import 'u-basscss/css/padding.css';
// import 'u-basscss/css/position.css';
// import 'u-basscss/css/typography.css';
// const trace = {
//     data: stub
// }

//import * as serviceWorker from './serviceWorker';
var Content = _antd.Layout.Content;

// const store = createStore(() => { })
// const Trace = ()=>(
// <Provider store={configureStore()}>
//         <Layout>
//             <Content>
//             <Trace/>
//             </Content>
//         </Layout>
//     </Provider>
// )

// import stub from './stub'

exports.default = _trace2.default;

_reactDom2.default.render(_react2.default.createElement(
    _antd.Layout,
    null,
    _react2.default.createElement(
        Content,
        null,
        _react2.default.createElement(_trace2.default, null)
    )
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA