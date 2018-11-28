import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
//import * as serviceWorker from './serviceWorker';
import TracePage from './components/TracePage/index'
import stub from './stub'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import configureStore from './configure-store';
import 'u-basscss/css/flexbox.css';
import 'u-basscss/css/layout.css';
import 'u-basscss/css/margin.css';
import 'u-basscss/css/padding.css';
import 'u-basscss/css/position.css';
import 'u-basscss/css/typography.css';
const stub = {
    data: stub
}

const { Header, Content } = Layout;
const cont = {};
const store = createStore(() => { })
const Trace = (trace = stub) => (
    <Provider context={cont} store={configureStore()}>
        <TracePage trace={trace} />
    </Provider>
)

export default Trace;
// ReactDOM.render(

//     , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA



