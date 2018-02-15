import React, { Component } from 'react';
import {
  HashRouter as Router,
} from 'react-router-dom';
import {loginFromSessionData} from './actions/authActions.js'

import Routes from './Routes/Routes.js'
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
// import Login from './containers/Login.js'
// import Home from './containers/Home';

class App extends Component {
  componentWillMount() {
    if(sessionStorage.getItem('isloggedin') === "true"){
      console.log("Load from previous state");
      //console.log("loginFromSessionData Called");
      this.props.loginFromSessionData();
    }
  }
  render() {
    return (
      <Router>
        <div>
          <Routes auth={this.props.user.isloggedin} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.loginReducer.user,
  };
}
function matchDispatchToProps(dispatch) {
  return {
    loginFromSessionData: () => {
      //console.log("loginFromSessionData Called");
      dispatch(loginFromSessionData());
    }
  }
}
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(App));
