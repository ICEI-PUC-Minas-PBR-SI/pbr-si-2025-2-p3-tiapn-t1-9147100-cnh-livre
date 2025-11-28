// cadastro-aluno.js - Lógica específica do cadastro de alunos
function configurarCadastroAluno() {
    const formCadastro = selecionar('#formRegistro');
    if (formCadastro) {
        formCadastro.onsubmit = function(e) {
            e.preventDefault();
            processarCadastroAluno();
        };
    }
}

function processarCadastroAluno() {
    // Coletar dados do formulário
    const dados = {
        nome: selecionar('input[name="nome"]').value.trim(),
        cpf: selecionar('input[name="cpf"]').value.trim(),
        email: selecionar('input[name="email"]').value.trim(),
        senha: selecionar('input[name="senha"]').value,
        cidade: selecionar('input[name="cidade"]').value.trim(),
        categoria: selecionar('select[name="categoria"]').value
    };

    // Validar campos obrigatórios
    if (!validarCamposObrigatorios(dados)) {
        return;
    }

    // Validar formato dos dados
    if (!validarFormatos(dados)) {
        return;
    }

    // Verificar se usuário já existe localmente (feedback rápido)
    if (usuarioJaExiste(dados.email, dados.cpf)) {
        return;
    }

    // Enviar para o backend
    const API_BASE = window.API_BASE_URL || 'http://localhost:3000/api';
    // Determina o tipo com base no perfil exibido no formulário (tpl-autenticacao define #perfilReg)
    const perfilAtual = (selecionar('#perfilReg') && selecionar('#perfilReg').textContent.trim()) || 'aluno';
    const tipoEnviar = perfilAtual === 'instrutor' ? 'instrutor' : 'aluno';
    fetch(`${API_BASE}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome_completo: dados.nome,
            cpf: dados.cpf,
            email: dados.email,
            senha: dados.senha,
            tipo: tipoEnviar
        })
    }).then(async resp => {
        if (resp.status === 201) {
            const user = await resp.json();
            // Logar automaticamente
            sessao.usuario = {
                id: user.id,
                nome: user.nome_completo,
                email: user.email,
                perfil: user.tipo === 'instrutor' ? 'instrutor' : 'aluno',
                tipo: user.tipo
            };
            mostrarMensagem('🎉 Cadastro realizado com sucesso!', 'sucesso');
            atualizarNavegacao();
            // Redireciona para a tela de busca (instrutores)
            setTimeout(() => { location.hash = '#/busca'; }, 900);
        } else if (resp.status === 409) {
            mostrarNotificacao('Este e-mail ou CPF já está cadastrado no sistema');
        } else {
            const err = await resp.json().catch(() => ({}));
            console.error('Erro ao cadastrar:', err);
            mostrarNotificacao('Erro ao realizar cadastro. Tente novamente.');
        }
    }).catch(err => {
        console.error('Erro na requisição de cadastro:', err);
        mostrarNotificacao('Erro ao conectar com o servidor');
    });
}

function validarCamposObrigatorios(dados) {
    const camposObrigatorios = ['nome', 'cpf', 'email', 'senha', 'cidade'];
    
    for (let campo of camposObrigatorios) {
        if (!dados[campo]) {
            mostrarNotificacao(`Por favor, preencha o campo ${campo.replace('_', ' ')}`);
            return false;
        }
    }
    return true;
}

function validarFormatos(dados) {
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dados.email)) {
        mostrarNotificacao('Por favor, insira um e-mail válido');
        return false;
    }

    // Validar senha
    if (dados.senha.length < 8) {
        mostrarNotificacao('A senha deve ter no mínimo 8 caracteres');
        return false;
    }

    // Validar CPF (formato básico)
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(dados.cpf)) {
        mostrarNotificacao('Por favor, insira um CPF válido (formato: 000.000.000-00)');
        return false;
    }

    return true;
}

function usuarioJaExiste(email, cpf) {
    const alunos = armazenamento.obter('alunos', []);
    const emailExistente = alunos.find(aluno => aluno.email === email);
    const cpfExistente = alunos.find(aluno => aluno.cpf === cpf);

    if (emailExistente) {
        mostrarNotificacao('Este e-mail já está cadastrado no sistema');
        return true;
    }

    if (cpfExistente) {
        mostrarNotificacao('Este CPF já está cadastrado no sistema');
        return true;
    }

    return false;
}

function salvarAluno(dados) {
    try {
        const alunos = armazenamento.obter('alunos', []);
        
        const novoAluno = {
            id: gerarId(),
            nome_completo: dados.nome,
            cpf: dados.cpf,
            email: dados.email,
            senha: dados.senha, // Em produção, isso seria hash
            cidade: dados.cidade,
            categoria_desejada: dados.categoria,
            data_cadastro: new Date().toISOString(),
            ativo: true
        };

        alunos.push(novoAluno);
        armazenamento.salvar('alunos', alunos);
        
        // Logar o usuário automaticamente após cadastro
        sessao.usuario = {
            id: novoAluno.id,
            nome: novoAluno.nome_completo,
            email: novoAluno.email,
            perfil: 'aluno',
            cidade: novoAluno.cidade,
            categoria: novoAluno.categoria_desejada
        };

        return true;
    } catch (error) {
        console.error('Erro ao salvar aluno:', error);
        mostrarNotificacao('Erro ao realizar cadastro. Tente novamente.');
        return false;
    }
}

// Função para formatar CPF automaticamente
function formatarCPF(campoCPF) {
    campoCPF.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }
        
        e.target.value = value;
    });
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    configurarCadastroAluno();
    
    // Configurar formatação automática do CPF
    const campoCPF = selecionar('input[name="cpf"]');
    if (campoCPF) {
        formatarCPF(campoCPF);
    }
});