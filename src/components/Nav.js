import React from 'react';

const Nav = ({ locations, activeLocation, handleLocationChange }) => {
  const navItems = locations.map((location) => {
    const isActiveLocation = activeLocation.city === location.city;
    return (
      <li 
        key={location.countryCode} 
        className={'nav__item' + (isActiveLocation ? ' nav__item--active' : '')}
        onClick={() => handleLocationChange({ city: location.city, countryCode: location.countryCode })}
      >
        {location.city}
      </li>
    );
  });
  return <ul className="nav">{navItems}</ul>;
};

export default Nav;