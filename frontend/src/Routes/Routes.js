import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import React from 'react';
// import EnsureLoggedInContainer from './EnsureLoggedInContainer'
import {Login, Home, ProblemsDashboard,IDE,Problem} from '../containers'

const PrivateRoute = ({ component: Component, ...rest }) => (
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
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/IDE" component={IDE} />
        <PrivateRoute exact path="/problem/:id" component={Problem} />
        <PrivateRoute exact path="/problems" component={ProblemsDashboard} />
    </Switch>

  )
}


export default Routes;
