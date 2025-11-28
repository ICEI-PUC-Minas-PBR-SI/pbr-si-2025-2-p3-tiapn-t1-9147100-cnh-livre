// autenticacao.js - VERSÃO COM FEEDBACK VISUAL

// Gerenciamento de sessão
const sessao = {
    get usuario() { return armazenamento.obter('sessao'); },
    set usuario(valor) { armazenamento.salvar('sessao', valor); }
};
// Expor sessao globalmente para outros módulos
window.sessao = sessao;

function atualizarNavegacao() {
    const navegacao = selecionar('#navUsuario');
    if (!navegacao) return;
    
    navegacao.innerHTML = '';
    
    if (sessao.usuario) {
        const usuario = sessao.usuario;
        // Use either 'tipo' (from backend) or 'perfil' (frontend) to determine role
        const papel = (usuario.tipo || usuario.perfil) === 'instrutor' ? 'Instrutor' : 'Aluno';
        navegacao.innerHTML = `
            <span class="badge">${papel}</span>
            <span class="texto-suave">${usuario.nome}</span>
            <a href="#/perfil" class="btn fantasma">Perfil 👤</a>
            <button class="btn" onclick="sair()">Sair</button>
        `;
    } else {
        navegacao.innerHTML = `
            <a class="btn" href="#/cadastro">
                <span>Entrar</span>
            </a>
        `;
    }
}

function sair() {
    sessao.usuario = null;
    mostrarMensagem('Sessão encerrada', 'sucesso');
    setTimeout(() => location.hash = '#/', 1000);
}

// FUNÇÃO DE MENSAGEM VISUAL - SUBSTITUI A NOTIFICAÇÃO
function mostrarMensagem(texto, tipo = 'info') {
    // Remove mensagem anterior se existir
    const mensagemAnterior = selecionar('.mensagem-flutuante');
    if (mensagemAnterior) mensagemAnterior.remove();
    
    const mensagem = document.createElement('div');
    mensagem.className = `mensagem-flutuante ${tipo}`;
    mensagem.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${tipo === 'sucesso' ? '#4CAF50' : tipo === 'erro' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            font-weight: bold;
            text-align: center;
            min-width: 300px;
        ">
            ${texto}
        </div>
    `;
    
    document.body.appendChild(mensagem);
    
    // Remove após 3 segundos
    setTimeout(() => {
        if (mensagem.parentNode) {
            mensagem.remove();
        }
    }, 3000);
}

// FUNÇÃO PRINCIPAL DE CADASTRO
function configurarFormularios() {
    console.log('🔧 Configurando formulários...');
    
    // O formulário de cadastro é tratado em `cadastro-aluno.js` (evita duplicação de handlers)
    const formCadastro = selecionar('#formRegistro');
    if (formCadastro) {
        console.log('✅ Formulário de cadastro presente (manipulado por cadastro-aluno.js)');
    }
    
    // FORMULÁRIO DE LOGIN
    const formLogin = selecionar('#formLogin');
    if (formLogin) {
        console.log('✅ Formulário de login encontrado');

        formLogin.onsubmit = async function(e) {
            e.preventDefault();
            console.log('🔑 Tentando login...');

            const email = selecionar('#formLogin input[name="email"]').value;
            const senha = selecionar('#formLogin input[name="senha"]').value;
            const API_BASE = window.API_BASE_URL || 'http://localhost:3000/api';

            try {
                const resp = await fetch(`${API_BASE}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha })
                });

                if (!resp.ok) {
                    mostrarMensagem('❌ E-mail ou senha incorretos!', 'erro');
                    return;
                }

                const user = await resp.json();
                sessao.usuario = {
                    id: user.id,
                    nome: user.nome_completo,
                    email: user.email,
                    perfil: user.tipo === 'instrutor' ? 'instrutor' : 'aluno',
                    tipo: user.tipo // keep backend 'tipo' for consistency
                };
                mostrarMensagem(`🎉 Bem-vindo, ${user.nome_completo}!`, 'sucesso');
                atualizarNavegacao();
                // Redireciona para a tela de busca (instrutores) após login
                setTimeout(() => { location.hash = '#/busca'; }, 900);

            } catch (err) {
                console.error('Erro no login:', err);
                mostrarMensagem('Erro ao conectar com o servidor', 'erro');
            }
        };
    }
    
    // Formatação do CPF
    const campoCPF = selecionar('input[name="cpf"]');
    if (campoCPF) {
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
}

// Debug panel removed for production UI

// Inicializar tudo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando CNH Livre...');
    configurarFormularios();
    atualizarNavegacao();
});

// Atalho de teclado
document.addEventListener('keydown', function(e) {
    // Atalho: Ctrl/Cmd + L abre a tela de cadastro. Evita sobrescrever ao digitar 'l' em campos.
    if ((e.key === 'l' || e.key === 'L') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        location.hash = '#/cadastro';
    }
});