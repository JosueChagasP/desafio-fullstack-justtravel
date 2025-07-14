/**
 * 🎮 TASK GAME - API SERVICE
 * Integração completa entre React Frontend e Flask Backend
 */

import React from 'react';

// Configuração base da API
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // ===== HELPER METHODS =====
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            throw error;
        }
    }

    // ===== AUTHENTICATION METHODS =====
    
    /**
     * 🔐 Login de usuário
     */
    async login(username, password) {
        return this.request('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
    }

    /**
     * 📝 Registro de novo usuário
     */
    async register(username, email, password) {
        return this.request('/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
        });
    }

    // ===== TASK METHODS =====
    
    /**
     * 📋 Buscar todas as tarefas do usuário
     */
    async getTasks(userId) {
        return this.request(`/tasks?user_id=${userId}`);
    }

    /**
     * ➕ Criar nova tarefa
     */
    async createTask(taskData) {
        return this.request('/tasks', {
            method: 'POST',
            body: JSON.stringify(taskData),
        });
    }

    /**
     * ✅ Completar tarefa (ganha XP!)
     */
    async completeTask(taskId) {
        return this.request(`/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify({ completed: true }),
        });
    }

    /**
     * ✏️ Atualizar tarefa
     */
    async updateTask(taskId, updates) {
        return this.request(`/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    }

    /**
     * 🗑️ Deletar tarefa
     */
    async deleteTask(taskId) {
        return this.request(`/tasks/${taskId}`, {
            method: 'DELETE',
        });
    }

    // ===== DASHBOARD METHODS =====
    
    /**
     * 📊 Dados completos do dashboard
     */
    async getDashboard(userId) {
        return this.request(`/dashboard/${userId}`);
    }

    // ===== RANKING METHODS =====
    
    /**
     * 🏆 Ranking global de usuários
     */
    async getRanking() {
        return this.request('/ranking');
    }

    // ===== CHALLENGE METHODS =====
    
    /**
     * ⚔️ Buscar desafios do usuário
     */
    async getChallenges(userId) {
        return this.request(`/challenges?user_id=${userId}`);
    }

    /**
     * 🎯 Criar novo desafio
     */
    async createChallenge(challengeData) {
        return this.request('/challenges', {
            method: 'POST',
            body: JSON.stringify(challengeData),
        });
    }
}

// Instância global da API
const api = new ApiService();

// ===== REACT HOOKS PERSONALIZADOS =====

/**
 * 🎣 Hook para gerenciar estado do usuário
 */
export const useUser = () => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const login = async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.login(username, password);
            setUser(response.user);
            localStorage.setItem('taskGameUser', JSON.stringify(response.user));
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (username, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.register(username, email, password);
            setUser(response.user);
            localStorage.setItem('taskGameUser', JSON.stringify(response.user));
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('taskGameUser');
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('taskGameUser', JSON.stringify(updatedUser));
    };

    // Carregar usuário do localStorage na inicialização
    React.useEffect(() => {
        const savedUser = localStorage.getItem('taskGameUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    return { user, loading, error, login, register, logout, updateUser };
};

/**
 * 📋 Hook para gerenciar tarefas
 */
export const useTasks = (userId) => {
    const [tasks, setTasks] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const fetchTasks = async () => {
        if (!userId) return;
        
        setLoading(true);
        try {
            const tasksData = await api.getTasks(userId);
            setTasks(tasksData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createTask = async (taskData) => {
        try {
            const response = await api.createTask({ ...taskData, user_id: userId });
            setTasks(prev => [response.task, ...prev]);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const completeTask = async (taskId) => {
        try {
            const response = await api.completeTask(taskId);
            setTasks(prev => prev.map(task => 
                task.id === taskId ? response.task : task
            ));
            return response; // Inclui level_up e user atualizado
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await api.deleteTask(taskId);
            setTasks(prev => prev.filter(task => task.id !== taskId));
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    React.useEffect(() => {
        fetchTasks();
    }, [userId]);

    return { 
        tasks, 
        loading, 
        error, 
        createTask, 
        completeTask, 
        deleteTask, 
        refetch: fetchTasks 
    };
};

/**
 * 📊 Hook para dados do dashboard
 */
export const useDashboard = (userId) => {
    const [dashboard, setDashboard] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const fetchDashboard = async () => {
        if (!userId) return;
        
        setLoading(true);
        try {
            const dashboardData = await api.getDashboard(userId);
            setDashboard(dashboardData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchDashboard();
    }, [userId]);

    return { dashboard, loading, error, refetch: fetchDashboard };
};

/**
 * 🏆 Hook para ranking
 */
export const useRanking = () => {
    const [ranking, setRanking] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const fetchRanking = async () => {
        setLoading(true);
        try {
            const rankingData = await api.getRanking();
            setRanking(rankingData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchRanking();
    }, []);

    return { ranking, loading, error, refetch: fetchRanking };
};

/**
 * ⚔️ Hook para desafios
 */
export const useChallenges = (userId) => {
    const [challenges, setChallenges] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const fetchChallenges = async () => {
        if (!userId) return;
        
        setLoading(true);
        try {
            const challengesData = await api.getChallenges(userId);
            setChallenges(challengesData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createChallenge = async (challengeData) => {
        try {
            const response = await api.createChallenge({ ...challengeData, creator_id: userId });
            setChallenges(prev => [response.challenge, ...prev]);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    React.useEffect(() => {
        fetchChallenges();
    }, [userId]);

    return { 
        challenges, 
        loading, 
        error, 
        createChallenge, 
        refetch: fetchChallenges 
    };
};

// ===== UTILITY FUNCTIONS =====

/**
 * 🎮 Configurações de dificuldade
 */
export const DIFFICULTY_CONFIG = {
    easy: { xp: 10, color: '#28a745', icon: '😊', label: 'Fácil' },
    medium: { xp: 25, color: '#ffc107', icon: '😐', label: 'Médio' },
    hard: { xp: 50, color: '#fd7e14', icon: '😤', label: 'Difícil' },
    extreme: { xp: 100, color: '#dc3545', icon: '🔥', label: 'Extremo' }
};

/**
 * 📈 Calcula level baseado no XP
 */
export const calculateLevel = (xp) => Math.floor(xp / 100) + 1;

/**
 * 📊 Calcula progresso para próximo level
 */
export const getLevelProgress = (xp) => {
    const currentLevel = calculateLevel(xp);
    const currentLevelXP = (currentLevel - 1) * 100;
    const nextLevelXP = currentLevel * 100;
    const progress = xp - currentLevelXP;
    const progressPercentage = (progress / 100) * 100;
    
    return {
        currentLevel,
        progress,
        progressPercentage,
        xpNeeded: nextLevelXP - xp
    };
};

/**
 * 🎯 Formatador de datas
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
};

/**
 * ⏰ Formatador de tempo relativo
 */
export const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'agora mesmo';
    if (diffMins < 60) return `${diffMins}m atrás`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h atrás`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d atrás`;
};

// Export da instância da API
export default api;