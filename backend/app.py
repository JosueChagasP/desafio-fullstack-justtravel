# 🎮 TASK GAME - BACKEND SIMPLES
# Versão que funciona com Python 3.13 sem SQLAlchemy

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import json
import os

# Configurar Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = 'just-travel-secret-2024'
CORS(app)

# Arquivo para salvar dados (substitui banco)
DATA_FILE = 'data.json'

# Inicializar arquivo de dados se não existir
def init_data():
    """Cria arquivo de dados inicial com usuários de exemplo"""
    if not os.path.exists(DATA_FILE):
        initial_data = {
            'users': [
                {
                    'id': 1,
                    'username': 'TaskMaster',
                    'email': 'master@example.com',
                    'password_hash': generate_password_hash('123456'),
                    'xp': 250,
                    'level': 3,
                    'wins': 5,
                    'losses': 1
                },
                {
                    'id': 2,
                    'username': 'CodeNinja',
                    'email': 'ninja@example.com',
                    'password_hash': generate_password_hash('123456'),
                    'xp': 180,
                    'level': 2,
                    'wins': 3,
                    'losses': 2
                },
                {
                    'id': 3,
                    'username': 'PixelWarrior',
                    'email': 'pixel@example.com',
                    'password_hash': generate_password_hash('123456'),
                    'xp': 120,
                    'level': 2,
                    'wins': 2,
                    'losses': 3
                }
            ],
            'tasks': [],
            'next_user_id': 4,
            'next_task_id': 1
        }
        save_data(initial_data)
        print("👥 Dados iniciais criados!")

# Carregar dados do arquivo
def load_data():
    """Carrega dados do arquivo JSON"""
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return {'users': [], 'tasks': [], 'next_user_id': 1, 'next_task_id': 1}

# Salvar dados no arquivo
def save_data(data):
    """Salva dados no arquivo JSON"""
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

# Calcular XP baseado na dificuldade
def get_xp_for_difficulty(difficulty):
    """Retorna XP baseado na dificuldade"""
    xp_map = {
        'easy': 10,
        'medium': 25,
        'hard': 50,
        'extreme': 100
    }
    return xp_map.get(difficulty.lower(), 10)

# Calcular level baseado no XP
def calculate_level(xp):
    """Calcula level: cada 100 XP = 1 level"""
    return (xp // 100) + 1

# Calcular taxa de vitória
def get_win_rate(wins, losses):
    """Calcula taxa de vitória em %"""
    total = wins + losses
    if total == 0:
        return 0
    return round((wins / total) * 100, 1)

# Encontrar usuário por ID
def find_user_by_id(user_id):
    """Busca usuário por ID"""
    data = load_data()
    for user in data['users']:
        if user['id'] == user_id:
            return user
    return None

# Encontrar usuário por username
def find_user_by_username(username):
    """Busca usuário por username"""
    data = load_data()
    for user in data['users']:
        if user['username'] == username:
            return user
    return None

# ===== ROTAS =====

@app.route('/api/register', methods=['POST'])
def register():
    """Registrar novo usuário"""
    try:
        req_data = request.get_json()
        
        # Validações
        if not req_data.get('username') or not req_data.get('email') or not req_data.get('password'):
            return jsonify({'error': 'Todos os campos são obrigatórios'}), 400
        
        data = load_data()
        
        # Verificar se username já existe
        if find_user_by_username(req_data['username']):
            return jsonify({'error': 'Username já existe'}), 400
        
        # Verificar se email já existe
        for user in data['users']:
            if user['email'] == req_data['email']:
                return jsonify({'error': 'Email já existe'}), 400
        
        # Criar novo usuário
        new_user = {
            'id': data['next_user_id'],
            'username': req_data['username'],
            'email': req_data['email'],
            'password_hash': generate_password_hash(req_data['password']),
            'xp': 0,
            'level': 1,
            'wins': 0,
            'losses': 0
        }
        
        # Salvar usuário
        data['users'].append(new_user)
        data['next_user_id'] += 1
        save_data(data)
        
        # Retornar dados do usuário (sem senha)
        user_response = new_user.copy()
        del user_response['password_hash']
        user_response['win_rate'] = 0
        
        return jsonify({
            'message': 'Usuario criado com sucesso!',
            'user': user_response
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    """Login de usuário"""
    try:
        req_data = request.get_json()
        
        user = find_user_by_username(req_data.get('username'))
        
        if user and check_password_hash(user['password_hash'], req_data.get('password')):
            # Retornar dados do usuário (sem senha)
            user_response = user.copy()
            del user_response['password_hash']
            user_response['win_rate'] = get_win_rate(user['wins'], user['losses'])
            
            return jsonify({
                'message': 'Login realizado com sucesso!',
                'user': user_response
            }), 200
        else:
            return jsonify({'error': 'Credenciais inválidas'}), 401
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    """Listar tarefas de um usuário"""
    try:
        user_id = request.args.get('user_id')
        if not user_id:
            return jsonify({'error': 'user_id é obrigatório'}), 400
        
        user_id = int(user_id)
        data = load_data()
        
        # Filtrar tarefas do usuário
        user_tasks = [task for task in data['tasks'] if task['user_id'] == user_id]
        user_tasks.sort(key=lambda x: x['created_at'], reverse=True)
        
        return jsonify(user_tasks), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/tasks', methods=['POST'])
def create_task():
    """Criar nova tarefa"""
    try:
        req_data = request.get_json()
        
        # Validações
        required_fields = ['title', 'difficulty', 'user_id']
        if not all(field in req_data for field in required_fields):
            return jsonify({'error': 'Campos obrigatórios: title, difficulty, user_id'}), 400
        
        user_id = int(req_data['user_id'])
        user = find_user_by_id(user_id)
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        data = load_data()
        
        # Criar nova tarefa
        new_task = {
            'id': data['next_task_id'],
            'title': req_data['title'],
            'description': req_data.get('description', ''),
            'difficulty': req_data['difficulty'],
            'xp_reward': get_xp_for_difficulty(req_data['difficulty']),
            'completed': False,
            'created_at': datetime.now().isoformat(),
            'completed_at': None,
            'user_id': user_id
        }
        
        # Salvar tarefa
        data['tasks'].append(new_task)
        data['next_task_id'] += 1
        save_data(data)
        
        return jsonify({
            'message': 'Tarefa criada com sucesso!',
            'task': new_task
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    """Atualizar tarefa (completar)"""
    try:
        req_data = request.get_json()
        data = load_data()
        
        # Encontrar tarefa
        task = None
        for t in data['tasks']:
            if t['id'] == task_id:
                task = t
                break
        
        if not task:
            return jsonify({'error': 'Tarefa não encontrada'}), 404
        
        # Se está marcando como completa
        if req_data.get('completed') and not task['completed']:
            task['completed'] = True
            task['completed_at'] = datetime.now().isoformat()
            
            # Dar XP ao usuário
            user = find_user_by_id(task['user_id'])
            if user:
                old_level = user['level']
                user['xp'] += task['xp_reward']
                user['level'] = calculate_level(user['xp'])
                level_up = user['level'] > old_level
                
                # Salvar mudanças
                save_data(data)
                
                # Retornar dados atualizados
                user_response = user.copy()
                del user_response['password_hash']
                user_response['win_rate'] = get_win_rate(user['wins'], user['losses'])
                
                return jsonify({
                    'message': f'Tarefa completada! +{task["xp_reward"]} XP',
                    'task': task,
                    'user': user_response,
                    'level_up': level_up
                }), 200
        
        # Outras atualizações
        if 'title' in req_data:
            task['title'] = req_data['title']
        if 'description' in req_data:
            task['description'] = req_data['description']
        
        save_data(data)
        
        return jsonify({
            'message': 'Tarefa atualizada com sucesso!',
            'task': task
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    """Deletar tarefa"""
    try:
        data = load_data()
        
        # Encontrar e remover tarefa
        data['tasks'] = [task for task in data['tasks'] if task['id'] != task_id]
        save_data(data)
        
        return jsonify({'message': 'Tarefa deletada com sucesso!'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/dashboard/<int:user_id>', methods=['GET'])
def get_dashboard(user_id):
    """Dados do dashboard"""
    try:
        user = find_user_by_id(user_id)
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        data = load_data()
        
        # Estatísticas de tarefas
        user_tasks = [task for task in data['tasks'] if task['user_id'] == user_id]
        total_tasks = len(user_tasks)
        completed_tasks = len([task for task in user_tasks if task['completed']])
        pending_tasks = total_tasks - completed_tasks
        
        # Últimas tarefas
        user_tasks.sort(key=lambda x: x['created_at'], reverse=True)
        recent_tasks = user_tasks[:5]
        
        # Progresso do level
        current_level_xp = (user['level'] - 1) * 100
        next_level_xp = user['level'] * 100
        xp_progress = user['xp'] - current_level_xp
        xp_needed = next_level_xp - user['xp']
        
        # Dados do usuário sem senha
        user_response = user.copy()
        del user_response['password_hash']
        user_response['win_rate'] = get_win_rate(user['wins'], user['losses'])
        
        return jsonify({
            'user': user_response,
            'stats': {
                'total_tasks': total_tasks,
                'completed_tasks': completed_tasks,
                'pending_tasks': pending_tasks,
                'current_level_xp': current_level_xp,
                'next_level_xp': next_level_xp,
                'xp_progress': xp_progress,
                'xp_needed': xp_needed
            },
            'recent_tasks': recent_tasks
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/ranking', methods=['GET'])
def get_ranking():
    """Ranking global"""
    try:
        data = load_data()
        
        # Ordenar usuários por XP
        users = data['users'].copy()
        users.sort(key=lambda x: x['xp'], reverse=True)
        
        ranking = []
        for i, user in enumerate(users[:50], 1):
            user_data = user.copy()
            del user_data['password_hash']
            user_data['position'] = i
            user_data['medal'] = '🥇' if i == 1 else '🥈' if i == 2 else '🥉' if i == 3 else ''
            user_data['win_rate'] = get_win_rate(user['wins'], user['losses'])
            ranking.append(user_data)
        
        return jsonify(ranking), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Inicializar quando servidor iniciar
if __name__ == '__main__':
    print("🚀 Iniciando Task Game Backend...")
    init_data()
    print("🌐 Servidor rodando em: http://localhost:5000")
    print("📊 Dados salvos em: data.json")
    app.run(debug=True, host='0.0.0.0', port=5000)