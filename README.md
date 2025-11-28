#  CNH Livre - Plataforma de Aprendizado de Direção

 Uma plataforma web moderna que conecta alunos e instrutores de autoescola, oferecendo agendamento de aulas práticas, simulados teóricos e acompanhamento de progresso.

---

##  Índice

- Visão Geral
- Features
- Stack Tecnológico
- Instalação
- Como Usar
- Estrutura do Projeto
- API REST
- Banco de Dados
- Troubleshooting
- Contribuindo
- Licença

---

##  Visão Geral

**CNH Livre** é uma aplicação web full-stack que simplifica o processo de aprendizado para obtenção da CNH (Carteira Nacional de Habilitação). A plataforma oferece:

### Para Alunos
-  Busca e avaliação de instrutores qualificados
-  Agendamento de aulas práticas com calendário interativo
-  Simulados com 100+ questões (categorias A, B, C, D, AB)
-  Dashboard de progresso com estatísticas detalhadas

### Para Instrutores
-  Perfil público com foto, bio e avaliações
-  Exibição de informações do veículo
-  Gerenciamento de agenda de aulas
-  Recebimento de avaliações de alunos
-  Controle de preços e disponibilidade

---

##  Features

### Autenticação e Perfil
-  Cadastro com validação de dados
-  Login com email e senha
-  Dois tipos de usuário: Aluno e Instrutor
-  Sessão persistida em localStorage

### Busca de Instrutores
-  Filtros por categoria CNH (A, B, C, D, AB)
-  Busca por local
-  Ordenação por avaliação ou preço
-  Exibição de informações de veículo

### Agendamento de Aulas
-  Calendário interativo
-  Seleção de horário
-  Histórico completo de aulas

### Aprendizado Teórico
-  100+ questões de simulado
-  6 categorias diferentes
-  Simulados rápidos (10 questões) e completos (50 questões)
-  Histórico com taxa de acerto

### Dashboard de Progresso
-  Resumo geral com estatísticas
-  Desempenho por categoria
-  Histórico de simulados
-  Próximas aulas agendadas com detalhes
-  Recomendações personalizadas

---

##  Stack Tecnológico

### Frontend
```
HTML5 | CSS3 | JavaScript (Vanilla)
LocalStorage | Fetch API | Responsive Design
```

### Backend
```
Node.js | Express.js | MySQL 8.0+
CORS | body-parser | RESTful API
```

### Ferramentas
```
Git | npm | Windows PowerShell
VS Code | MySQL Workbench
```

---

##  Instalação

### Pré-requisitos
- Node.js 14+ (`node --version`)
- MySQL 8.0+ (`mysql --version`)
- npm 6+ (`npm --version`)
- Git

### Passo 1: Clone o Repositório
```bash
git clone <URL-DO-REPOSITORIO>
cd ProjetoPessoalCNH
```

### Passo 2: Instale Dependências Backend
```powershell
cd backend
npm install
```

### Passo 3: Configure o Banco de Dados

#### Opção A: Setup Automático (Recomendado)
```powershell
# Crie um arquivo .env no backend/ com suas credenciais
echo "DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=cnh_livre
DB_CONN_LIMIT=10" > .env

# Execute o setup
node setup_db.js
```

#### Opção B: Setup Manual
```powershell
# Abra MySQL
mysql -u root -p

# Execute o SQL de inicialização
source init_db.sql;
```

### Passo 4: Inicie o Servidor
```powershell
# No diretório backend/
npm start
# ou
node server.js
```

### Passo 5: Acesse a Aplicação
Abra no navegador: **http://localhost:3000**

---

##  Como Usar

### Primeiro Acesso

1. **Criar Conta**
   - Clique em "Sou Aluno" ou "Sou Instrutor"
   - Preencha o formulário de cadastro
   - Verifique que os dados foram salvos

2. **Login**
   - Use o email e senha criados
   - Você será redirecionado ao dashboard

### Para Alunos

#### Buscar Instrutor
1. Vá para aba "Instrutores"
2. Filtre por categoria (A, B, C, D, AB)
3. Veja informações do veículo (modelo, cor, placa)
4. Clique em "Ver Perfil" para detalhes
5. Clique em "Agendar Aula"

#### Agendar Aula
1. Selecione a data no calendário
2. Escolha o horário disponível
3. Escolha o método de pagamento
4. Clique em "Confirmar e Agendar"

#### Ver Progresso
1. Vá para aba "Meu Progresso"
2. Veja suas próximas aulas
3. Veja estatísticas de simulados
4. Acompanhe progresso por categoria

#### Fazer Simulado
1. Vá para aba "Simulados"
2. Escolha entre Rápido (10) ou Completo (50)
3. Escolha a categoria
4. Responda as questões
5. Veja resultado e taxa de acerto

### Para Instrutores

#### Editar Perfil
1. Vá para "Meu Perfil"
2. Clique em "Editar Perfil"
3. Atualize bio, preço e local
4. Upload de foto
5. Clique em "Salvar Mudanças"

#### Gerenciar Aulas
1. Vá para "Minhas Aulas"
2. Veja aulas agendadas com alunos
3. Confirme ou cancele conforme necessário

---

##  Estrutura do Projeto

```
ProjetoPessoalCNH/
│
├── app/                          # Frontend (Vanilla JavaScript)
│   ├── index.html               # Página principal com templates
│   ├── css/
│   │   └── estilo.css           # Estilos da aplicação
│   ├── js/
│   │   ├── app.js               # Renderização de componentes
│   │   ├── api.js               # Cliente HTTP (normalização)
│   │   ├── autenticacao.js      # Sistema de login/cadastro
│   │   ├── rotas.js             # Gerenciamento de rotas hash
│   │   ├── perfil.js            # Edição de perfil + upload foto
│   │   ├── simulados.js         # Sistema de simulados
│   │   ├── questoes.js          # Banco de questões
│   │   ├── docs.js              # Dashboard de progresso
│   │   ├── calendario.js        # Calendário interativo
│   │   ├── chat.js              # Interface de chat
│   │   ├── forum.js             # Fórum de comunidade
│   │   ├── dados.js             # Dados mock
│   │   └── utilitarios.js       # Funções auxiliares
│   └── sql/
│       └── banco_cnh_livre.sql  # Schema (opcional)
│
├── backend/                      # Backend (Node.js/Express)
│   ├── server.js                # Servidor principal (30+ rotas)
│   ├── db.js                    # Configuração MySQL
│   ├── package.json             # Dependências
│   ├── .env                     # Variáveis de ambiente
│   ├── init_db.sql              # Schema do banco
│   ├── setup_db.js              # Script de inicialização
│   ├── populate_veiculos.sql    # Dados de veículos
│   └── [scripts diversos]       # Testes e debug
│
├── README.md                     # Este arquivo
├── RELATORIO_FINAL.md           # Documentação técnica completa
├── CITATION.cff                 # Informações de citação
└── package.json                 # Configuração do projeto
```

---

##  API REST

### Autenticação
```http
POST /api/usuarios              # Criar usuário
POST /api/login                 # Fazer login
GET  /api/usuarios/:id          # Buscar dados
PUT  /api/usuarios/:id          # Atualizar usuário
```

### Instrutores
```http
GET /api/instrutores            # Listar (com filtros)
GET /api/instrutores/:id        # Detalhe com veículo
```

### Aulas
```http
GET  /api/aulas/aluno/:id       # Aulas do aluno
GET  /api/aulas/instrutor/:id   # Aulas do instrutor
POST /api/aulas                 # Agendar aula
PUT  /api/aulas/:id             # Atualizar status
```

### Simulados
```http
GET  /api/simulados/aluno/:id   # Histórico
POST /api/simulados             # Salvar resultado
GET  /api/questoes              # Listar questões
```

### Avaliações
```http
GET  /api/avaliacoes/:instrutorId # Avaliações
POST /api/avaliacoes            # Criar avaliação
```

---

##  Banco de Dados

### Tabelas Principais

| Tabela | Descrição | Registros |
|--------|-----------|-----------|
| `usuarios` | Alunos e instrutores | Variável |
| `instrutores` | Dados profissionais | 42 instrutores |
| `aulas` | Agendamentos | Variável |
| `veiculos` | Carros dos instrutores | 37+ veículos |
| `simulados` | Resultados de testes | Variável |
| `questoes` | Banco de questões | 100+ questões |
| `mensagens` | Chat entre usuários | Variável ||
| `avaliacoes` | Reviews de alunos | Variável |


### Variáveis de Ambiente (.env)

```env
DB_HOST=localhost           # Host do MySQL
DB_PORT=3306               # Porta padrão
DB_USER=root               # Usuário MySQL
DB_PASSWORD=cnhlivre1234*  # Senha 
DB_NAME=cnh_livre          # Nome do banco
DB_CONN_LIMIT=10           # Pool de conexões
```

---

##  Troubleshooting

### Erro: "Conexão recusada" (MySQL)
```powershell
# Verifique se MySQL está rodando
# Windows:
Get-Process | grep mysql

# Verifique credenciais no .env
# Teste conexão manual:
mysql -h localhost -u root -p
```

### Erro: "Cannot find module 'express'"
```powershell
cd backend
npm install
```

### Erro 404 ao acessar http://localhost:3000
```
1. Verifique se o servidor está rodando
2. Verifique se está na porta 3000
3. Abra o terminal que executa npm start e veja logs
```

### Instrutores aparecem com "undefined"
 **JÁ CORRIGIDO** - Normalização implementada em api.js

### Aulas não aparecem em "Meu Progresso"
 **JÁ CORRIGIDO** - Campos de data/nome corrigidos em docs.js

### Erro ao selecionar instrutor errado
 **JÁ CORRIGIDO** - Mapeamento de ID corrigido em app.js

---

##  Estatísticas do Projeto

| Métrica | Valor |
|---------|-------|
| Linhas de código JavaScript | ~3500 |
| Linhas de código Node.js | ~1500 |
| Questões de simulado | 100+ |
| Instrutores cadastrados | 42 |
| Veículos | 37+ |
| Tabelas no banco | 10+ |
| Endpoints da API | 30+ |
| Templates HTML | 15+ |

---

##  Aprendizados Principais

Este projeto foi desenvolvido para demonstrar:

 Arquitetura full-stack (Frontend + Backend + BD)
 RESTful API design
 Relacionamentos complexos em banco de dados
 Autenticação e autorização
 Responsividade web
 Tratamento de erros robusto
 Versionamento com Git
 Documentação técnica completa

---

**Desenvolvido  em November 2025**

