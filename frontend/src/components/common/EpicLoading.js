// src/components/common/EpicLoading.js
import React from 'react';

const EpicLoading = ({ text }) => (
  <div className="d-flex align-items-center justify-content-center">
    <div 
      className="spinner-border text-light me-2" 
      style={{ 
        width: '20px', 
        height: '20px',
        animation: 'spin 1s linear infinite, pulse 2s ease-in-out infinite alternate'
      }}
    ></div>
    <span style={{ 
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: 'bold'
    }}>
      {text}
    </span>
  </div>
);

export default EpicLoading;