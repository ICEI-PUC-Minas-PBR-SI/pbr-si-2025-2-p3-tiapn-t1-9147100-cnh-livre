


## 3.3.2 Processo 5 – Acompanhamento do Progresso do Aluno

Atualmente, os alunos enfrentam dificuldade em acompanhar de forma clara quantas aulas já realizaram, quantas ainda faltam, e qual é o seu desempenho em simulados e exames. Muitas vezes precisam entrar em contato com a autoescola ou aguardar retorno do instrutor, o que gera demora.
CNH Livre busca resolver esse problema oferecendo uma área no sistema em que o aluno pode visualizar em tempo real seu progresso, aumentando a transparência no processo de habilitação.


O aluno acessa o sistema e faz login.
O aluno seleciona a opção “Acompanhar Progresso”.
O sistema apresenta os dados de aulas, simulados e exames.
O aluno pode exportar as informações em relatório ou apenas visualizar.
O processo finaliza com a visualização ou exportação do progresso.

<img width="1405" height="819" alt="image" src="https://github.com/user-attachments/assets/08eec3ce-9f4e-4688-b07c-68b9f3925a99" />



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

## Atividade 2 – Acessar acompanhamento
| Campo | Tipo          | Restrições           | Valor default |
| ----- | ------------- | -------------------- | ------------- |
| Opção | Seleção única | “Progresso do aluno” | —             |

| Nome do botão | Destino            | Tipo    |
| ------------- | ------------------ | ------- |
| Acompanhar    | Tela de progresso  | default |
| Voltar        | Tela inicial aluno | cancel  |

## Atividade 3 – Visualizar progresso
| Campo                | Tipo          | Restrições             | Valor default |
| -------------------- | ------------- | ---------------------- | ------------- |
| Aulas teóricas       | Número        | ≥ 0                    | 0             |
| Aulas práticas       | Número        | ≥ 0                    | 0             |
| Simulados realizados | Número        | ≥ 0                    | 0             |
| Exames pendentes     | Seleção única | Teórico/Prático/Nenhum | Nenhum        |

| Nome do botão | Destino              | Tipo    |
| ------------- | -------------------- | ------- |
| Voltar        | Tela inicial aluno   | cancel  |
<img width="1568" height="887" alt="image" src="https://github.com/user-attachments/assets/12bccdd5-4c47-49e0-a63c-14ac2c5a5d87" />



