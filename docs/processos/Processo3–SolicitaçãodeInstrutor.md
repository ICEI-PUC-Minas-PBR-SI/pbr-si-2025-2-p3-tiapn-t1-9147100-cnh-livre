## 3.3.3 Processo 3 – Solicitação de Instrutor

Atualmente, muitos candidatos que estão em processo de obtenção da CNH enfrentam dificuldade em encontrar instrutores disponíveis, organizar os horários de aula e acompanhar o andamento do processo. A ideia do CNH Livre é otimizar essa experiência por meio de um sistema que conecta alunos e instrutores de forma rápida e intuitiva, semelhante ao modelo de aplicativos de transporte. 

O aluno acessa o sistema e faz login.
O aluno seleciona a opção “Solicitar Instrutor”.
O sistema apresenta a lista de instrutores disponíveis com horários, categorias e valores.
O aluno escolhe um instrutor e solicita a aula.
O instrutor recebe a notificação e confirma ou recusa a solicitação.
Caso aceite, o agendamento é registrado e o aluno recebe a confirmação.
O processo é finalizado com a aula agendada.

<img width="1123" height="717" alt="image" src="https://github.com/user-attachments/assets/194ff1c9-00bb-4fd1-8eb4-581be7e224b4" />



## Detalhamento das Atividades
## Atividade 1 – Login no sistema
<img width="945" height="670" alt="image" src="https://github.com/user-attachments/assets/a760e477-4583-4420-b0cb-01ecb61c9221" />


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


## Atividade 3 – Escolha do instrutor

| Campo           | Tipo          | Restrições              | Valor default |
| --------------- | ------------- | ----------------------- | ------------- |
| Lista de opções | Seleção única | Instrutores disponíveis | —             |

| Nome do botão | Destino                  | Tipo    |
| ------------- | ------------------------ | ------- |
| Solicitar     | Notificação ao instrutor | default |
| Cancelar      | Tela inicial aluno       | cancel  |

## Atividade 4 – Confirmação do instrutor

| Campo              | Tipo          | Restrições      | Valor default |
| ------------------ | ------------- | --------------- | ------------- |
| Status da resposta | Seleção única | Aceitar/Recusar | —             |


| Nome do botão | Destino              | Tipo    |
| ------------- | -------------------- | ------- |
| Confirmar     | Aula agendada (fim)  | default |
| Recusar       | Solicitação pendente | cancel  |
<img width="1308" height="896" alt="image" src="https://github.com/user-attachments/assets/8028a99a-3764-462d-acb4-6b71b95cc578" />
<img width="1302" height="889" alt="image" src="https://github.com/user-attachments/assets/42d85dda-b70c-4dbb-aa42-70fc1169cd05" />
<img width="1301" height="926" alt="image" src="https://github.com/user-attachments/assets/846f7da9-c98a-41cb-9819-c22f6e9d02fa" />



