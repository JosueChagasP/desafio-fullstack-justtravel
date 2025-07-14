// src/App.js - VERSÃO COM API REAL
import React, { useState, useEffect } from 'react';
import './styles/global.css';
import { Message, AnimatedInput, PasswordStrength, EpicLoading } from './components/common';
import { Navigation } from './components/navigation';
import { Dashboard, TasksView, ChallengesView, RankingView } from './pages';
import { useUser } from './services/api'; // 🔥 IMPORTANDO API REAL

const App = () => {
  // 🔥 USANDO HOOK REAL DA API
  const { user, login, register, logout, loading, error, updateUser } = useUser();
  
  // Estados da aplicação
  const [currentView, setCurrentView] = useState('login');
  const [message, setMessage] = useState('');
  
  // Estados para formulários
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '' });

  // Auto-dismiss de mensagens
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Se usuário logou, ir para dashboard
  useEffect(() => {
    if (user) {
      setCurrentView('dashboard');
    }
  }, [user]);

  // Mostrar erro da API se houver
  useEffect(() => {
    if (error) {
      setMessage({ type: 'danger', text: error });
    }
  }, [error]);

  // 🔥 FUNÇÃO DE LOGIN REAL
  const handleLogin = async () => {
    if (!loginForm.username || !loginForm.password) {
      setMessage({ type: 'danger', text: 'Preencha todos os campos' });
      return;
    }

    try {
      await login(loginForm.username, loginForm.password);
      setMessage({ type: 'success', text: '🎉 Login realizado com sucesso!' });
      setLoginForm({ username: '', password: '' });
    } catch (err) {
      // Erro já tratado pelo hook
    }
  };

  // 🔥 FUNÇÃO DE REGISTRO REAL
  const handleRegister = async () => {
    if (!registerForm.username || !registerForm.email || !registerForm.password) {
      setMessage({ type: 'danger', text: 'Preencha todos os campos' });
      return;
    }

    try {
      await register(registerForm.username, registerForm.email, registerForm.password);
      setMessage({ type: 'success', text: '🎉 Conta criada e login realizado!' });
      setRegisterForm({ username: '', email: '', password: '' });
    } catch (err) {
      // Erro já tratado pelo hook
    }
  };

  // 🔥 FUNÇÃO DE LOGOUT REAL
  const handleLogout = () => {
    logout();
    setCurrentView('login');
    setMessage({ type: 'info', text: 'Logout realizado com sucesso!' });
  };

  // Se usuário não está logado, mostrar tela de autenticação
  if (!user) {
    return (
      <div 
        className="container-fluid vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          minHeight: '100vh'
        }}
      >
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        
        {/* Partículas de fundo */}
        <div className="position-absolute w-100 h-100">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="position-absolute rounded-circle bg-white"
              style={{
                width: Math.random() * 6 + 2 + 'px',
                height: Math.random() * 6 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5 + 0.1,
                animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </div>
        
        <div className="row w-100 justify-content-center position-relative">
          <div className="col-md-6 col-lg-4">
            <div 
              className="card border-0 shadow-lg position-relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '25px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              {/* Header épico */}
              <div className="card-header bg-transparent border-0 text-center py-4 position-relative">
                <div className="mb-3">
                  <div 
                    className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(45deg, #667eea, #764ba2)'
                    }}
                  >
                    <span style={{ fontSize: '40px' }}>🎮</span>
                  </div>
                </div>
                
                <h2 className="mb-2 text-white fw-bold">TASK GAME</h2>
                <p className="text-white-50 mb-0" style={{ fontSize: '14px', fontWeight: '500' }}>
                  ⚔️ Transforme suas tarefas em épicas batalhas! 🏆
                </p>
              </div>
              
              <div className="card-body p-4">
                <Message message={message} setMessage={setMessage} />
                
                {/* Botões de navegação */}
                <div className="d-flex gap-2 mb-4">
                  <button 
                    className={`btn flex-fill fw-bold py-2 ${
                      currentView === 'login' ? 'btn-light' : 'btn-outline-light'
                    }`}
                    onClick={() => setCurrentView('login')}
                    style={{ borderRadius: '15px', transition: 'all 0.3s ease' }}
                  >
                    🚀 Entrar
                  </button>
                  <button 
                    className={`btn flex-fill fw-bold py-2 ${
                      currentView === 'register' ? 'btn-light' : 'btn-outline-light'
                    }`}
                    onClick={() => setCurrentView('register')}
                    style={{ borderRadius: '15px', transition: 'all 0.3s ease' }}
                  >
                    ⭐ Criar Conta
                  </button>
                </div>

                {/* Formulário de Login */}
                {currentView === 'login' && (
                  <div>
                    <AnimatedInput
                      type="text"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm(prev => ({...prev, username: e.target.value}))}
                      placeholder="Digite seu username"
                      icon="👤"
                    />
                    
                    <AnimatedInput
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({...prev, password: e.target.value}))}
                      placeholder="Digite sua senha"
                      icon="🔐"
                    />
                    
                    <button 
                      onClick={handleLogin} 
                      className="btn btn-light btn-lg w-100 fw-bold mb-3" 
                      disabled={loading}
                      style={{
                        borderRadius: '15px',
                        background: loading ? 'rgba(255,255,255,0.7)' : 'linear-gradient(45deg, #fff, #f8f9fa)',
                        border: 'none',
                        color: '#333'
                      }}
                    >
                      {loading ? <EpicLoading text="Entrando na batalha..." /> : '🚀 ENTRAR NO JOGO'}
                    </button>
                  </div>
                )}

                {/* Formulário de Registro */}
                {currentView === 'register' && (
                  <div>
                    <AnimatedInput
                      type="text"
                      value={registerForm.username}
                      onChange={(e) => setRegisterForm(prev => ({...prev, username: e.target.value}))}
                      placeholder="Escolha seu nome de guerreiro"
                      icon="⚔️"
                    />
                    
                    <AnimatedInput
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm(prev => ({...prev, email: e.target.value}))}
                      placeholder="seu.email@batalha.com"
                      icon="📧"
                    />
                    
                    <AnimatedInput
                      type="password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm(prev => ({...prev, password: e.target.value}))}
                      placeholder="Crie uma senha épica"
                      icon="🛡️"
                    />
                    
                    <PasswordStrength password={registerForm.password} />
                    
                    <button 
                      onClick={handleRegister} 
                      className="btn btn-success btn-lg w-100 fw-bold mt-4 mb-3" 
                      disabled={loading}
                      style={{
                        borderRadius: '15px',
                        background: loading ? 'rgba(40, 167, 69, 0.7)' : 'linear-gradient(45deg, #28a745, #20c997)',
                        border: 'none'
                      }}
                    >
                      {loading ? <EpicLoading text="Criando seu herói..." /> : '⭐ COMEÇAR AVENTURA'}
                    </button>
                  </div>
                )}
                
                {/* Dica para login */}
                <div className="text-center mt-3">
                  <small className="text-white-50">
                    💡 Teste com: <strong>TaskMaster</strong> / <strong>123456</strong>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderização da aplicação logada
  return (
    <div className="min-vh-100 bg-light">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      
      <Navigation 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        user={user} 
        logout={handleLogout} 
      />
      
      {currentView === 'dashboard' && (
        <Dashboard 
          user={user} 
          updateUser={updateUser}
          message={message}
          setMessage={setMessage}
        />
      )}
      
      {currentView === 'tasks' && (
        <TasksView 
          user={user}
          updateUser={updateUser}
          message={message}
          setMessage={setMessage}
        />
      )}
      
      {currentView === 'challenges' && (
        <ChallengesView 
          user={user}
          updateUser={updateUser}
          message={message}
          setMessage={setMessage}
        />
      )}
      
      {currentView === 'ranking' && (
        <RankingView 
          user={user}
          message={message}
          setMessage={setMessage}
        />
      )}
    </div>
  );
};

export default App;