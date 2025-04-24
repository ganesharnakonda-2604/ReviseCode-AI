// src/components/LoadingIndicator.js
import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = () => {
  return (
    <div className="loading-container">
      <div className="loading-message">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <p>Analyzing your code...</p>
        <p className="loading-subtext">The AI is reviewing your code for bugs, best practices, and improvements</p>
      </div>
    </div>
  );
};

export default LoadingIndicator;