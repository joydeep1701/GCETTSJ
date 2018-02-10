import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import allReducers from './reducers';
import {Provider} from 'react-redux';

const store = createStore(allReducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>  
  , document.getElementById('root'));
registerServiceWorker();
