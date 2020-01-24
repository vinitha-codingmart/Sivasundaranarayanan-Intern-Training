import React, { Component } from 'react';
import Auth from './Pages/Auth/Auth'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MainPage from './Pages/MainPage/MainPage';

import './App.css';

class App extends Component {

  render() {

    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/Auth" component={Auth} />
            <Route path="/" component= {MainPage} />
          </Switch>
        </div>
      </Router>
    );
  }

}

export default App
