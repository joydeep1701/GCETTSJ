import axios from 'axios';
const authURL = '/users/login/';

const loginSuccess = (user) => {
  console.log("%cUSER_AUTH_LOGIN_SUCCESS", "background: #bada55; color: #222");
  return {type: "USER_AUTH_LOGIN_SUCCESS", user};
}

const loginFailed = (response) => {
  console.log("%cUSER_AUTH_LOGIN_FAILED", "background: #da0f0fde; color: #222");
  return {type: "USER_AUTH_LOGIN_FAILED", response}
}

export const loginAction = (payload) => (dispatch) => {
  //console.log(payload);
  return {
    type: "USER_AUTH_LOGIN",
    payload: axios.post(authURL, payload)
      .then(response => {
        dispatch(loginSuccess(response.data));
      }).catch(error => {
        dispatch(loginFailed(error.response.data));
      })
  };
}
export function logoutAction(payload) {
  return {type: "USER_AUTH_LOGOUT", payload};
}
export const loginFromSessionData = (payload=null) => {
  return {
    type: "USER_AUTH_SESSION_LOGIN",
    payload
  }
}
