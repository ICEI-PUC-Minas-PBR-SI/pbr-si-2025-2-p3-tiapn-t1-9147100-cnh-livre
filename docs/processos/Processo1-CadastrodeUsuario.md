


## 3.3.1 Processo 1 – Cadastro de Usuario

Atualmente, muitos candidatos que desejam iniciar o processo de obtenção da CNH enfrentam dificuldades burocráticas no cadastro em autoescolas tradicionais. O CNH Livre simplifica esse processo oferecendo um cadastro rápido e intuitivo totalmente online. O aluno acessa o sistema, preenche informações básicas e já pode começar a usar a plataforma para buscar instrutores e agendar aulas. 
 
O aluno acessa o sistema através da URL. O aluno clica no botão "Sou Aluno". O aluno preenche o formulário de cadastro com informações pessoais. O sistema valida os dados informados. Caso todos os campos estejam corretos, a conta é criada. O aluno é redirecionado para a área logada 
 


<img width="1267" height="851" alt="Diagrama sem nome drawio (4)" src="https://github.com/user-attachments/assets/0b06ef12-7807-4e76-8fd4-987129200799" />





## Detalhamento das Atividades
## Atividade 1 – Acesso ao Sistema
| Campo | Tipo      | Restrições     | Valor default                                |
| ----- | --------- | -------------- | -------------------------------------------- |
| URL   | Navegador | Acesso via web | [https://cnhlivre.com](https://cnhlivre.com) |
## Comandos
| Elemento              | Ação   | Destino            | Tipo        |
| --------------------- | ------ | ------------------ | ----------- |
| Botão "Sou Aluno"     | Clique | Tela de cadastro   | default   Usuário  |
| Botão "Sou Instrutor" | Clique | Cadastro instrutor | alternativo Usuário|


<img width="1139" height="797" alt="image" src="https://github.com/user-attachments/assets/cd91827b-3b70-4d4f-8b0b-ea28027de987" />


## Atividade 2 – Formulário de Cadastro do Aluno

| Campo              | Tipo           | Restrições                       | Valor default |
| ------------------ | -------------- | -------------------------------- | ------------- |
| Nome Completo      | Caixa de texto | Obrigatório, mínimo 3 caracteres | —             |
| CPF                | Caixa de texto | Formato XXX.XXX.XXX-XX, válido   | —             |
| Email              | Caixa de texto | Formato de e-mail válido         | —             |
| Senha              | Caixa de texto | Mínimo 8 caracteres              | —             |
| Cidade             | Caixa de texto | Obrigatório                      | —             |
| Categoria Desejada | Seleção única  | A, B, C, D, AB                   | B             |
## Comando
| Elemento    | Ação   | Destino       | Tipo    | Comportamento                |
| ----------- | ------ | ------------- | ------- | ---------------------------- |
| Criar Conta | Clique | Área do aluno | default | Valida campos antes de criar |

<img width="1137" height="779" alt="image" src="https://github.com/user-attachments/assets/b3eb4b28-c558-4c04-874d-23a063d66362" />






