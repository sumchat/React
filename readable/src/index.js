import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './config.js';
import { Provider } from 'react-redux';
//import { BrowserRouter } from 'react-router-dom';
//import { Router, Route, browserHistory } from 'react-router-dom'

const store = configureStore()

ReactDOM.render(<Provider store={store}>

  <App />

  </Provider>, document.getElementById('root'));


registerServiceWorker();

export default store;
