import React from 'react';
import ForecastCard from './ForecastCard';

/**
 * TODOs: 
 * 1. Add timestamps.
 * 2. Add image alt.
 * 3. Process API data to look like the dummy data when connected.
 */

const Forecast = () => {
  const forecast = [
    {
      timestamp: '',
      day: 'Today',
      temperature: '19',
      description: 'Clouds',
      image: {
        src: '04n',
        alt: '',
      },
    },
    {
      timestamp: '',
      day: 'Wed',
      temperature: '18',
      description: 'Mist',
      image: {
        src: '50n',
        alt: '',
      },
    },
    {
      timestamp: '',
      day: 'Thu',
      temperature: '18',
      description: 'Snow',
      image: {
        src: '13n',
        alt: '',
      },
    },
    {
      timestamp: '',
      day: 'Fri',
      temperature: '19',
      description: 'Clear',
      image: {
        src: '01n',
        alt: '',
      },
    },
    {
      timestamp: '',
      day: 'Sat',
      temperature: '21',
      description: 'Rain',
      image: {
        src: '10n',
        alt: '',
      },
    },
  ];

  return (
    <div className="forecast">
      {forecast.map((day, idx) => {
        // TODO: isTodaysForecast should be based on the timestamp not index number.
        // TODO: key should be using timestamp not index number.
        const isTodaysForecast = idx === 0;
        const size = isTodaysForecast ? undefined : 'small';
        return (
          <ForecastCard 
            key={idx} 
            data={day} 
            size={size} 
          />
        );
      })}
    </div>
  );
};

export default Forecast;