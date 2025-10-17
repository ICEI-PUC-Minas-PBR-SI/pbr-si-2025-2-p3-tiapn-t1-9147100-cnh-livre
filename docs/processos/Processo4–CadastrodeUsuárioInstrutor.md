## 3.3.1 Processo 4 – Cadastro de Usuário Instrutor 

O CNH Livre oferece uma plataforma para instrutores de autoescola se cadastrarem e oferecerem seus serviços de forma digital. O processo de cadastro do instrutor é mais completo que o do aluno, pois requer documentação profissional comprobatória e informações específicas sobre a atividade de ensino. 
 
 
 O instrutor acessa o sistema através da URL. O instrutor Clica no botão "Sou Instrutor". O instrutor Preenche o formulário de cadastro com informações pessoais e profissionais. O instrutor Faz upload dos documentos necessários. O sistema valida os dados informados.Caso todos os campos estejam corretos, a conta é criada (pendente de verificação). O instrutor é redirecionado para a área de cadastro em análise 


![cleiaatv](https://github.com/user-attachments/assets/645c110e-6823-40f6-a117-60fdb68e8918)



 
## Detalhamento das Atividades 

## Atividade 1 – Acesso ao Sistema 

| Campo | Tipo      | Restrições     | Valor default                                |
| ----- | --------- | -------------- | -------------------------------------------- |
| URL   | Navegador | Acesso via web | [https://cnhlivre.com](https://cnhlivre.com) |
| Elemento              | Ação   | Destino                    | Tipo        |
| --------------------- | ------ | -------------------------- | ----------- |
| Botão "Sou Instrutor" | Clique | Tela de cadastro instrutor | default     |
| Botão "Sou Aluno"     | Clique | Cadastro aluno             | alternativo |
 <img width="1138" height="819" alt="image" src="https://github.com/user-attachments/assets/f4d2bebf-fb9e-48e4-b712-19e107b41a22" />

 
## Atividade 2 – Formulário de Cadastro do Instrutor 
| Campo                    | Tipo             | Restrições                       | Valor default |
| ------------------------ | ---------------- | -------------------------------- | ------------- |
| Nome Completo            | Caixa de texto   | Obrigatório, mínimo 3 caracteres | —             |
| CPF                      | Caixa de texto   | Formato XXX.XXX.XXX-XX, válido   | —             |
| Email                    | Caixa de texto   | Formato de e-mail válido         | —             |
| Senha                    | Caixa de texto   | Mínimo 8 caracteres              | —             |
| Cidade/UF                | Caixa de texto   | Obrigatório                      | —             |
| Nº do Credenciamento     | Caixa de texto   | Obrigatório, formato DETRAN      | —             |
| Categorias que Ensina    | Seleção múltipla | A, B, C, D, E, AB                | B             |
| Preço por Aula (R$)      | Número decimal   | Mínimo R$ 50,00                  | 70,00         |
| Experiência Profissional | Área de texto    | Máximo 500 caracteres            | —             |
| Biografia                | Área de texto    | Máximo 1000 caracteres           | —             |
<img width="1157" height="796" alt="image" src="https://github.com/user-attachments/assets/f7fb97df-a571-4a39-8995-c4a48ae47992" />

 
## Atividade 3 – Upload de Documentos 
| Campo                    | Tipo           | Restrições              | Valor default |
| ------------------------ | -------------- | ----------------------- | ------------- |
| CNH (Frente e Verso)     | Upload arquivo | PDF, JPG, PNG (max 5MB) | —             |
| Credenciamento DETRAN    | Upload arquivo | PDF, JPG, PNG (max 5MB) | —             |
| Certificado de Instrutor | Upload arquivo | PDF, JPG, PNG (max 5MB) | —             |
| Foto Profissional        | Upload arquivo | JPG, PNG (max 2MB)      | —             |
| Nome do botão     | Destino       | Tipo      | Comportamento     |
| ----------------- | ------------- | --------- | ----------------- |
| Enviar Documentos | Validação     | default   | Verifica arquivos |
| Pular Etapa       | Próxima etapa | secondary | Upload opcional   |

 
 
## Atividade 4 - Configurações de Trabalho 
| Campo                    | Tipo             | Restrições          | Valor default |
| ------------------------ | ---------------- | ------------------- | ------------- |
| Aceita CNH Social?       | Checkbox         | Sim/Não             | Não           |
| Horários de Trabalho     | Seleção múltipla | Manhã, Tarde, Noite | Manhã, Tarde  |
| Dias da Semana           | Seleção múltipla | Seg-Sex, Sábado     | Seg-Sex       |
| Raio de Atendimento (km) | Número           | 5-50 km             | 20            |
| Veículo Próprio?         | Checkbox         | Sim/Não             | Sim           |
| Nome do botão      | Destino    | Tipo    | Comportamento   |
| ------------------ | ---------- | ------- | --------------- |
| Finalizar Cadastro | Análise    | primary | Valida tudo     |
| Voltar             | Documentos | cancel  | Editar anterior |

 
## Atividade 5 - Validação do Sistema 
| Campo                   | Tipo      | Restrições             | Ação do sistema                                      |
| ----------------------- | --------- | ---------------------- | ---------------------------------------------------- |
| Campos obrigatórios     | Validação | Verifica preenchimento | Exibe alerta "Preencha todos os campos obrigatórios" |
| CPF inválido            | Validação | Formato e dígitos      | Exibe alerta "CPF inválido"                          |
| Email inválido          | Validação | Formato e domínio      | Exibe alerta "E-mail inválido"                       |
| Credenciamento inválido | Validação | Formato DETRAN         | Exibe alerta "Número de credenciamento inválido"     |
| Preço muito baixo       | Validação | Mínimo R$ 50,00        | Exibe alerta "Preço mínimo é R$ 50,00"               |

 
## Atividade 6 - Confirmação de Cadastro 
| Campo              | Tipo     | Restrições                  | Valor default |
| ------------------ | -------- | --------------------------- | ------------- |
| Status do cadastro | Mensagem | Em análise / Sucesso / Erro | Em análise    |
| Elemento              | Ação       | Destino            | Condição         |
| --------------------- | ---------- | ------------------ | ---------------- |
| Mensagem "Em análise" | Exibição   | Dashboard limitado | Cadastro enviado |
| Tempo estimado        | Informação | —                  | 2-3 dias úteis   |
| Botão "OK"            | Clique     | Área restrita      | Após submissão   |
