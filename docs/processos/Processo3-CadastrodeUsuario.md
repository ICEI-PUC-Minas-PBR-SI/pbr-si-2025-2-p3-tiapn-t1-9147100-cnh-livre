


## 3.3.1 Processo 3 – Cadastro de Usuario

Atualmente, muitos candidatos que desejam iniciar o processo de obtenção da CNH enfrentam dificuldades burocráticas no cadastro em autoescolas tradicionais. O CNH Livre simplifica esse processo oferecendo um cadastro rápido e intuitivo totalmente online. O aluno acessa o sistema, preenche informações básicas e já pode começar a usar a plataforma para buscar instrutores e agendar aulas. 
 
O aluno acessa o sistema através da URL. O aluno clica no botão "Sou Aluno". O aluno preenche o formulário de cadastro com informações pessoais. O sistema valida os dados informados. Caso todos os campos estejam corretos, a conta é criada. O aluno é redirecionado para a área logada 
 




<img width="1272" height="681" alt="Diagrama sem nome drawio" src="https://github.com/user-attachments/assets/d469b99e-ffe3-4c41-ab08-36d1ddd7391b" />

## Detalhamento das Atividades
## Atividade 1 – Acesso ao Sistema
| Campo | Tipo      | Restrições     | Valor default                                |
| ----- | --------- | -------------- | -------------------------------------------- |
| URL   | Navegador | Acesso via web | [https://cnhlivre.com](https://cnhlivre.com) |
| Elemento              | Ação   | Destino            | Tipo        |
| --------------------- | ------ | ------------------ | ----------- |
| Botão "Sou Aluno"     | Clique | Tela de cadastro   | default     |
| Botão "Sou Instrutor" | Clique | Cadastro instrutor | alternativo |

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
| Nome do botão | Destino        | Tipo    | Comportamento                |
| ------------- | -------------- | ------- | ---------------------------- |
| Criar Conta   | Área do aluno  | default | Valida campos antes de criar |
| Cancelar      | Página inicial | cancel  | Limpa formulário             |
<img width="1137" height="779" alt="image" src="https://github.com/user-attachments/assets/b3eb4b28-c558-4c04-874d-23a063d66362" />

## Atividade 3 – Validação do Sistema
| Campo          | Tipo      | Restrições             | Ação do sistema                         |
| -------------- | --------- | ---------------------- | --------------------------------------- |
| Campos vazios  | Validação | Verifica preenchimento | Exibe alerta "Preencha todos os campos" |
| CPF inválido   | Validação | Formato e dígitos      | Exibe alerta "CPF inválido"             |
| Email inválido | Validação | Formato e domínio      | Exibe alerta "E-mail inválido"          |
| Senha fraca    | Validação | Mínimo 8 caracteres    | Exibe alerta "Senha muito curta"        |

## Atividade 4 – Confirmação de Cadastro
| Campo              | Tipo     | Restrições   | Valor default |
| ------------------ | -------- | ------------ | ------------- |
| Status do cadastro | Mensagem | Sucesso/Erro | —             |
| Elemento         | Ação     | Destino     | Condição        |
| ---------------- | -------- | ----------- | --------------- |
| Mensagem sucesso | Exibição | Área logada | Cadastro válido |
| Mensagem erro    | Exibição | Formulário  | Dados inválidos |
| Botão "OK"       | Clique   | Dashboard   | Após sucesso    |
