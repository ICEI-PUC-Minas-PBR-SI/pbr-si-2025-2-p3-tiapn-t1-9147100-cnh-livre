## 4. Projeto da Solução


### 4.1. Arquitetura da solução


A solução proposta será construída em uma arquitetura cliente-servidor em camadas, que favorece modularidade, escalabilidade e manutenção. O modelo considera as interações de alunos, instrutores e administradores do sistema CNH Livre.

Componentes da Arquitetura

Front-End (Apresentação): Desenvolvido em HTML, CSS e JavaScript, responsável pela interface com o usuário. As telas foram prototipadas visando simplicidade e usabilidade.

Back-End (Lógica de Negócio): Implementado em Java com Spring Boot, fará o processamento das regras de negócio, autenticação, controle de agendamentos e simulados.

Banco de Dados: Utilização do MySQL, que armazenará dados de usuários, instrutores, aulas e resultados de simulados.

Integração e Deploy: O código será versionado no GitHub. Para deploy, o GitHub Pages será utilizado em protótipos estáticos e plataformas como Render/Heroku poderão hospedar o back-end.
 
 <img width="600" height="600" alt="image" src="https://github.com/user-attachments/assets/063753c3-70cc-4adc-b532-5bdc96fc85b5" />

 

### 4.2. Protótipos de telas

Tela Inicial (Home)

Apresenta o sistema com destaque para a missão: conectar alunos e instrutores.

Mostra número de instrutores próximos e aulas agendadas.

Botões de acesso rápido: Sou Aluno e Sou Instrutor.

<img width="800" height="500" alt="image" src="https://github.com/user-attachments/assets/df914f8e-9d17-451b-83d8-221a226e817b" />

Tela de Login e Cadastro

Cadastro: formulário de criação de conta (nome, CPF, e-mail, senha, categoria CNH, cidade/UF e opção CNH Social).

Login: acesso por e-mail e senha.

Permite inclusão de alunos no plano social de CNH.}

<img width="800" height="500" alt="image" src="https://github.com/user-attachments/assets/c86fdf59-66f9-4e38-afcb-fe4770ef10ee" />

<img width="800" height="500" alt="image" src="https://github.com/user-attachments/assets/59910afa-e4bc-40cc-93a4-5cd39db57668" />

Tela de Busca de Instrutores

Pesquisa instrutores por cidade/UF e categoria de habilitação.

Filtros: ordenar por avaliação e mostrar apenas instrutores que aceitam CNH Social.


<img width="800" height="500" alt="image" src="https://github.com/user-attachments/assets/f316bcd8-8c57-483a-b554-0b9f38b0a7c6" />



## Diagrama de Classes

O diagrama de classes UML modela a estrutura básica do sistema:

Usuário (UsuarioID, Nome, Email, Senha, Tipo)

Instrutor (InstrutorID, Nome, Categoria, Cidade, Avaliação)

Aluno (AlunoID, Nome, CPF, Cidade, CategoriaCNH)

Processo/Aula (AulaID, Data, Status, fk_aluno, fk_instrutor)

Simulado (SimuladoID, Tipo, Resultado, fk_aluno)

Questão (QuestaoID, Enunciado, Alternativas, RespostaCorreta)

As classes se relacionam por associações, representando cadastros, aulas agendadas e realização de simulados.


## 4.3. Modelo de dados

O desenvolvimento da solução proposta exige uma base de dados robusta que permita realizar os cadastros, controles e consultas relacionadas aos processos identificados no sistema CNH Livre, como o cadastro de usuários, agendamento de aulas, simulados e feedbacks.

O modelo de dados foi construído utilizando a notação DER (Diagrama Entidade-Relacionamento) na ferramenta MySQL Workbench, contemplando todas as entidades e atributos necessários.

A estrutura foi organizada de forma integrada, permitindo que os módulos (Cadastro, Aulas, Simulados, Avaliações e Comunicação) compartilhem informações de forma eficiente e segura.

Além disso, o modelo contempla o controle de acesso de usuários, diferenciando alunos, instrutores e administradores conforme seus papéis no sistema.

#### 4.3.1 Modelo ER

Entidades principais e seus relacionamentos:

Usuários: Armazena informações básicas de acesso e identificação.

Alunos: Contém dados complementares do aluno e sua categoria de habilitação.

Instrutores: Registra informações profissionais, como credenciamento e avaliação.

Veículos: Vinculados a instrutores, com dados de categoria e disponibilidade.

Aulas: Representa o agendamento de aulas entre alunos e instrutores.

Pagamentos: Controla as transações financeiras das aulas.

Avaliações: Permite que alunos avaliem as aulas e os instrutores.

Simulados: Controla a realização de simulados pelos alunos.

Questões e Alternativas: Base de perguntas e respostas para os simulados.

Mensagens: Sistema de comunicação interna entre usuários.

Documentos: Armazena documentos enviados pelos usuários para verificação.

O DER representa todas essas entidades e seus relacionamentos, garantindo integridade referencial e suporte a todos os processos da aplicação.

#### 4.3.2 Esquema Relacional
<img width="1470" height="1086" alt="DIAGRAMA BANCO DE DADOS CNH LIVRE (1)" src="https://github.com/user-attachments/assets/96027d02-3a75-454e-8eaa-2023b89ed317" />


A seguir, o modelo relacional com as principais tabelas e seus atributos:

Tabela	Campos Principais
usuarios	id PK, email, senha_hash, nome_completo, cpf, telefone, tipo, data_cadastro, ativo
alunos	id PK, usuario_id FK, data_nascimento, cnh_categoria_desejada, cidade, estado, endereco, cnh_aprovada, data_aprovacao
instrutores	id PK, usuario_id FK, bio, preco_aula, categorias_ensina, avaliacao_media, total_avaliacoes, aceita_cnh_social, verificado, credenciamento_detran, data_credenciamento
veiculos	id PK, instrutor_id FK, placa, modelo, ano, categoria, cor, foto_url, disponivel
aulas	id PK, aluno_id FK, instrutor_id FK, veiculo_id FK, data_aula, hora_inicio, hora_fim, preco, status, local_encontro, observacoes
pagamentos	id PK, aula_id FK, metodo, valor, status, codigo_transacao, data_pagamento, data_confirmacao
avaliacoes	id PK, aula_id FK, aluno_id FK, instrutor_id FK, nota, comentario, data_avaliacao, anonima
questoes	id PK, enunciado, categoria, dificuldade, imagem_url, explicacao, ativa
alternativas	id PK, questao_id FK, texto, correta, letra
simulados	id PK, aluno_id FK, tipo, categoria, total_questoes, acertos, erros, percentual_acerto, tempo_total_segundos, data_realizacao
respostas_simulado	id PK, simulado_id FK, questao_id FK, alternativa_escolhida, correta, tempo_resposta_segundos, pulou
mensagens	id PK, remetente_id FK, destinatario_id FK, conteudo, lida, tipo, data_envio
documentos	id PK, usuario_id FK, tipo, arquivo_url, aprovado, data_upload, data_aprovacao


#### 4.3.3 Modelo Físico

```sql
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    nome_completo VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    foto_url TEXT,
    tipo ENUM('aluno', 'instrutor', 'administrador') NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE alunos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    data_nascimento DATE,
    cnh_categoria_desejada ENUM('A', 'B', 'C', 'D', 'AB') DEFAULT 'B',
    cnh_social BOOLEAN DEFAULT FALSE,
    cidade VARCHAR(100),
    estado CHAR(2),
    endereco TEXT,
    cnh_aprovada BOOLEAN DEFAULT FALSE,
    data_aprovacao DATE NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE instrutores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    bio TEXT,
    preco_aula DECIMAL(10,2) DEFAULT 70.00,
    categorias_ensina JSON,
    avaliacao_media DECIMAL(3,2) DEFAULT 4.5,
    total_avaliacoes INT DEFAULT 0,
    aceita_cnh_social BOOLEAN DEFAULT FALSE,
    verificado BOOLEAN DEFAULT FALSE,
    credenciamento_detran VARCHAR(100),
    data_credenciamento DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE veiculos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    instrutor_id INT NOT NULL,
    placa VARCHAR(10) UNIQUE,
    modelo VARCHAR(100),
    ano INT,
    categoria VARCHAR(2),
    cor VARCHAR(50),
    foto_url TEXT,
    disponivel BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (instrutor_id) REFERENCES instrutores(id)
);

CREATE TABLE aulas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    aluno_id INT NOT NULL,
    instrutor_id INT NOT NULL,
    veiculo_id INT NULL,
    data_aula DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    preco DECIMAL(10,2),
    status ENUM('agendada', 'confirmada', 'em_andamento', 'concluida', 'cancelada', 'reagendada') DEFAULT 'agendada',
    local_encontro TEXT,
    observacoes TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id),
    FOREIGN KEY (instrutor_id) REFERENCES instrutores(id),
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id)
);

CREATE TABLE simulados (
    id INT PRIMARY KEY AUTO_INCREMENT,
    aluno_id INT NOT NULL,
    tipo ENUM('completo', 'categoria', 'treino'),
    categoria VARCHAR(100),
    total_questoes INT,
    acertos INT,
    erros INT,
    percentual_acerto DECIMAL(5,2),
    tempo_total_segundos INT,
    data_realizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id)
);

CREATE TABLE questoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    enunciado TEXT NOT NULL,
    categoria ENUM('legislacao','sinalizacao','direcao_defensiva','primeiros_socorros','meio_ambiente','mecanica'),
    dificuldade ENUM('facil','medio','dificil'),
    imagem_url TEXT,
    explicacao TEXT,
    ativa BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE alternativas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    questao_id INT NOT NULL,
    texto TEXT NOT NULL,
    correta BOOLEAN DEFAULT FALSE,
    letra CHAR(1) NOT NULL,
    FOREIGN KEY (questao_id) REFERENCES questoes(id)
);
```


## 4.4 Tecnologia
A implementação utilizará tecnologias modernas e acessíveis:


| **Dimensão**   | **Tecnologia**  |
| ---            | ---             |
| SGBD           | MySQL           |
| Front end      | HTML+CSS+JS     |
| Back end       | Node, PHP       |
| Deploy         | Github Pages    |
| IDE            | VS Code         |
| Modelagem      | Draw.io / Figm  |



