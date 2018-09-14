import React, { Component } from 'react';
import Calender from './containers/calender.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
            <Calender />
      </div>
    );
  }
}

export default App;
