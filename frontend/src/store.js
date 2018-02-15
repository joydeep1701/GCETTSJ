import { createStore, applyMiddleware } from 'redux';
import allReducers from './reducers';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

export default createStore(
  allReducers,
  {},
  applyMiddleware(
    createLogger(),
    thunk,
    promise())
);
