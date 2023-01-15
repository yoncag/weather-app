import React, { Component } from 'react';
import axios from 'axios';
import Forecast from './Forecast';
import Loader from './Loader';

/**
 * TODOs:
 * 1. Add a navigation component.
 * 2. Show error.
 */

const CONFIG = {
  unit: 'metric',
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: {
        city: 'Ottawa',
        countryCode: 'CA',
      },
      data: [],
    };
  }

  async fetchForecastData({ city, countryCode }) {
    try {
      const response = await axios.get(`${process.env.API_URL}?q=${city},${countryCode}&units=${CONFIG.unit}&appid=${process.env.API_KEY}`);
      if (response.data?.cod === '200') return response.data;
    } catch(err) {
      console.log('Error:', err);
    }
  }

  async componentDidMount() {    
    const data = await this.fetchForecastData({ 
      city:        this.state.location.city, 
      countryCode: this.state.location.countryCode,
    });
    if (data) this.setState({ data });
  }
  
  render() {
    const isLoading = Object.keys(this.state.data).length === 0;
    if (isLoading) return <Loader />;

    return (
      <Forecast data={this.state.data} />
    );
  }
}

export default App;