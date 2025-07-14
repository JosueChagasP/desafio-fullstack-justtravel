# 🎮 TASK GAME - DESAFIO FULLSTACK JUST TRAVEL

**Sistema de gamificação de tarefas com React.js + Flask**

## 🎯 SOBRE O PROJETO

Aplicação fullstack que transforma tarefas do dia a dia em um jogo épico com sistema de XP, levels e ranking global. Desenvolvido para o desafio técnico de estágio da Just Travel.

### ✨ FUNCIONALIDADES IMPLEMENTADAS

- ✅ **Sistema completo de autenticação** (login/registro)
- ✅ **CRUD de tarefas** com persistência real
- ✅ **Sistema de gamificação** (XP, levels, ranking)
- ✅ **Dashboard épico** com estatísticas em tempo real
- ✅ **Design responsivo** e interface intuitiva
- ✅ **API REST completa** com Flask
- ✅ **Persistência de dados** em arquivo JSON

### 🏆 EXTRAS IMPLEMENTADOS

- 🎮 **Interface gaming** com animações e efeitos visuais
- 📊 **Dashboard avançado** com múltiplas métricas
- 🏅 **Sistema de ranking** com podium e medalhas
- ⚔️ **Sistema de desafios** (estrutura base)
- 🎨 **Design moderno** com gradientes e animações

---

## 🛠️ TECNOLOGIAS UTILIZADAS

### **Frontend**
- **React.js** - Biblioteca principal
- **Bootstrap 5** - Framework CSS
- **Custom Hooks** - Gerenciamento de estado
- **Fetch API** - Comunicação com backend

### **Backend**
- **Flask** - Framework web Python
- **Flask-CORS** - Configuração CORS
- **Werkzeug** - Criptografia de senhas
- **JSON** - Persistência de dados

---

## 🚀 COMO EXECUTAR O PROJETO

### **PRÉ-REQUISITOS**
- Python 3.7+ instalado
- Node.js 14+ instalado
- npm ou yarn

### **1. CONFIGURAR BACKEND**

```bash
# Navegar para pasta backend
cd backend/

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Executar servidor Flask
python app.py
```

**✅ Backend rodando em:** `http://localhost:5000`

### **2. CONFIGURAR FRONTEND**

```bash
# Em outro terminal, navegar para pasta frontend
cd frontend/

# Instalar dependências
npm install

# Executar aplicação React
npm start
```

**✅ Frontend rodando em:** `http://localhost:3000`

---

## 🧪 COMO TESTAR

### **Usuários de Exemplo (já criados):**
```
Username: TaskMaster  | Password: 123456
Username: CodeNinja   | Password: 123456
Username: PixelWarrior| Password: 123456
```

### **Fluxo de Teste Completo:**
1. **Acesse:** http://localhost:3000
2. **Faça login** com `TaskMaster` / `123456`
3. **Crie algumas tarefas** com diferentes dificuldades
4. **Complete as tarefas** e veja o XP aumentar
5. **Observe o level up** quando atingir 100 XP
6. **Veja o Dashboard** com estatísticas atualizadas
7. **Confira o Ranking** com sua posição
8. **Teste criar desafios** para outros usuários

---

## 📊 ESTRUTURA DO PROJETO

```
desafio-fullstack-justtravel/
├── frontend/                 # Aplicação React.js
│   ├── public/
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   │   ├── common/       # Componentes base
│   │   │   └── navigation/   # Sistema de navegação
│   │   ├── pages/           # Views principais
│   │   │   ├── Dashboard.js
│   │   │   ├── TasksView.js
│   │   │   ├── ChallengesView.js
│   │   │   └── RankingView.js
│   │   ├── services/        # API e hooks
│   │   │   └── api.js       # Integração com backend
│   │   ├── styles/          # Estilos globais
│   │   └── utils/           # Funções utilitárias
│   ├── package.json
│   └── README.md
├── backend/                 # API Flask
│   ├── app.py              # Aplicação principal
│   ├── requirements.txt    # Dependências Python
│   ├── data.json          # Banco de dados JSON
│   ├── run.bat            # Script Windows
│   └── setup.bat          # Setup automático
└── README.md              # Este arquivo
```

---

## 🎮 DEMONSTRAÇÃO DE HABILIDADES

### **React.js Avançado**
- ✅ **Arquitetura modular** (25+ arquivos organizados)
- ✅ **Custom Hooks** para API
- ✅ **Gerenciamento de estado** complexo
- ✅ **Componentização** eficiente
- ✅ **Responsive design** moderno

### **Flask Profissional**
- ✅ **API REST** completa
- ✅ **Autenticação** segura
- ✅ **Persistência** de dados
- ✅ **Validações** robustas
- ✅ **CORS** configurado

### **Integração Fullstack**
- ✅ **Comunicação** React ↔ Flask
- ✅ **Estado sincronizado** frontend/backend
- ✅ **Tratamento de erros** completo
- ✅ **Loading states** e UX polida

---

## 🏆 RESULTADOS ALCANÇADOS

### **Funcionalidades Obrigatórias**
- ✅ Adicionar nova tarefa à lista
- ✅ Marcar tarefa como concluída
- ✅ Remover tarefa da lista
- ✅ Persistência no backend
- ✅ Design responsivo e intuitivo

### **Extras Entregues**
- 🎮 **Sistema de gamificação** completo
- 📊 **Dashboard** com múltiplas métricas
- 🏅 **Ranking global** interativo
- ⚔️ **Sistema de desafios** (base)
- 🎨 **Interface épica** gaming style
- 🔐 **Autenticação** completa

---

## 📈 MÉTRICAS DO PROJETO

| Métrica | Valor |
|---------|-------|
| **Arquivos Frontend** | 25+ arquivos organizados |
| **Linhas de Código** | 2000+ linhas |
| **Componentes React** | 15+ componentes |
| **Rotas API** | 10+ endpoints |
| **Funcionalidades** | 20+ features |

---

## 🚀 DEPLOY E PRODUÇÃO

### **Próximos Passos Possíveis:**
- [ ] Deploy frontend no **Vercel**
- [ ] Deploy backend no **Render/Heroku**
- [ ] Migração para **PostgreSQL**
- [ ] Implementação de **JWT**
- [ ] **PWA** com offline support
- [ ] **Notificações** push

---

## 👨‍💻 DESENVOLVEDOR

**Nome:** Josué Chagas
**Email:** Josuepereirajp7@gmail.com 


---

---

## ⭐ CONSIDERAÇÕES FINAIS

Este projeto demonstra capacidade de desenvolvimento fullstack moderno, desde a arquitetura até a implementação final. O sistema vai muito além do solicitado, mostrando proatividade e habilidades técnicas avançadas.



---

*Desenvolvido com ❤️ para o desafio técnico da Just Travel*
