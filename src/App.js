import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom'
import routes from './routes'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          {routes}
        </Router>
      </div>
    );
  }
}

export default App;
