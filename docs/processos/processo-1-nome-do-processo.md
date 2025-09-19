

![Exemplo de um Modelo BPMN do PROCESSO 1](../images/process.png "Modelo BPMN do Processo 1.")

## 3.3.1 Processo 1 – Solicitação de Instrutor

Atualmente, muitos candidatos que estão em processo de obtenção da CNH enfrentam dificuldade em encontrar instrutores disponíveis, organizar os horários de aula e acompanhar o andamento do processo. A ideia do CNH Livre é otimizar essa experiência por meio de um sistema que conecta alunos e instrutores de forma rápida e intuitiva, semelhante ao modelo de aplicativos de transporte.

O Processo 1 – Solicitação de Instrutor trata do fluxo em que o aluno solicita um instrutor disponível, agenda a aula e confirma sua participação.
 

O aluno acessa o sistema e faz login.

O aluno seleciona a opção “Solicitar Instrutor”.

O sistema apresenta a lista de instrutores disponíveis com horários, categorias e valores.

O aluno escolhe um instrutor e solicita a aula.

O instrutor recebe a notificação e confirma ou recusa a solicitação.

Caso aceite, o agendamento é registrado e o aluno recebe a confirmação.

O processo é finalizado com a aula agendada.

## Detalhamento das Atividades
## Atividade 1 – Login no sistema


| Campo | Tipo           | Restrições               | Valor default |
| ----- | -------------- | ------------------------ | ------------- |
| Email | Caixa de texto | Formato de e-mail válido | —             |
| Senha | Caixa de texto | Mínimo de 8 caracteres   | —             |


| Nome do botão | Destino              | Tipo    |
| ------------- | -------------------- | ------- |
| Entrar        | Tela inicial aluno   | default |
| Cadastrar     | Processo de cadastro | —       |

## Atividade 2 – Solicitação de instrutor


| Campo         | Tipo           | Restrições         | Valor default     |
| ------------- | -------------- | ------------------ | ----------------- |
| Categoria CNH | Seleção única  | A, B, C, D ou E    | —                 |
| Localização   | Caixa de texto | Obrigatório        | Localização atual |
| Data da aula  | Data           | Formato dd-mm-aaaa | —                 |
| Horário       | Hora           | Formato hh\:mm\:ss | —                 |




| Nome do botão | Destino              | Tipo    |
| ------------- | -------------------- | ------- |
| Buscar        | Lista de instrutores | default |
| Voltar        | Tela inicial         | cancel  |


