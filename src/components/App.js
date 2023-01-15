import React, { Component } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Forecast from './Forecast';
import Loader from './Loader';

/**
 * TODOs:
 * 1. Show error.
 */

const CONFIG = {
  locations: [
    {
      city: 'Ottawa',
      countryCode: 'CA',
    },
    {
      city: 'Moscow',
      countryCode: 'RU',
    },
    {
      city: 'Tokyo',
      countryCode: 'JP',
    },
  ],
  unit: 'metric',
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: {
        city:        CONFIG.locations[0].city,
        countryCode: CONFIG.locations[0].countryCode,
      },
      data: [],
    };
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleLocationChange(location) {
    this.setState({ location });
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
  
  async componentDidUpdate(prevProps, prevState) {
    if (this.state.location.city !== prevState.location.city) {
      const data = await this.fetchForecastData({ 
        city:        this.state.location.city, 
        countryCode: this.state.location.countryCode,
      });
      if (data) this.setState({ data });
    }
  }

  render() {
    const isLoading = Object.keys(this.state.data).length === 0;
    if (isLoading) return <Loader />;

    return (
      <div className="container">
        <Nav 
          locations={CONFIG.locations}
          activeLocation={this.state.location}
          handleLocationChange={this.handleLocationChange} 
        />
        <Forecast data={this.state.data} />
      </div>
    );
  }
}

export default App;