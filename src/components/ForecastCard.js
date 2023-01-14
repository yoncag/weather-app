import React from 'react';

const ForecastCard = ({ data, size }) => (
  <div className={'forecast__card' + (size ? ` forecast__card--${size}` : '')}>
    <span className="forecast__info forecast__info--day">
      {data.day}
    </span>
    <span className="forecast__info forecast__info--icon">
      <img 
        src={require(`../images/${data.image.src}.png`)} 
        alt={data.image.alt} 
      />
    </span>
    <span className="forecast__info forecast__info--temperature">
      {data.temperature}
    </span>
    <span className="forecast__info forecast__info--description">
      {data.description}
    </span>
  </div>
);

export default ForecastCard;