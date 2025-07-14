// src/components/common/Message.js
import React from 'react';

const Message = ({ message, setMessage }) => {
  if (!message) return null;
  
  return (
    <div 
      className={`alert alert-${message.type} alert-dismissible fade show position-relative overflow-hidden`} 
      role="alert"
      style={{
        background: message.type === 'success' ? 'linear-gradient(45deg, #28a745, #20c997)' : 
                   message.type === 'danger' ? 'linear-gradient(45deg, #dc3545, #fd7e14)' :
                   'linear-gradient(45deg, #17a2b8, #6f42c1)',
        border: 'none',
        color: 'white',
        fontWeight: 'bold',
        animation: 'slideInDown 0.5s ease-out'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: 'rgba(255,255,255,0.3)',
        animation: 'shrink 4s linear forwards'
      }}></div>
      
      {message.type === 'success' && '🎉 '}
      {message.type === 'danger' && '⚠️ '}
      {message.type === 'info' && 'ℹ️ '}
      {message.text}
      
      <button 
        type="button" 
        className="btn-close btn-close-white" 
        onClick={() => setMessage('')}
        style={{ filter: 'brightness(0) invert(1)' }}
      ></button>
    </div>
  );
};

export default Message;