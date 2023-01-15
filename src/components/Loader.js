import React from 'react';

const CONFIG = {
  message: 'Loading...',
};

function Loader() {
  return (
    <div className="loader">
      <span className="loader__icon"></span>
      <span className="loader__message">{CONFIG.message}</span>
    </div>
  );
}

export default Loader;