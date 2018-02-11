import axios from 'axios';
//import { HOST } from '../constants';

const authURL = '/users/login/';
export function loginAction(payload, dispatch) {
  console.log("------------------",payload);
  return {
    type: "USER_AUTH_LOGIN",
    payload: axios.post(authURL, {username:'110',password:'password'}).then(
      response => {
        console.log("RESPONSE DATA: \n",response.data);
        dispatch(console.log("---------Some dispatched event"))
      }
    ).catch(error => {
      console.log(error.response);
    })
  };
}
export function logoutAction(payload) {
  return {
    type: "USER_AUTH_LOGOUT",
    payload
  };
}
// export const USER_AUTH_LOGIN_DISPATCH = 'USER_AUTH_LOGIN_DISPATCH'
// export const USER_AUTH_LOGIN_SUCCESS = 'USER_AUTH_LOGIN_SUCCESS'
// export const USER_AUTH_LOGIN_FAIL = 'USER_AUTH_LOGIN_FAIL'
// export const USER_AUTH_LOGOUT = 'USER_AUTH_LOGOUT'
//
// export const userAuthLogindDispatch = () => ({
//   type: USER_AUTH_LOGIN_DISPATCH,
//
//
// })
