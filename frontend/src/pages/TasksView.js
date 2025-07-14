// src/pages/TasksView.js - VERSÃO COM API REAL
import React, { useState } from 'react';
import { Message } from '../components/common';
import { useTasks } from '../services/api'; // 🔥 IMPORTANDO HOOK DA API

const TasksView = ({ 
  user,
  updateUser,
  message, 
  setMessage 
}) => {
  // 🔥 USANDO HOOK REAL DA API
  const { tasks, createTask, completeTask, deleteTask, loading } = useTasks(user?.id);
  
  // Estado local para formulário
  const [taskForm, setTaskForm] = useState({ 
    title: '', 
    description: '', 
    difficulty: 'easy' 
  });

  // Função para criar tarefa
  const handleCreateTask = async () => {
    if (!taskForm.title.trim()) {
      setMessage({ type: 'danger', text: 'Título é obrigatório' });
      return;
    }

    try {
      await createTask(taskForm);
      setTaskForm({ title: '', description: '', difficulty: 'easy' });
      setMessage({ type: 'success', text: 'Tarefa criada com sucesso!' });
    } catch (error) {
      setMessage({ type: 'danger', text: 'Erro ao criar tarefa' });
    }
  };

  // Função para completar tarefa
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

  // Função para deletar tarefa
  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Tem certeza que deseja deletar esta tarefa?')) {
      try {
        await deleteTask(taskId);
        setMessage({ type: 'info', text: 'Tarefa deletada com sucesso!' });
      } catch (error) {
        setMessage({ type: 'danger', text: 'Erro ao deletar tarefa' });
      }
    }
  };

  return (
    <div className="container mt-4">
      <Message message={message} setMessage={setMessage} />
      
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">➕ Nova Tarefa</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Título</label>
                <input
                  type="text"
                  className="form-control"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm(prev => ({...prev, title: e.target.value}))}
                  placeholder="Ex: Estudar React"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descrição</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={taskForm.description}
                  onChange={(e) => setTaskForm(prev => ({...prev, description: e.target.value}))}
                  placeholder="Descreva sua tarefa..."
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Dificuldade</label>
                <select
                  className="form-select"
                  value={taskForm.difficulty}
                  onChange={(e) => setTaskForm(prev => ({...prev, difficulty: e.target.value}))}
                >
                  <option value="easy">🟢 Fácil (10 XP)</option>
                  <option value="medium">🟡 Médio (25 XP)</option>
                  <option value="hard">🟠 Difícil (50 XP)</option>
                  <option value="extreme">🔴 Extremo (100 XP)</option>
                </select>
              </div>
              <button 
                onClick={handleCreateTask} 
                className="btn btn-primary w-100" 
                disabled={loading}
              >
                {loading ? '🔄 Criando...' : '➕ Criar Tarefa'}
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">📋 Minhas Tarefas ({tasks?.length || 0})</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                  <p className="mt-2">Carregando tarefas...</p>
                </div>
              ) : (
                <>
                  {tasks && tasks.length > 0 ? (
                    tasks.map(task => (
                      <div key={task.id} className={`card mb-3 ${task.completed ? 'bg-light' : ''}`}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                              <h6 className={`card-title ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                                {task.title}
                              </h6>
                              {task.description && (
                                <p className="card-text text-muted">{task.description}</p>
                              )}
                              <div className="d-flex gap-2">
                                <span className={`badge ${
                                  task.difficulty === 'easy' ? 'bg-success' :
                                  task.difficulty === 'medium' ? 'bg-warning' :
                                  task.difficulty === 'hard' ? 'bg-danger' : 'bg-dark'
                                }`}>
                                  {task.difficulty === 'easy' && '🟢 Fácil'} 
                                  {task.difficulty === 'medium' && '🟡 Médio'} 
                                  {task.difficulty === 'hard' && '🟠 Difícil'} 
                                  {task.difficulty === 'extreme' && '🔴 Extremo'}
                                </span>
                                <span className="badge bg-info">🔥 {task.xp_reward} XP</span>
                                {task.completed && (
                                  <span className="badge bg-success">✅ Concluída</span>
                                )}
                              </div>
                            </div>
                            <div className="d-flex gap-2">
                              {!task.completed && (
                                <button 
                                  className="btn btn-success btn-sm"
                                  onClick={() => handleCompleteTask(task.id)}
                                >
                                  ✅ Completar
                                </button>
                              )}
                              <button 
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteTask(task.id)}
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted py-5">
                      <h4>📋</h4>
                      <p>Nenhuma tarefa criada ainda. Que tal criar a primeira?</p>
                      <small>
                        💡 Dica: Crie tarefas e complete para ganhar XP e subir de level!
                      </small>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksView;