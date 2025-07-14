// src/utils/validation.js
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const getPasswordStrength = (password) => {
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