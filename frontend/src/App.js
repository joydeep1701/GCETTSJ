import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loginAction, logoutAction} from './actions/authActions.js'
import Login from './components/login.js'

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <Router>
        <div className="ui container">
          <p>Logged In:<b>{""+this.props.user.isloggedin}</b></p>
          <p>Auth Token: <b>{""+this.props.user.authtoken}</b></p>
          <button className="button" onClick={() => this.props.loginAction("bla")}>Login</button>
          <br/>
          <br/>
          <button className="button" onClick={() => this.props.logoutAction()}>Logout</button>
        </div>
      </Router>

    );
  }
}

function mapStateToProps(state) {
  console.log("STATE:",state);
  return {
    user: state.loginReducer.user,
  };
}
function matchDispatchToProps(dispatch) {
  return {
    loginAction: (name) => {
      dispatch(loginAction(name));
    },
    logoutAction: (name) => {
      dispatch(logoutAction(name));
    }
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
