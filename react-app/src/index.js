import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/main.css';
import { Provider } from 'react-redux';
// import store from './components/redux/store'
import configureStore from './components/redux/configureStore'

const store = configureStore({})

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>,
document.getElementById('root')

);
