## 3.3.1 Processo 5 – Realizar Simulados 

O CNH Livre oferece uma plataforma de simulados para que os alunos possam testar seus conhecimentos sobre legislação de trânsito, direção defensiva e outros temas relevantes para a prova teórica do DETRAN. O sistema oferece diferentes modalidades de simulado com feedback imediato e relatório de desempenho. 
O aluno acessa o sistema através da URL. O aluno clica no botão “Entrar". O aluno preenche os com informações pessoais para realizar o login. O sistema valida os dados informados. Caso todos os campos estejam corretos, o aluno é redirecionado para a área logada. Aluno logado acessa a seção "Simulados". O aluno Escolhe o tipo de simulado desejado. O aluno responde as questões uma por uma. O aluno recebe feedback imediato após cada questão. Ao final,o aluno visualiza o resultado completo. 



## Detalhamento das Atividades
## Atividade 1 – Acesso à Área de Simulados

| Campo            | Tipo   | Restrições                  | Valor default |
| ---------------- | ------ | --------------------------- | ------------- |
| Menu "Simulados" | Clique | Tela de escolha de simulado | default       |

## Atividade 2 – Escolha do Tipo de Simulado

| Campo              | Tipo          | Restrições                                                                    | Valor default |
| ------------------ | ------------- | ----------------------------------------------------------------------------- | ------------- |
| Tipo de Simulado   | Seleção única | Completo, Por Categoria, Simulado Rápido                                      | Completo      |
| Categoria          | Seleção única | Legislação, Sinalização, Direção Defensiva, Primeiros Socorros, Meio Ambiente | Legislação    |
| Número de Questões | Seleção única | 5, 10, 20, 30                                                                 | 20            |
| Nome do botão    | Destino          | Tipo      | Comportamento   |
| ---------------- | ---------------- | --------- | --------------- |
| Iniciar Simulado | Tela de questões | primary   | Inicia contagem |
| Ver Instruções   | Modal instruções | secondary | Mostra regras   |
| Cancelar         | Dashboard        | cancel    | Volta ao início |

## Atividade 3 – Responder Questões 

| Campo             | Tipo          | Restrições            | Valor default |
| ----------------- | ------------- | --------------------- | ------------- |
| Número da Questão | Texto         | Ex: "Questão 1 de 20" | —             |
| Enunciado         | Texto         | Questão completa      | —             |
| Imagem (opcional) | Imagem        | —                     | —             |
| Alternativas      | Rádio buttons | A, B, C, D, E         | —             |
| Progresso         | Barra         | 0-100%                | 0%            |
| Nome do botão      | Destino          | Tipo      | Comportamento       |
| ------------------ | ---------------- | --------- | ------------------- |
| Confirmar Resposta | Próxima questão  | primary   | Valida e avança     |
| Pular Questão      | Próxima questão  | secondary | Não pontua          |
| Voltar             | Questão anterior | tertiary  | Só se permitido     |
| Finalizar Simulado | Resultado        | warning   | Finaliza antecipado |

## Atividade 4 – Feedback Imediato
| Campo             | Tipo  | Restrições                     | Valor default |
| ----------------- | ----- | ------------------------------ | ------------- |
| Status Resposta   | Ícone | ✅ Correto / ❌ Errado        | —             |
| Resposta Correta  | Texto | Alternativa correta            | —             |
| Explicação        | Texto | Justificativa detalhada        | —             |
| Tempo de Resposta | Texto | "Você respondeu em X segundos" | —             |

| Nome do botão   | Destino          | Tipo      | Comportamento     |
| --------------- | ---------------- | --------- | ----------------- |
| Próxima Questão | Questão seguinte | primary   | Continua simulado |
| Ver Detalhes    | Modal expandido  | secondary | Explica completa  |
| Pausar Simulado | Tela de pausa    | tertiary  | Salva progresso   |

## Atividade 5 – Resultado Final

| Campo             | Tipo        | Restrições           | Valor default |
| ----------------- | ----------- | -------------------- | ------------- |
| Pontuação Final   | Porcentagem | 0-100%               | —             |
| Acertos/Total     | Texto       | "15/20 acertos"      | —             |
| Status Aprovação  | Texto       | "Aprovado/Reprovado" | —             |
| Medalha/Conquista | Ícone       | —                    | —             |

| Nome do botão | Destino          | Tipo      | Comportamento |
| ------------- | ---------------- | --------- | ------------- |
| Ver Correção  | Revisão questões | primary   | Mostra erros  |
| Novo Simulado | Escolha tipo     | secondary | Reinicia      |

## Atividade 6 – Revisão de Questões 

| Campo              | Tipo  | Restrições            | Valor default |
| ------------------ | ----- | --------------------- | ------------- |
| Lista Questões     | Grid  | Todas as questões     | —             |
| Status por Questão | Ícone | ✅❌⏭                | —             |
| Resposta do Aluno  | Texto | Alternativa escolhida | —             |
| Resposta Correta   | Texto | Alternativa certa     | —             |
