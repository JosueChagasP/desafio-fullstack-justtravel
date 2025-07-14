// src/components/common/AnimatedInput.js
import React, { useState } from 'react';

const AnimatedInput = ({ 
  type, 
  value, 
  onChange, 
  placeholder, 
  icon, 
  onKeyPress, 
  validation,
  showPassword,
  togglePassword 
}) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className="position-relative mb-3">
      <div 
        className={`input-group ${focused ? 'focused' : ''}`}
        style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '15px',
          border: `2px solid ${
            validation?.isValid === false ? '#dc3545' : 
            validation?.isValid === true ? '#28a745' : 
            focused ? '#667eea' : 'rgba(255,255,255,0.2)'
          }`,
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          boxShadow: focused ? '0 0 20px rgba(102, 126, 234, 0.3)' : 'none'
        }}
      >
        <span className="input-group-text border-0 bg-transparent text-white">
          {icon}
        </span>
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          className="form-control border-0 bg-transparent text-white"
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            fontSize: '16px',
            fontWeight: '500'
          }}
        />
        {type === 'password' && (
          <button
            type="button"
            className="btn border-0 bg-transparent text-white"
            onClick={togglePassword}
            style={{ fontSize: '16px' }}
          >
            {showPassword ? '👁️' : '🙈'}
          </button>
        )}
        {validation?.isValid === true && (
          <span className="input-group-text border-0 bg-transparent text-success">
            ✅
          </span>
        )}
        {validation?.isValid === false && (
          <span className="input-group-text border-0 bg-transparent text-danger">
            ❌
          </span>
        )}
      </div>
      
      {validation?.message && (
        <small 
          className={`d-block mt-1 ${validation.isValid ? 'text-success' : 'text-danger'}`}
          style={{ 
            animation: 'fadeIn 0.3s ease',
            fontSize: '12px',
            fontWeight: '500'
          }}
        >
          {validation.message}
        </small>
      )}
    </div>
  );
};

export default AnimatedInput;