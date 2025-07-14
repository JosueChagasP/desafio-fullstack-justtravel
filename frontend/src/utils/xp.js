// src/utils/xp.js
export const xpToNextLevel = (xp) => {
  const currentLevel = Math.floor(xp / 100) + 1;
  return (currentLevel * 100) - xp;
};

export const calculateLevel = (xp) => {
  return Math.floor(xp / 100) + 1;
};

export const getLevelProgress = (xp) => {
  return (xp % 100);
};