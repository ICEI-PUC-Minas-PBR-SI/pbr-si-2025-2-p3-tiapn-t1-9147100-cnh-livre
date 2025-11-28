


## 3.3.2 Processo 5 – Acompanhamento do Progresso do Aluno

Muito alunos enfrentam dificuldade em acompanhar de forma objetiva e clara quantas aulas já realizaram, quantas ainda faltam, e qual é o seu desempenho em simulados e exames. Muitas vezes precisam entrar em contato com a autoescola ou aguardar retorno do instrutor, o que gera demora.
CNH Livre busca resolver esse problema oferecendo uma área no sistema em que o aluno pode visualizar em tempo real seu progresso, aumentando a transparência no processo de habilitação.


O aluno acessa o sistema e faz login.
O aluno seleciona a opção “Acompanhar Progresso”.
O sistema apresenta os dados de aulas, simulados e exames.
O aluno pode exportar as informações em relatório ou apenas visualizar.
O processo finaliza com a visualização ou exportação do progresso.

<img width="1313" height="764" alt="image" src="https://github.com/user-attachments/assets/4f1b2415-d2f4-4ba2-85c7-a25cb5618ffb" />




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
| Opção | Seleção única | “Meu progresso” | —             |

| Nome do botão | Destino            | Tipo    |
| ------------- | ------------------ | ------- |
| Acompanhar    | Tela de progresso  | default |

## Atividade 1 – Visualizar Progresso Geral
| Campo                 | Tipo   | Restrições | Valor default |
| --------------------- | ------ | ---------- | ------------- |
| Questões resolvidas   | Número | ≥ 0        | -            |
| Taxa de acerto        | Número | 0% a 100%  | -            |
| Simulados realizados  | Número | ≥ 0        | -             |
| Tempo total de estudo | Texto  | ≥ 0m       | -         |
| Aulas realizadas      | Número | ≥ 0        | -             |
| Aulas agendadas       | Número | ≥ 0        | -             |

| Campo                | Tipo  | Restrições | Valor default |
| -------------------- | ----- | ---------- | ------------- |
| Categoria “completo” | Barra | 0–100%     | -           |
| Categoria “geral”    | Barra | 0–100%     | -           |

## Atividade 2 – Visualizar Últimos Simulados
| Campo                 | Tipo   | Restrições | Valor default   |
| --------------------- | ------ | ---------- | --------------- |
| Nome do simulado      | Texto  | —          | -     |
| Data                  | Data   | —          | -      |
| Resultado (acertos)   | Número | 0–5        | -      |
| Porcentagem de acerto | Número | 0–100%     | -     |

Atividade 3 – Visualizar Próximas Aulas
| Campo             | Tipo  | Restrições   | Valor default             |
| ----------------- | ----- | ------------ | ------------------------- |
| Nome do instrutor | Texto | —            | - |
| Data e horário    | Data  | ≥ data atual | -     |
| Local             | Texto | Opcional     | -      |




<p>
  <a href="https://github.com/user-attachments/assets/fd1f27a5-2de7-4230-b158-3927867d6756">
    <img src="https://github.com/user-attachments/assets/fd1f27a5-2de7-4230-b158-3927867d6756" width="250">
  </a>

  <a href="https://github.com/user-attachments/assets/87c9a2a4-dcd0-45d0-b0bb-a320f6d1c025">
    <img src="https://github.com/user-attachments/assets/87c9a2a4-dcd0-45d0-b0bb-a320f6d1c025" width="250">
  </a>

  <a href="https://github.com/user-attachments/assets/26740a26-5faf-45a8-a11d-a93eb683aba4">
    <img src="https://github.com/user-attachments/assets/26740a26-5faf-45a8-a11d-a93eb683aba4" width="250">
  </a>
</p>



