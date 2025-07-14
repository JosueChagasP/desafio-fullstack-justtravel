// src/pages/ChallengesView.js - VERSÃO COM API REAL
import React, { useState } from 'react';
import { Message } from '../components/common';
import { useChallenges, useRanking } from '../services/api'; // 🔥 IMPORTANDO HOOKS DA API

const ChallengesView = ({ 
  user,
  updateUser,
  message, 
  setMessage 
}) => {
  // 🔥 USANDO HOOKS REAIS DA API
  const { challenges, createChallenge, loading: challengesLoading } = useChallenges(user?.id);
  const { ranking, loading: rankingLoading } = useRanking();

  // Estado local para formulário
  const [challengeForm, setChallengeForm] = useState({
    target_username: '',
    title: '',
    description: '',
    difficulty: 'easy',
    deadline: ''
  });

  // Função para criar desafio
  const handleCreateChallenge = async () => {
    if (!challengeForm.target_username || !challengeForm.title || !challengeForm.deadline) {
      setMessage({ type: 'danger', text: 'Preencha todos os campos obrigatórios' });
      return;
    }

    try {
      const response = await createChallenge(challengeForm);
      setMessage({ type: 'success', text: response.message });
      setChallengeForm({
        target_username: '',
        title: '',
        description: '',
        difficulty: 'easy',
        deadline: ''
      });
    } catch (error) {
      setMessage({ type: 'danger', text: 'Erro ao criar desafio' });
    }
  };

  // Função para completar desafio (simulada)
  const handleCompleteChallenge = (challengeId) => {
    setMessage({ 
      type: 'info', 
      text: '🚧 Sistema de completar desafios em desenvolvimento!' 
    });
  };

  // Mostrar loading se ainda carregando
  if (challengesLoading || rankingLoading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="mt-2">Carregando desafios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Message message={message} setMessage={setMessage} />
      
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">⚔️ Novo Desafio</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Oponente (Username)</label>
                <input
                  type="text"
                  className="form-control"
                  value={challengeForm.target_username}
                  onChange={(e) => setChallengeForm(prev => ({...prev, target_username: e.target.value}))}
                  placeholder="Digite o username do oponente"
                />
                <small className="text-muted">
                  Usuários disponíveis: {ranking?.slice(0, 5).map(u => u.username).join(', ')}
                </small>
              </div>
              <div className="mb-3">
                <label className="form-label">Título do Desafio</label>
                <input
                  type="text"
                  className="form-control"
                  value={challengeForm.title}
                  onChange={(e) => setChallengeForm(prev => ({...prev, title: e.target.value}))}
                  placeholder="Ex: Quem vai à academia primeiro?"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descrição</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={challengeForm.description}
                  onChange={(e) => setChallengeForm(prev => ({...prev, description: e.target.value}))}
                  placeholder="Descreva o desafio..."
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Dificuldade</label>
                <select
                  className="form-select"
                  value={challengeForm.difficulty}
                  onChange={(e) => setChallengeForm(prev => ({...prev, difficulty: e.target.value}))}
                >
                  <option value="easy">🟢 Fácil (20 XP)</option>
                  <option value="medium">🟡 Médio (50 XP)</option>
                  <option value="hard">🟠 Difícil (100 XP)</option>
                  <option value="extreme">🔴 Extremo (200 XP)</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Prazo</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={challengeForm.deadline}
                  onChange={(e) => setChallengeForm(prev => ({...prev, deadline: e.target.value}))}
                />
              </div>
              <button 
                onClick={handleCreateChallenge} 
                className="btn btn-danger w-100" 
                disabled={challengesLoading}
              >
                {challengesLoading ? '🔄 Criando...' : '⚔️ Criar Desafio'}
              </button>
            </div>
          </div>

          {/* Lista de usuários disponíveis */}
          <div className="card mt-3">
            <div className="card-header">
              <h6 className="mb-0">👥 Jogadores Disponíveis</h6>
            </div>
            <div className="card-body">
              {ranking && ranking.length > 0 ? (
                <div className="list-group list-group-flush">
                  {ranking
                    .filter(u => u.username !== user?.username)
                    .slice(0, 5)
                    .map(rankUser => (
                    <div key={rankUser.id} className="list-group-item border-0 px-0 py-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{rankUser.username}</strong>
                          <br />
                          <small className="text-muted">
                            Level {rankUser.level} • {rankUser.xp} XP
                          </small>
                        </div>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setChallengeForm(prev => ({...prev, target_username: rankUser.username}))}
                        >
                          Desafiar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">Carregando jogadores...</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">⚔️ Meus Desafios ({challenges?.length || 0})</h5>
            </div>
            <div className="card-body">
              {challenges && challenges.length > 0 ? (
                challenges.map(challenge => (
                  <div key={challenge.id} className="card mb-3 border-warning">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                          <h6 className="card-title">
                            {challenge.title}
                            {challenge.winner_id === user?.id && ' 🏆'}
                            {challenge.winner_id && challenge.winner_id !== user?.id && ' 💀'}
                          </h6>
                          {challenge.description && (
                            <p className="card-text text-muted">{challenge.description}</p>
                          )}
                          <p className="card-text">
                            <small className="text-muted">
                              Criador: {challenge.creator_id === user?.id ? 'Você' : 'Oponente'} | 
                              Alvo: {challenge.target_id === user?.id ? 'Você' : 'Oponente'} | 
                              Prazo: {new Date(challenge.deadline).toLocaleDateString('pt-BR')}
                            </small>
                          </p>
                          <div className="d-flex gap-2">
                            <span className={`badge ${
                              challenge.difficulty === 'easy' ? 'bg-success' :
                              challenge.difficulty === 'medium' ? 'bg-warning' :
                              challenge.difficulty === 'hard' ? 'bg-danger' : 'bg-dark'
                            }`}>
                              {challenge.difficulty === 'easy' && '🟢 Fácil'} 
                              {challenge.difficulty === 'medium' && '🟡 Médio'} 
                              {challenge.difficulty === 'hard' && '🟠 Difícil'} 
                              {challenge.difficulty === 'extreme' && '🔴 Extremo'}
                            </span>
                            <span className="badge bg-info">🔥 {challenge.xp_reward} XP</span>
                            <span className={`badge ${
                              challenge.status === 'pending' ? 'bg-warning' :
                              challenge.status === 'accepted' ? 'bg-primary' :
                              challenge.status === 'completed' ? 'bg-success' : 'bg-secondary'
                            }`}>
                              {challenge.status === 'pending' && '⏳ Pendente'}
                              {challenge.status === 'accepted' && '✅ Aceito'}
                              {challenge.status === 'completed' && '🏆 Finalizado'}
                              {challenge.status === 'expired' && '⌛ Expirado'}
                            </span>
                          </div>
                        </div>
                        {challenge.status === 'pending' && (
                          <button 
                            className="btn btn-warning btn-sm"
                            onClick={() => handleCompleteChallenge(challenge.id)}
                          >
                            🚧 Em Desenvolvimento
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted py-5">
                  <h4>⚔️</h4>
                  <p>Nenhum desafio criado ainda. Que tal desafiar alguém?</p>
                  <small>
                    Experimente desafiar: <strong>TaskMaster</strong>, <strong>CodeNinja</strong> ou <strong>PixelWarrior</strong>
                  </small>
                </div>
              )}
            </div>
          </div>

          {/* Sistema em desenvolvimento */}
          <div className="card mt-3">
            <div className="card-header bg-warning text-dark">
              <h6 className="mb-0">🚧 Recursos em Desenvolvimento</h6>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li>⚡ Sistema de aceitação automática de desafios</li>
                <li>🏆 Sistema de completamento e vitórias</li>
                <li>📊 Histórico detalhado de batalhas</li>
                <li>🎯 Notificações em tempo real</li>
                <li>⭐ Sistema de ranking por vitórias</li>
              </ul>
              <p className="mt-3 mb-0 text-muted">
                <small>Por enquanto, você pode criar desafios e ver a estrutura funcionando!</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengesView;