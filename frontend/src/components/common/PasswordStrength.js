// src/components/common/PasswordStrength.js
import React from 'react';

const getPasswordStrength = (password) => {
  let strength = 0;
  let feedback = [];
  
  if (password.length >= 6) strength += 1;
  else feedback.push('Mínimo 6 caracteres');
  
  if (/[A-Z]/.test(password)) strength += 1;
  else feedback.push('Uma letra maiúscula');
  
  if (/[0-9]/.test(password)) strength += 1;
  else feedback.push('Um número');
  
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  else feedback.push('Um caractere especial');
  
  const levels = ['Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte'];
  const colors = ['danger', 'warning', 'info', 'success', 'success'];
  
  return {
    level: levels[strength] || 'Muito fraca',
    color: colors[strength] || 'danger',
    percentage: (strength / 4) * 100,
    feedback: feedback
  };
};

const PasswordStrength = ({ password }) => {
  if (!password) return null;
  
  const strength = getPasswordStrength(password);
  
  return (
    <div className="mt-2">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <small className="text-white-50">Força da senha:</small>
        <small className={`text-${strength.color} fw-bold`}>
          {strength.level}
        </small>
      </div>
      <div className="progress" style={{ height: '6px', borderRadius: '3px' }}>
        <div 
          className={`progress-bar bg-${strength.color}`}
          style={{ 
            width: `${strength.percentage}%`,
            transition: 'width 0.3s ease'
          }}
        ></div>
      </div>
      {strength.feedback.length > 0 && (
        <small className="text-white-50 d-block mt-1">
          Precisa: {strength.feedback.join(', ')}
        </small>
      )}
    </div>
  );
};

export default PasswordStrength;