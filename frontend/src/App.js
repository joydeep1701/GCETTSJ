import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import Login from './components/login.js'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Login />

            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </Router>

    );
  }
}

export default App;
