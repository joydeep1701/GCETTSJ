import {combineReducers} from 'redux';
import App from './home.js';
import loginReducer from './loginReducer';

const allReducers = combineReducers({
  //user: App,
  loginReducer,
});

export default allReducers;
