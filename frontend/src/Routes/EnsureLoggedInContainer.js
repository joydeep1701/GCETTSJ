import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter, Redirect } from 'react-router-dom'

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {
    const { dispatch, currentURL } = this.props;

  //   if (!this.props.isLoggedIn) {
  //     // set the current url/path for future redirection (we use a Redux action)
  //     // then redirect (we use a React Router method)
  //     // dispatch(setRedirectUrl(currentURL))
  //     BrowserRouter.push("/login")
  //   }
   }

  render() {
    if (this.props.isLoggedIn) {
      return this.props.children
    } else {
      return (
        <Redirect path="/login"/>
      )
    }
  };
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.loginReducer.user.isloggedin,
    currentURL: ownProps.location.pathname
  };
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)
