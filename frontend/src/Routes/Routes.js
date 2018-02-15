import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import React from 'react';
// import EnsureLoggedInContainer from './EnsureLoggedInContainer'
import {Login, Home} from '../containers'

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      sessionStorage.getItem('isloggedin') === "true" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const Routes = (props) => {
  console.log("%cROUTER_LOG", "background: #0028ef; color: #ffffff",props);
  return(
    <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" auth={props.auth} component={Home} />

    </Switch>

  )
}


export default Routes;
