import React from 'react';
import dayjs from 'dayjs';
import ForecastCard from './ForecastCard';

/**
 * NOTE:
 * list.dt     -> Time of data forecasted, unix, UTC
 * list.dt_txt -> Time of data forecasted, ISO, UTC
 * 
 * According to the documentation, these are supposed to be the same value but in a different format. 
 * However, the time doesn't match! e.g while list.dt is showing 12 o'clock, list.dt_txt is showing 9 o'clock.
 * Needs further investigation. For now, I'll be using list.dt_txt for the calculations.
*/

const CONFIG = {
  today: 'Today',
  dayFormat: 'ddd',
  hour: 12,
};

function isToday(date) {
  return dayjs().isSame(date, 'day');
}

function getDay(data) {
  return isToday(data) ? CONFIG.today : dayjs(data).format(CONFIG.dayFormat);
}

const Forecast = ({ data }) => {
  /**
   * NOTE:
   * For each day, I'll show the temperature at 12 o'clock. However, for today's temperature,
   * I'll use the first available data in the array, which is the current temperature.
   * 
   * Also, API returns today's forecast and the next 5 days. So, gotta make sure to include 
   * only the first 5 days including today.
   */
  const forecast = data.list.reduce((acc, curr, idx) => {
    const isCurrentForecast = idx === 0;
    const isNextForecast = dayjs(curr.dt_txt).hour() === CONFIG.hour && !isToday(curr.dt_txt);
    const isLimitReached = acc.length === 5;

    if (isCurrentForecast || isNextForecast && !isLimitReached) {
      acc.push({
        timestamp:   curr.dt_txt,
        day:         getDay(curr.dt_txt),
        temperature: Math.round(curr.main.temp),
        description: curr.weather[0].main,
        image: {
          src: curr.weather[0].icon,
          alt: curr.weather[0].description,
        },
      });
    }
    return acc;
  }, []);

  return (
    <div className="forecast">
      {forecast.map((day) => {
        const isTodaysForecast = isToday(day.timestamp);
        const size = isTodaysForecast ? undefined : 'small';
        return (
          <ForecastCard 
            key={day.timestamp} 
            data={day} 
            size={size} 
          />
        );
      })}
    </div>
  );
};

export default Forecast;