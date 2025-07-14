// src/utils/constants.js

export const API_BASE = 'http://localhost:5000';

export const DIFFICULTY_CONFIG = {
  easy: {
    label: '🟢 Fácil',
    taskXP: 10,
    challengeXP: 20,
    color: 'success'
  },
  medium: {
    label: '🟡 Médio',
    taskXP: 25,
    challengeXP: 50,
    color: 'warning'
  },
  hard: {
    label: '🟠 Difícil',
    taskXP: 50,
    challengeXP: 100,
    color: 'danger'
  },
  extreme: {
    label: '🔴 Extremo',
    taskXP: 100,
    challengeXP: 200,
    color: 'dark'
  }
};

export const PASSWORD_STRENGTH = {
  levels: ['Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte'],
  colors: ['danger', 'warning', 'info', 'success', 'success']
};

export const MESSAGE_TYPES = {
  SUCCESS: 'success',
  DANGER: 'danger',
  INFO: 'info',
  WARNING: 'warning'
};

export const XP_PER_LEVEL = 100;