// src/pages/RankingView.js - VERSÃO COM API REAL
import React from 'react';
import { Message } from '../components/common';
import { useRanking } from '../services/api'; // 🔥 IMPORTANDO HOOK DA API

const RankingView = ({ user, message, setMessage }) => {
  // 🔥 USANDO HOOK REAL DA API
  const { ranking, loading, error, refetch } = useRanking();

  // Mostrar loading se ainda carregando
  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="mt-2">Carregando ranking...</p>
        </div>
      </div>
    );
  }

  // Mostrar erro se houver
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger text-center">
          <h5>❌ Erro ao carregar ranking</h5>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={refetch}>
            🔄 Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Message message={message} setMessage={setMessage} />
      
      {/* Header do Ranking */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card bg-gradient text-white" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
          }}>
            <div className="card-body text-center py-4">
              <h2 className="mb-3">🏆 RANKING GLOBAL</h2>
              <p className="mb-0">
                <strong>{ranking?.length || 0}</strong> guerreiros na batalha épica!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Podium Top 3 */}
      {ranking && ranking.length >= 3 && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header text-center">
                <h5 className="mb-0">🥇 PODIUM DOS CAMPEÕES</h5>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  {/* 2º Lugar */}
                  <div className="col-4">
                    <div className="card bg-light">
                      <div className="card-body">
                        <h1>🥈</h1>
                        <h6><strong>{ranking[1]?.username}</strong></h6>
                        <p className="mb-1">Level {ranking[1]?.level}</p>
                        <p className="mb-0 text-muted">{ranking[1]?.xp} XP</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* 1º Lugar */}
                  <div className="col-4">
                    <div className="card bg-warning text-dark">
                      <div className="card-body">
                        <h1>🥇</h1>
                        <h5><strong>{ranking[0]?.username}</strong></h5>
                        <p className="mb-1">Level {ranking[0]?.level}</p>
                        <p className="mb-0">{ranking[0]?.xp} XP</p>
                        <small>👑 CAMPEÃO</small>
                      </div>
                    </div>
                  </div>
                  
                  {/* 3º Lugar */}
                  <div className="col-4">
                    <div className="card bg-light">
                      <div className="card-body">
                        <h1>🥉</h1>
                        <h6><strong>{ranking[2]?.username}</strong></h6>
                        <p className="mb-1">Level {ranking[2]?.level}</p>
                        <p className="mb-0 text-muted">{ranking[2]?.xp} XP</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Tabela Completa do Ranking */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">📊 Classificação Completa</h5>
          <button className="btn btn-sm btn-outline-primary" onClick={refetch}>
            🔄 Atualizar
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Posição</th>
                  <th>Jogador</th>
                  <th>Level</th>
                  <th>XP</th>
                  <th>Vitórias</th>
                  <th>Derrotas</th>
                  <th>Taxa de Vitória</th>
                </tr>
              </thead>
              <tbody>
                {ranking && ranking.length > 0 ? (
                  ranking.map((player, index) => (
                    <tr 
                      key={player.id || player.username} 
                      className={player.username === user?.username ? 'table-warning' : ''}
                    >
                      <td>
                        <span className={`badge rounded-pill ${
                          index === 0 ? 'bg-warning text-dark' :
                          index === 1 ? 'bg-secondary' :
                          index === 2 ? 'bg-warning' : 'bg-primary'
                        }`}>
                          {player.position || index + 1}
                        </span>
                        {player.medal && <span className="ms-1">{player.medal}</span>}
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <strong>{player.username}</strong>
                          {player.username === user?.username && (
                            <span className="badge bg-info ms-2">Você</span>
                          )}
                          {index === 0 && <span className="ms-2">👑</span>}
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-primary">⭐ {player.level}</span>
                      </td>
                      <td>
                        <span className="badge bg-success">🔥 {player.xp}</span>
                      </td>
                      <td>
                        <span className="badge bg-warning text-dark">🏆 {player.wins}</span>
                      </td>
                      <td>
                        <span className="badge bg-danger">💀 {player.losses}</span>
                      </td>
                      <td>
                        <span className={`badge ${
                          player.win_rate >= 70 ? 'bg-success' : 
                          player.win_rate >= 40 ? 'bg-warning text-dark' : 
                          'bg-danger'
                        }`}>
                          {player.win_rate}%
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-5">
                      <h4>🏆</h4>
                      <p>Nenhum jogador no ranking ainda.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Estatísticas do Ranking */}
      {ranking && ranking.length > 0 && (
        <div className="row mt-4">
          <div className="col-md-3">
            <div className="card bg-primary text-white text-center">
              <div className="card-body">
                <h4>{ranking.length}</h4>
                <p className="mb-0">👥 Total de Jogadores</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-success text-white text-center">
              <div className="card-body">
                <h4>{Math.max(...ranking.map(p => p.xp))}</h4>
                <p className="mb-0">🔥 Maior XP</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-warning text-dark text-center">
              <div className="card-body">
                <h4>{Math.max(...ranking.map(p => p.level))}</h4>
                <p className="mb-0">⭐ Maior Level</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-info text-white text-center">
              <div className="card-body">
                <h4>{Math.round(ranking.reduce((acc, p) => acc + p.xp, 0) / ranking.length)}</h4>
                <p className="mb-0">📊 XP Médio</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sua Posição */}
      {ranking && user && (
        <div className="card mt-4">
          <div className="card-header">
            <h6 className="mb-0">🎯 Sua Performance</h6>
          </div>
          <div className="card-body">
            {(() => {
              const userPosition = ranking.findIndex(p => p.username === user.username);
              if (userPosition === -1) {
                return <p className="text-muted">Você ainda não está no ranking. Complete algumas tarefas!</p>;
              }
              
              const userRank = ranking[userPosition];
              return (
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Posição:</strong> #{userRank.position} de {ranking.length}</p>
                    <p><strong>Level:</strong> {userRank.level}</p>
                    <p><strong>XP Total:</strong> {userRank.xp}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Vitórias:</strong> {userRank.wins}</p>
                    <p><strong>Derrotas:</strong> {userRank.losses}</p>
                    <p><strong>Taxa de Vitória:</strong> {userRank.win_rate}%</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default RankingView;