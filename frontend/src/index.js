import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {Provider} from 'react-redux';

import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store'

sessionStorage.setItem('auth_token', null)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));

registerServiceWorker();
