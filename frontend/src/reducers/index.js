import {combineReducers} from 'redux';
import App from './home.js';

const allReducers = combineReducers({
  user: App
});

export default allReducers;
