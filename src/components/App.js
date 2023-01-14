import React, { Component } from 'react';
import Forecast from './Forecast';

/**
 * TODOs:
 * 1. Fetch data from the API and pass into Forecast component.
 * 2. Add a navigation component.
 * 3. Show error.
 * 4. Show loading indicator.
 */

class App extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <Forecast />
    );
  }
}

export default App;