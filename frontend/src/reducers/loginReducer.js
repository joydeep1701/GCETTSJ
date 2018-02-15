const loginReducer = (state={
  user:  {
      name: null,
      univ_roll: null,
      stream: null,
      isadmin: false,
      isactive: null,
      isloggedin: false,
      authtoken: null
  },
  loginFlow: {
    loginFailed: false,
    registerFailed: false,
    message: "",
  }
}, action) => {
  //console.log("FROM: Login Reducer\n, STATE:",state,"ACTION:",action);
  switch (action.type) {
    case "USER_AUTH_LOGIN_SUCCESS":
      state = {
        ...state,
        user: {
          name: action.user.name,
          univ_roll: action.user.univ_roll,
          stream: action.user.stream,
          isadmin: action.user.is_staff,
          isactive: action.user.is_active,
          isloggedin: true,
          authtoken: action.user.token
        }
      }
      sessionStorage.setItem('auth_token',action.user.token);
      sessionStorage.setItem('name',action.user.name)
      sessionStorage.setItem('univ_roll',action.user.univ_roll)
      sessionStorage.setItem('stream',action.user.stream)
      sessionStorage.setItem('isloggedin',true)
      sessionStorage.setItem('isadmin',action.user.is_staff)
      sessionStorage.setItem('isactive',action.user.is_active)
      break;
    case "USER_AUTH_LOGOUT":
      state = {
        ...state,
        user: {
            name: null,
            univ_roll: null,
            stream: null,
            isadmin: false,
            isactive: null,
            isloggedin: false,
            authtoken: null
        }
      }
      sessionStorage.clear()
      break;
    case "USER_AUTH_SESSION_LOGIN":
      state = {
        ...state,
        user: {
            name: sessionStorage.getItem('name'),
            univ_roll: sessionStorage.getItem('univ_roll'),
            stream: sessionStorage.getItem('stream'),
            isadmin: sessionStorage.getItem('isadmin') === "true",
            isactive: sessionStorage.getItem('isactive') === "true",
            isloggedin: true,
            authtoken: sessionStorage.getItem('auth_token')
        }
      }
      break;
    case "USER_AUTH_LOGIN_FAILED":
      state = {
        ...state,
        loginFlow: {
          loginFailed: true,
          registerFailed: false,
          message: action.response,
        }
      }
      break;
      default:
    }
    return state;
};

export default loginReducer;
