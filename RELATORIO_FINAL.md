# Relatório Final - Projeto CNH Livre

**Data:** 28 de Novembro de 2025  
**Versão:** 1.0.0  
**Status:**  Implementação Completa

---

##  Índice

1. Visão Geral do Projeto
2. Objetivos e Escopo
3. Arquitetura do Sistema
4. Funcionalidades Implementadas
5. Stack Tecnológico
6. Estrutura de Pastas
7. Banco de Dados
8. API REST
9. Frontend
10. Testes e Validação
11. Conclusões

---

##  Visão Geral do Projeto

**CNH Livre** é uma plataforma web que conecta alunos e instrutores de autoescola. O sistema permite:

-  Cadastro e autenticação de usuários (alunos e instrutores)
-  Busca e visualização de perfis de instrutores
-  Agendamento de aulas práticas
-  Realização de simulados teóricos (Detran)
-  Acompanhamento de progresso educacional
-  Histórico de aulas e avaliações

---

##  Objetivos e Escopo

### Objetivos Alcançados

1. **Gerenciamento de Usuários**
   - Cadastro com validação de dados
   - Autenticação segura (localStorage)
   - Perfil editável 
   - Suporte para dois tipos de usuário: Aluno e Instrutor

2. **Sistema de Aulas**
   - Busca de instrutores com filtros (categoria, local, preço, avaliação)
   - Visualização de perfil completo do instrutor
   - Agendamento de aulas com calendário
   - Histórico de aulas com status
   - Exibição de informações do veículo do instrutor

3. **Aprendizado Teórico**
   - Simulados com 100+ questões
   - Categorias A, B, C, D, AB
   - Rastreamento de progresso por categoria
   - Cálculo de taxa de acerto

4. **Dashboard de Progresso**
   - Resumo geral com estatísticas
   - Desempenho por categoria
   - Histórico de simulados
   - Próximas aulas agendadas
   - Recomendações personalizadas

### Requisitos Técnicos Atendidos

-  Sistema responsivo (funciona em desktop e mobile)
-  Persistência de dados em MySQL
-  API REST bem estruturada
-  Frontend moderno com vanilla JavaScript (sem frameworks pesados)
-  Autenticação e autorização
-  Tratamento de erros robusto

---

##  Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                        NAVEGADOR (CLIENT)                    │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Frontend (Vanilla JavaScript)               │ │
│  │  - Autenticação (autenticacao.js)                       │ │
│  │  - Gerenciamento de rotas (rotas.js)                   │ │
│  │  - Renderização de componentes (app.js)                │ │
│  │  - Requisições HTTP (api.js)                           │ │
│  │  - Perfil e edição (perfil.js)                         │ │
│  │  - Simulados (simulados.js)                            │ │
│  │  - Chat (chat.js)                                      │ │
│  │  - Fórum (forum.js)                                    │ │
│  │  - Dashboard (docs.js)                                 │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────┬──────────────────────────────────────┘
                      │ HTTP/REST
                      │
┌─────────────────────▼──────────────────────────────────────┐
│                  BACKEND (Node.js/Express)                 │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Express Server                        │ │
│  │  - Port: 3000                                          │ │
│  │  - CORS habilitado                                     │ │
│  │  - Rotas de API                                        │ │
│  │  - Servir arquivos estáticos (frontend)               │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Endpoints da API (server.js)                   │ │
│  │  GET/POST /api/usuarios/...                           │ │
│  │  GET/POST /api/instrutores/...                        │ │
│  │  GET/POST /api/aulas/...                              │ │
│  │  GET/POST /api/simulados/...                          │ │
│  │  GET/POST /api/mensagens/...                          │ │
│  │  GET/POST /api/forum/...                              │ │
│  │  GET/POST /api/avaliacoes/...                         │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────┬──────────────────────────────────────┘
                      │ MySQL Protocol
                      │
┌─────────────────────▼──────────────────────────────────────┐
│                      MySQL Database                         │
│                    (cnh_livre schema)                       │
│                                                              │
│  Tabelas:                                                   │
│  - usuarios (id, email, senha, tipo, ...)                 │
│  - instrutores (id, usuario_id, bio, preco_aula, ...)    │
│  - aulas (id, aluno_id, instrutor_id, data_aula, ...)    │
│  - veiculos (id, instrutor_id, modelo, placa, ...)       │
│  - simulados (id, aluno_id, categoria, acertos, ...)     │
│  - questoes (id, categoria, tipo, enunciado, ...)        │
│  - mensagens (id, remetente_id, destinatario_id, ...)    │
│  - forum_topicos (id, autor_id, titulo, conteudo, ...)   │
│  - avaliacoes (id, aluno_id, instrutor_id, nota, ...)    │
└──────────────────────────────────────────────────────────┘
```

---

##  Funcionalidades Implementadas

### 1. **Autenticação e Cadastro**
- Cadastro de novo usuário (aluno ou instrutor)
- Login com email e senha
- Validação de dados
- Sessão gerenciada em localStorage
- Tipos de usuário: Aluno e Instrutor

### 2. **Busca de Instrutores**
- Filtros por: categoria (A, B, C, D, AB), local, preço, avaliação
- Exibição de perfil com foto, bio, preço
- Avaliações médias e total de avaliações
- Exibição de informações do veículo do instrutor (modelo, ano, cor, placa, categoria)
- Link para agendar aula

### 3. **Agendamento de Aulas**
- Calendário interativo para seleção de data
- Seleção de horário (9h, 11h, 13h, 15h, 17h)
- Confirmação de agendamento
- Exibição de aulas agendadas

### 4. **Simulados**
- 100+ questões de múltipla escolha
- 6 categorias (A, B, C, D, AB, Geral)
- Tipos de simulado: Rápido (10 questões) e Completo (50 questões)
- Cálculo de acertos e percentual
- Histórico local de simulados

### 5. **Dashboard de Progresso (Meu Progresso)**
- Próximas Aulas: Lista de aulas agendadas futura com nome do instrutor, data, horário e local
- Resumo geral: questões resolvidas, taxa de acerto, simulados, tempo de estudo, aulas realizadas
- Desempenho por categoria com gráficos de barra
- Histórico dos últimos 5 simulados

### 6. **Perfil de Usuário**
- Visualização de informações básicas
- Edição de perfil com validação
- Informações específicas por tipo (aluno: data de nascimento, categoria CNH; instrutor: bio, preço, local)
- Próximas aulas no perfil

---

##  Stack Tecnológico

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Estilização responsiva
- **JavaScript (Vanilla)**: Sem frameworks (puro JS)
- **Armazenamento**: localStorage para sessão e dados locais
- **API Client**: Fetch API para requisições HTTP

### Backend
- **Node.js**: Runtime JavaScript server-side
- **Express.js**: Framework web minimalista
- **MySQL 8.0+**: Banco de dados relacional
- **CORS**: Habilitado para requisições do navegador
- **body-parser**: Parsing de JSON

### Desenvolvimento
- **Git**: Controle de versão
- **npm**: Gerenciador de pacotes

---

##  Estrutura de Pastas

```
ProjetoPessoalCNH/
├── app/                           # Frontend (Vanilla JS)
│   ├── index.html                # Página principal
│   ├── css/
│   │   └── estilo.css            # Estilos da aplicação
│   ├── js/
│   │   ├── autenticacao.js       # Sistema de login/cadastro
│   │   ├── app.js                # Renderização de componentes
│   │   ├── rotas.js              # Gerenciamento de rotas
│   │   ├── api.js                # Cliente HTTP
│   │   ├── perfil.js             # Gestão de perfil
│   │   ├── simulados.js          # Sistema de simulados
│   │   ├── questoes.js           # Banco de questões
│   │   ├── chat.js               # Interface de chat
│   │   ├── forum.js              # Fórum de comunidade
│   │   ├── docs.js               # Dashboard de progresso
│   │   ├── calendario.js         # Calendário interativo
│   │   ├── dados.js              # Dados mock/locais
│   │   ├── utilitarios.js        # Funções auxiliares
│   │   └── ...
│   └── sql/
│       └── banco_cnh_livre.sql   # Schema do banco
│
├── backend/                       # Backend (Node.js)
│   ├── server.js                 # Servidor Express principal
│   ├── db.js                     # Configuração de conexão MySQL
│   ├── init_db.sql               # SQL de inicialização
│   ├── setup_db.js               # Script de setup
│   ├── package.json              # Dependências
│   ├── .env                      # Variáveis de ambiente
│   ├── populate_veiculos.sql     # Dados de veículos
│   └── [scripts de testes]
│
├── README.md                      # Documentação principal
├── CITATION.cff                   # Citação do projeto
├── RELATORIO_FINAL.md            # Este arquivo
└── package.json                   # Configuração do projeto
```

---

##  Banco de Dados

### Schema Principal

**Tabela: usuarios**
```sql
- id (PK)
- email (UNIQUE)
- senha (hashed)
- nome_completo
- cpf
- tipo ('aluno' | 'instrutor')
- foto_url
- endereco
- cidade
- estado
- created_at
```

**Tabela: instrutores**
```sql
- id (PK)
- usuario_id (FK → usuarios.id)
- bio
- preco_aula
- categorias_ensina (JSON array)
- avaliacao_media
- total_avaliacoes
- local
- credenciamento_detran
- verificado
- aceita_cnh_social
- created_at
```

**Tabela: aulas**
```sql
- id (PK)
- aluno_id (FK → usuarios.id)
- instrutor_id (FK → instrutores.usuario_id) ⚠️ Mapeamento crítico
- data_aula
- hora_inicio
- local_encontro
- preco_aula
- status ('agendada' | 'confirmada' | 'em_andamento' | 'concluida' | 'cancelada')
- metodo_pagamento
- created_at
```

**Tabela: veiculos**
```sql
- id (PK)
- instrutor_id (FK → instrutores.usuario_id)
- modelo
- placa
- ano
- categoria
- cor
- foto_url
- created_at
```

**Tabela: simulados**
```sql
- id (PK)
- aluno_id (FK → usuarios.id)
- categoria
- total_questoes
- acertos
- percentual
- tipo ('rapido' | 'completo')
- tempo_gasto
- data_realizacao
```

**Tabelas Adicionais:** questoes, mensagens, forum_topicos, forum_respostas, avaliacoes

### Relacionamentos Críticos

 **IMPORTANTE**: 
- `aulas.instrutor_id` e `veiculos.instrutor_id` referenciam `instrutores.usuario_id`, NÃO `instrutores.id`
- Isso foi descoberto durante debugging e corrigido em POST /api/aulas

---

## 🔌 API REST

### Endpoints Principais

#### Usuários
```
POST   /api/usuarios               # Criar novo usuário
GET    /api/usuarios/:id           # Buscar usuário por ID
PUT    /api/usuarios/:id           # Atualizar usuário
POST   /api/login                  # Autenticar usuário
```

#### Instrutores
```
GET    /api/instrutores            # Listar com filtros (categoria, local, ordem)
GET    /api/instrutores/:id        # Detalhe de instrutor com veículo
```

#### Aulas
```
GET    /api/aulas/aluno/:id        # Aulas do aluno
GET    /api/aulas/instrutor/:id    # Aulas do instrutor
POST   /api/aulas                  # Agendar nova aula
PUT    /api/aulas/:id              # Atualizar status de aula
```

#### Simulados
```
GET    /api/simulados/aluno/:id    # Histórico de simulados
POST   /api/simulados              # Salvar resultado
GET    /api/questoes               # Listar questões com filtros
```

#### Avaliações
```
GET    /api/avaliacoes/:instrutorId # Avaliações de instrutor
POST   /api/avaliacoes             # Criar avaliação
```

---

##  Frontend

### Arquitetura do Frontend

**Sistema de Rotas Hash-Based:**
- `#/` - Página inicial
- `#/autenticacao` - Login/Cadastro
- `#/busca` - Buscar instrutores
- `#/perfil/:id` - Perfil de instrutor
- `#/agendar` - Agendar aula
- `#/pagamento` - Processar pagamento
- `#/minhas-aulas` - Histórico de aulas
- `#/perfil` - Meu perfil
- `#/perfil-editar` - Editar perfil
- `#/ead` - Cursos teóricos
- `#/simulados` - Simulados
- `#/docs` - Dashboard (Meu Progresso)
- `#/forum` - Comunidade
- `#/chat` - Chat

### Componentes Principais

1. **autenticacao.js** - Gerencia login/cadastro com validação
2. **api.js** - Cliente HTTP com normalização de dados
3. **app.js** - Renderização de componentes e templates
4. **perfil.js** - Gestão de perfil com upload de foto redimensionada
5. **simulados.js** - Sistema de simulados com cronômetro
6. **docs.js** - Dashboard com estatísticas e aulas
7. **rotas.js** - Sistema de roteamento hash-based
8. **calendario.js** - Calendário interativo para agendamento
9. **chat.js** - Interface de mensagens
10. **forum.js** - Sistema de fórum

### Recursos de UX

-  Responsivo (mobile-first)
-  Notificações toast para feedback
-  Validação de formulários
-  Calendário interativo
-  Preview de fotos antes de upload
-  Status visual de aulas e simulados

---

## 🧪Testes e Validação

### Testes Realizados

1. **Autenticação**
   -  Cadastro de novo usuário (aluno)
   -  Cadastro de novo usuário (instrutor)
   -  Login com credenciais válidas
   -  Rejeição de credenciais inválidas

2. **Busca de Instrutores**
   -  Filtro por categoria
   -  Filtro por local
   -  Ordenação por avaliação
   -  Ordenação por preço
   -  Exibição de veículos (modelo, cor, placa)

3. **Agendamento**
   -  Seleção de data no calendário
   -  Seleção de horário
   -  Cálculo correto de preço
   -  Salvamento de aula com status 'agendada'

4. **Dashboard (Meu Progresso)**
   -  Exibição de próximas aulas
   -  Exibição correta de nome do instrutor
   -  Exibição de data e horário formatados
   -  Exibição de local da aula

5. **Perfil**
   -  Edição de informações
   -  Upload de foto com compressão
   -  Preview de foto antes de salvar
   -  Persistência de dados

6. **Simulados**
   -  Carregamento de 100+ questões
   -  Cálculo de acertos
   -  Cronômetro
   -  Histórico local

### Bugs Encontrados e Corrigidos

| Bug | Causa | Solução | Status |
|-----|-------|---------|--------|
| Instrutores com "undefined" | Campo de nome inconsistente (nome_completo vs nome) | Normalização em api.js |  Corrigido |
| Perfil errado ao clicar instrutor | Passou usuario_id em vez de instrutor.id | Atualizar app.js para usar data.id |  Corrigido |
| Aula agendada com instrutor errado | FK aulas.instrutor_id referencia instrutores.usuario_id | Mapping no POST /api/aulas |  Corrigido |
| Aulas não aparecem em "Meu Progresso" | Campo de data errado (data vs data_aula) | Corrigir obterProgressoAulas() |  Corrigido |
| Foto não aparece no perfil | Upload não era processado | Adicionar FileReader e redimensionamento |  Corrigido |
| Payload 413 ao enviar foto grande | Base64 muito grande | Redimensionar para 300x300 e JPEG 70% |  Corrigido |

---

##  Métricas do Projeto

- **Linhas de código frontend**: ~3500 linhas JavaScript
- **Linhas de código backend**: ~1500 linhas Node.js
- **Questões de simulado**: 100+ perguntas em 6 categorias
- **Instrutores cadastrados**: 42 instrutores
- **Tabelas no banco**: 10+ tabelas relacionais
- **Endpoints da API**: 30+ rotas REST

---

##  Conclusões

### Objetivos Atingidos

O projeto **CNH Livre** foi implementado com sucesso, entregando:

1.  Sistema completo de cadastro e autenticação
2.  Plataforma de conexão entre alunos e instrutores
3.  Sistema de agendamento de aulas práticas
4.  Simulados teóricos com 100+ questões
5.  Dashboard de progresso com estatísticas
6.  Gestão de perfil com upload de foto
7.  Exibição de informações de veículo do instrutor
8.  Persistência completa em MySQL
9.  API REST bem estruturada

### Qualidade Técnica

-  Código modular e bem organizado
-  Separação clara entre frontend e backend
-  Tratamento robusto de erros
-  Validação de dados
-  Design responsivo

### Desafios Superados

1. Mapeamento correto de relacionamentos FK no banco
2. Normalização de dados entre diferentes fontes
3. Sincronização de campos entre frontend e backend

---

##  Licença

Este projeto é fornecido como está para fins educacionais.

---

**Desenvolvido - Versão Final 1.0.0**
