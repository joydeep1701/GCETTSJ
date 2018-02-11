const loginReducer = (state={
  user:  {
      name: null,
      univ_roll: null,
      stream: null,
      isadmin: false,
      isactive: null,
      isloggedin: false,
      authtoken: null
  }
}, action) => {
  console.log("FROM: Login Reducer\n, STATE:",state,"ACTION:",action);
  switch (action.type) {
    case "USER_AUTH_LOGIN":
      state = {
        ...state,
        user: {
          name: "Random Name",
          univ_roll: "10089",
          stream: "CSE",
          isadmin: false,
          isactive: true,
          isloggedin: true,
          authtoken: "some_random_token"
        }
      }
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
      break;
    }
    return state;
};

export default loginReducer;
