## 3.3.1 Processo 4 – Cadastro de Usuário Instrutor 

O CNH Livre oferece uma plataforma para instrutores de autoescola se cadastrarem e oferecerem seus serviços de forma digital. O processo de cadastro do instrutor é mais completo que o do aluno, pois requer documentação profissional comprobatória e informações específicas sobre a atividade de ensino. 
 
 
 O instrutor acessa o sistema através da URL. O instrutor Clica no botão "Sou Instrutor". O instrutor Preenche o formulário de cadastro com informações pessoais e profissionais. O instrutor Faz upload dos documentos necessários. O sistema valida os dados informados.Caso todos os campos estejam corretos, a conta é criada (pendente de verificação). O instrutor é redirecionado para a área de cadastro em análise 


<img width="1141" height="734" alt="image" src="https://github.com/user-attachments/assets/73fcd761-dce2-4f76-8d18-8dbd0ac75699" />


# Fluxo de Cadastro de Instrutor - CNH Livre

```mermaid
flowchart TD
    A[Atividade 1 - Acesso ao Sistema] -->|Sou Instrutor| B[Atividade 2 - Formulário de Cadastro]
    A -->|Sou Aluno| Z[Cadastro Aluno]

    B --> C[Atividade 3 - Upload de Documentos]
    C --> D[Configurações de Trabalho]
    D --> E[Validação do Sistema]
    E --> F[Confirmação de Cadastro]

    %% Detalhes
    subgraph Formulário
        B1[Nome Completo - obrigatório, min 3]
        B2[CPF - formato válido]
        B3[Email - válido]
        B4[Senha - min 8]
        B5[Cidade/UF - obrigatório]
        B6[Nº Credenciamento - formato DETRAN]
        B7[Categorias - múltipla, default B]
        B8[Preço - min R$50, default 70]
        B9[Experiência - max 500]
        B10[Biografia - max 1000]
    end

    subgraph Documentos
        C1[CNH frente e verso - até 5MB]
        C2[Credenciamento DETRAN - até 5MB]
        C3[Certificado Instrutor - até 5MB]
        C4[Foto Profissional - até 2MB]
    end

    subgraph Configurações
        D1[Aceita CNH Social? - default Não]
        D2[Horários - manhã/tarde/noite - default manhã,tarde]
        D3[Dias - seg-sex, sábado - default seg-sex]
        D4[Raio atendimento - 5 a 50km - default 20]
        D5[Veículo próprio? - default Sim]
    end

    subgraph Validações
        E1[Campos obrigatórios]
        E2[CPF inválido]
        E3[Email inválido]
        E4[Credenciamento inválido]
        E5[Preço abaixo de R$50]
    end

    subgraph Confirmação
        F1[Status: Em análise / Sucesso / Erro]
        F2[Mensagem: Em análise -> Dashboard limitado]
        F3[Tempo estimado: 2-3 dias úteis]
        F4[Botão OK -> Área restrita]
    end
