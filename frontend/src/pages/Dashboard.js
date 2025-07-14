// src/pages/Dashboard.js - VERSÃO COM API REAL
import React from 'react';
import { Message } from '../components/common';
import { useTasks, useDashboard } from '../services/api'; // 🔥 IMPORTANDO HOOKS DA API

const xpToNextLevel = (xp) => {
  const currentLevel = Math.floor(xp / 100) + 1;
  return (currentLevel * 100) - xp;
};

const Dashboard = ({ 
  user, 
  updateUser,
  message, 
  setMessage 
}) => {
  // 🔥 USANDO HOOKS REAIS DA API
  const { tasks, completeTask, loading: tasksLoading } = useTasks(user?.id);
  const { dashboard, loading: dashboardLoading } = useDashboard(user?.id);

  // Função para completar tarefa e atualizar usuário
  const handleCompleteTask = async (taskId) => {
    try {
      const response = await completeTask(taskId);
      
      // Atualizar dados do usuário se retornou
      if (response.user) {
        updateUser(response.user);
      }
      
      // Mostrar mensagem de sucesso
      setMessage({ 
        type: 'success', 
        text: `🎉 ${response.message}${response.level_up ? ' 🆙 LEVEL UP!' : ''}` 
      });
    } catch (error) {
      setMessage({ type: 'danger', text: 'Erro ao completar tarefa' });
    }
  };

  // Mostrar loading se ainda carregando
  if (tasksLoading || dashboardLoading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="mt-2">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Message message={message} setMessage={setMessage} />
      
      {/* Cards de estatísticas */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white h-100">
            <div className="card-body text-center">
              <h2 className="card-title">⭐ {user?.level}</h2>
              <p className="card-text">Level Atual</p>
              <small>{xpToNextLevel(user?.xp || 0)} XP para próximo level</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white h-100">
            <div className="card-body text-center">
              <h2 className="card-title">🔥 {user?.xp}</h2>
              <p className="card-text">XP Total</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-white h-100">
            <div className="card-body text-center">
              <h2 className="card-title">🏆 {user?.wins || 0}</h2>
              <p className="card-text">Vitórias</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-danger text-white h-100">
            <div className="card-body text-center">
              <h2 className="card-title">💀 {user?.losses || 0}</h2>
              <p className="card-text">Derrotas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progresso do Level */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">📈 Progresso do Level</h5>
          <div className="progress" style={{ height: '20px' }}>
            <div 
              className="progress-bar bg-gradient" 
              style={{ 
                width: `${((user?.xp || 0) % 100)}%`,
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
              }}
            >
              {user?.xp || 0} / {Math.ceil((user?.xp || 0) / 100) * 100} XP
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas do Dashboard */}
      {dashboard && (
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card bg-info text-white">
              <div className="card-body text-center">
                <h3>{dashboard.stats.total_tasks}</h3>
                <p>📋 Total de Tarefas</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success text-white">
              <div className="card-body text-center">
                <h3>{dashboard.stats.completed_tasks}</h3>
                <p>✅ Completadas</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-warning text-white">
              <div className="card-body text-center">
                <h3>{dashboard.stats.pending_tasks}</h3>
                <p>⏳ Pendentes</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tarefas recentes */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">📋 Últimas Tarefas</h5>
            </div>
            <div className="card-body">
              {tasks && tasks.length > 0 ? (
                tasks.slice(0, 3).map(task => (
                  <div key={task.id} className={`d-flex justify-content-between align-items-center mb-2 p-2 rounded ${task.completed ? 'bg-light text-muted' : 'bg-warning bg-opacity-10'}`}>
                    <div>
                      <strong>{task.title}</strong>
                      <br />
                      <small>
                        {task.difficulty === 'easy' && '🟢'} 
                        {task.difficulty === 'medium' && '🟡'} 
                        {task.difficulty === 'hard' && '🟠'} 
                        {task.difficulty === 'extreme' && '🔴'} 
                        {task.xp_reward} XP
                      </small>
                    </div>
                    {task.completed ? (
                      <span className="badge bg-success">✅ Concluída</span>
                    ) : (
                      <button 
                        className="btn btn-success btn-sm"
                        onClick={() => handleCompleteTask(task.id)}
                      >
                        ✅ Completar
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-muted text-center">
                  Nenhuma tarefa criada ainda. 
                  <br />
                  <small>Vá para "Tarefas" para criar sua primeira missão!</small>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">⚔️ Sistema de Desafios</h5>
            </div>
            <div className="card-body">
              <p className="text-muted text-center">
                🚧 Sistema de desafios em desenvolvimento!
                <br />
                <small>Em breve você poderá desafiar outros jogadores!</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dados do Dashboard da API */}
      {dashboard && dashboard.recent_tasks && dashboard.recent_tasks.length > 0 && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">📊 Tarefas Recentes (da API)</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {dashboard.recent_tasks.map(task => (
                    <div key={task.id} className="col-md-4 mb-2">
                      <div className={`p-2 rounded ${task.completed ? 'bg-success bg-opacity-10' : 'bg-primary bg-opacity-10'}`}>
                        <strong>{task.title}</strong>
                        <br />
                        <small>
                          {task.difficulty} - {task.xp_reward} XP
                          {task.completed && ' ✅'}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;