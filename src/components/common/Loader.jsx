import React from 'react';

const Loader = ({ size = 'md', fullScreen = false, text = 'Loading...' }) => {
  const sizeMap = {
    sm: '30px',
    md: '50px',
    lg: '70px'
  };

  const spinnerSize = sizeMap[size] || sizeMap.md;

  if (fullScreen) {
    return (
      <div className="loader-fullscreen">
        <div className="loader-container">
          <div className="loader-spinner" style={{ width: spinnerSize, height: spinnerSize }}></div>
          {text && <p className="loader-text">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="loader-container">
      <div className="loader-spinner" style={{ width: spinnerSize, height: spinnerSize }}></div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default Loader;