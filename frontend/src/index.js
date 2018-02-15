import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {Provider} from 'react-redux';

import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';

import {
  BrowserRouter as Router,
} from 'react-router-dom';

import store from './store'

sessionStorage.setItem('auth_token', null)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  , document.getElementById('root'));

registerServiceWorker();
