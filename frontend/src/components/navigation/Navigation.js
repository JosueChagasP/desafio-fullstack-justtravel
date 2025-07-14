// src/components/navigation/Navigation.js
import React from 'react';

const Navigation = ({ currentView, setCurrentView, user, logout }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div className="container">
      <span className="navbar-brand mb-0 h1">
        🎮 <strong>Task Game</strong>
      </span>
      
      <div className="navbar-nav me-auto">
        <button 
          className={`nav-link btn ${currentView === 'dashboard' ? 'text-warning' : 'text-light'}`} 
          onClick={() => setCurrentView('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          className={`nav-link btn ${currentView === 'tasks' ? 'text-warning' : 'text-light'}`} 
          onClick={() => setCurrentView('tasks')}
        >
          📋 Tarefas
        </button>
        <button 
          className={`nav-link btn ${currentView === 'challenges' ? 'text-warning' : 'text-light'}`} 
          onClick={() => setCurrentView('challenges')}
        >
          ⚔️ Desafios
        </button>
        <button 
          className={`nav-link btn ${currentView === 'ranking' ? 'text-warning' : 'text-light'}`} 
          onClick={() => setCurrentView('ranking')}
        >
          🏆 Ranking
        </button>
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="text-light">
          <small>
            👤 <strong>{user?.username}</strong> | 
            ⭐ Level {user?.level} | 
            🔥 {user?.xp} XP
          </small>
        </div>
        <button className="btn btn-outline-light btn-sm" onClick={logout}>
          🚪 Sair
        </button>
      </div>
    </div>
  </nav>
);

export default Navigation;