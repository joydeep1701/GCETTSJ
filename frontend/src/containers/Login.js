import React, {Component} from 'react';
import {loginAction, logoutAction, loginFromSessionData} from '../actions/authActions.js'
import {connect} from 'react-redux';
import {withRouter} from 'react-router'

import { Menu, Grid, Container, Header, } from 'semantic-ui-react'
import LoginForm from '../components/LoginForm.js';
import RegisterForm from '../components/RegisterForm.js';

class Login extends Component {

  componentWillMount() {
    if(sessionStorage.getItem('isloggedin') === "true"){
      console.log("Load from previous state");
      //console.log("loginFromSessionData Called");
      //this.props.loginFromSessionData();
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.log("COmponent Will Update");
    // console.log(nextProps);
    if(nextProps.user.isloggedin === true) {
      this.props.history.push('/');
    }
  }
  render() {
    //console.log("FROM LOGIN PAGE",this.props);

    return(
      <div>
        {/* <div className="ui container">
          <p>Logged In:<b>{""+this.props.user.isloggedin}</b></p>
          <p>Auth Token: <b>{""+this.props.user.authtoken}</b></p>
          <button className="button">Login</button>
          <br/>
          <br/>
          <button className="button" onClick={() => this.props.logoutAction()}>Logout</button>
        </div> */}
        <Menu stackable inverted size="huge">
          <Menu.Item>
            GCETTSJ
          </Menu.Item>
        </Menu>
        <Container padded={"true"}>
          <Header as='h1' textAlign='center'>Welcome to GCETTS Judge</Header>
          <Grid columns={2} divided padded>
            <Grid.Column>
              <RegisterForm />
            </Grid.Column>
            <Grid.Column>
              <LoginForm status={this.props.loginFlow} loginAction={this.props.loginAction}/>
            </Grid.Column>
          </Grid>

        </Container>

      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.loginReducer.user,
    loginFlow: state.loginReducer.loginFlow,
  };
}
function matchDispatchToProps(dispatch) {
  return {
    loginAction: (name) => {
      dispatch(loginAction(name));
    },
    logoutAction: (name) => {
      dispatch(logoutAction(name));
    },
    loginFromSessionData: () => {
      //console.log("loginFromSessionData Called");
      dispatch(loginFromSessionData());
    }
  }
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Login));
