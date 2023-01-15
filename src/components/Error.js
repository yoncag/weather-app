import React from 'react';

function Error({ error }) {
  return (
    <div className="error">
      <span className="error__code">{error.cod}</span>
      <span className="error__message">{error.message}</span>
    </div>
  );
}

export default Error;