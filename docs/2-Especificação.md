# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="01-Documentação de Contexto.md"> Documentação de Contexto</a></span>

O projeto CNH Livre visa desenvolver uma plataforma que conecte alunos e instrutores de direção, funcionando de maneira semelhante a um “Uber da CNH”. A especificação do projeto apresenta a definição de personas, histórias de usuários, requisitos funcionais e não funcionais, além das restrições do sistema.

O objetivo é detalhar o problema do usuário, suas necessidades, e como o sistema vai fornecer uma solução prática e confiável, melhorando a experiência de quem deseja tirar, renovar ou oferecer aulas de CNH. As técnicas usadas incluem pesquisa de personas, levantamento de histórias de usuários e análise de prioridades dos requisitos.

## Personas

João Silva, 22 anos, estudante universitário. Está em processo de tirar a primeira habilitação e tem dificuldades em acompanhar prazos e documentos exigidos pelo Detran. Procura uma solução simples que centralize as informações e evite atrasos.

Maria Oliveira, 19 anos, estudante. Medo de achar um bom instrutor, mas quer tirar carteira logo. Quer um sistema que mostre instrutores confiaveis.

Ana Souza, 20 anos, estudante universitária. Quer iniciar o processo para tirar a primeira habilitação, mas não tem tempo de pesquisar e negociar com várias autoescolas. Procura um aplicativo que facilite a contratação de instrutores e pacotes de aulas, de forma prática e confiável.

Ricardo Lima, 32 anos, entregador de moto. Precisa renovar a CNH para continuar trabalhando. Gostaria de um serviço rápido, onde pudesse agendar exames e aulas diretamente pelo celular, sem burocracia.

Fernanda Alves, 28 anos, instrutora de direção. Trabalha de forma independente e busca novos alunos. Quer uma plataforma que a ajude a se conectar com pessoas interessadas em aulas práticas, de maneira parecida com aplicativos de transporte.

Enumere e detalhe as personas da sua solução. Para tanto, baseie-se tanto nos documentos disponibilizados na disciplina e/ou nos seguintes links:


Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

| EU COMO... PERSONA            | QUERO/PRECISO ... FUNCIONALIDADE  | PARA ... MOTIVO/VALOR                      |
| ----------------------------- | --------------------------------- | ------------------------------------------ |
| Aluno em busca de habilitação | Encontrar instrutores próximos    | Facilitar o início do processo de CNH      |
| Aluno com CNH vencida         | Agendar aulas e exames            | Renovar a habilitação de forma rápida      |
| Instrutor de direção          | Oferecer serviços pelo aplicativo | Conquistar novos alunos e aumentar a renda |



## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais
| ID     | Descrição do Requisito                                                 | Prioridade |
| ------ | ---------------------------------------------------------------------- | ---------- |
| RF-001 | Permitir que o aluno cadastre perfil e solicite aulas                  | ALTA       |
| RF-002 | Permitir que instrutores se cadastrem e ofereçam serviços              | ALTA       |
| RF-003 | Oferecer sistema de geolocalização para encontrar instrutores próximos | ALTA       |
| RF-004 | Disponibilizar agendamento de aulas práticas e teóricas                | ALTA       |
| RF-005 | Permitir avaliações e feedback entre alunos e instrutores              | MÉDIA      |


### Requisitos não Funcionais

| ID      | Descrição do Requisito                                                          | Prioridade |
| ------- | ------------------------------------------------------------------------------- | ---------- |
| RNF-001 | O sistema deve ser responsivo e acessível em dispositivos móveis                | ALTA       |
| RNF-002 | As requisições devem ser processadas em no máximo 3 segundos                    | MÉDIA      |
| RNF-003 | O sistema deve garantir segurança no armazenamento de dados pessoais            | ALTA       |
| RNF-004 | O aplicativo deve ter alta disponibilidade, suportando grande volume de acessos | MÉDIA      |



## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |
 03 Não haverá integração direta com os sistemas oficiais do Detran nesta versão




