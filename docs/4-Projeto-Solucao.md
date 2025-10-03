## 4. Projeto da Solução


### 4.1. Arquitetura da solução


A solução proposta será construída em uma arquitetura cliente-servidor em camadas, que favorece modularidade, escalabilidade e manutenção. O modelo considera as interações de alunos, instrutores e administradores do sistema CNH Livre.

Componentes da Arquitetura

Front-End (Apresentação): Desenvolvido em HTML, CSS e JavaScript, responsável pela interface com o usuário. As telas foram prototipadas visando simplicidade e usabilidade.

Back-End (Lógica de Negócio): Implementado em Java com Spring Boot, fará o processamento das regras de negócio, autenticação, controle de agendamentos e simulados.

Banco de Dados: Utilização do MySQL, que armazenará dados de usuários, instrutores, aulas e resultados de simulados.

Integração e Deploy: O código será versionado no GitHub. Para deploy, o GitHub Pages será utilizado em protótipos estáticos e plataformas como Render/Heroku poderão hospedar o back-end.
 
 ![Exemplo de Arquitetura](./images/arquitetura-exemplo.png)
 

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

O desenvolvimento da solução proposta requer a existência de bases de dados que permitam efetuar os cadastros de dados e controles associados aos processos identificados, assim como recuperações.
Utilizando a notação do DER (Diagrama Entidade e Relacionamento), elaborem um modelo, na ferramenta visual indicada na disciplina, que contemple todas as entidades e atributos associados às atividades dos processos identificados. Deve ser gerado um único DER que suporte todos os processos escolhidos, visando, assim, uma base de dados integrada. O modelo deve contemplar, também, o controle de acesso de usuários (partes interessadas dos processos) de acordo com os papéis definidos nos modelos do processo de negócio.
_Apresente o modelo de dados por meio de um modelo relacional que contemple todos os conceitos e atributos apresentados na modelagem dos processos._

#### 4.3.1 Modelo ER

4.3.1 Modelo ER

Entidades principais e seus relacionamentos:

Usuário (Aluno/Instrutor)

Aula (Agendamento)

Simulado

Questão

Resultado

#### 4.3.2 Esquema Relacional

Representação em tabelas:

Usuario (UsuarioID PK, Nome, Email, Senha, Tipo)

Instrutor (InstrutorID PK, Nome, Categoria, Cidade, Avaliacao)

Aluno (AlunoID PK, Nome, CPF, Cidade, CategoriaCNH)

Aula (AulaID PK, Data, Status, AlunoID FK, InstrutorID FK)

Simulado (SimuladoID PK, Tipo, Resultado, AlunoID FK)

Questao (QuestaoID PK, Enunciado, Alternativas, RespostaCorreta)


#### 4.3.3 Modelo Físico

```sql
CREATE TABLE Usuario (
    UsuarioID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Senha VARCHAR(100) NOT NULL,
    Tipo ENUM('Aluno','Instrutor','Admin')
);

CREATE TABLE Instrutor (
    InstrutorID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Categoria CHAR(1) NOT NULL,
    Cidade VARCHAR(100),
    Avaliacao DECIMAL(2,1)
);

CREATE TABLE Aluno (
    AlunoID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    CPF VARCHAR(14) UNIQUE NOT NULL,
    Cidade VARCHAR(100),
    CategoriaCNH CHAR(1)
);

CREATE TABLE Aula (
    AulaID INT PRIMARY KEY AUTO_INCREMENT,
    Data DATE NOT NULL,
    Status VARCHAR(50),
    AlunoID INT,
    InstrutorID INT,
    FOREIGN KEY (AlunoID) REFERENCES Aluno(AlunoID),
    FOREIGN KEY (InstrutorID) REFERENCES Instrutor(InstrutorID)
);

CREATE TABLE Simulado (
    SimuladoID INT PRIMARY KEY AUTO_INCREMENT,
    Tipo VARCHAR(50),
    Resultado INT,
    AlunoID INT,
    FOREIGN KEY (AlunoID) REFERENCES Aluno(AlunoID)
);

CREATE TABLE Questao (
    QuestaoID INT PRIMARY KEY AUTO_INCREMENT,
    Enunciado TEXT NOT NULL,
    Alternativas TEXT,
    RespostaCorreta CHAR(1)
);


4.4 TECNOLOGIA
A implementação utilizará tecnologias modernas e acessíveis:


| **Dimensão**   | **Tecnologia**  |
| ---            | ---             |
| SGBD           | MySQL           |
| Front end      | HTML+CSS+JS     |
| Back end       | Java SpringBoot |
| Deploy         | Github Pages    |
| IDE            | VS Code         |
| Modelagem      | Draw.io / Figm  |



