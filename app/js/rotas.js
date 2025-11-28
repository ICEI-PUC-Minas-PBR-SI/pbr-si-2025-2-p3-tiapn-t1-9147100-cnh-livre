// Configuração de rotas

const rotas = {
    '/': renderizarTelaInicial,
    '/cadastro': renderizarAutenticacao,
    '/busca': renderizarBuscaInstrutores,
    '/perfil-instrutor': renderizarPerfilInstrutor,
    '/perfil': renderizarPerfil,
    '/perfil-editar': renderizarEditarPerfil,
    '/agendar': renderizarAgendamento,
    '/minhas-aulas': renderizarMinhasAulas,
    '/pagamento': renderizarPagamento,
    '/chat': renderizarChat,
    '/ead': renderizarEAD,
    '/simulados': renderizarSimulados,
    '/docs': renderizarDocumentacao,
    '/forum': renderizarForum
};

// Gerenciador de rotas
function navegador() {
    try {
        const hash = location.hash.slice(1) || '/';
        const [caminho, consulta] = hash.split('?');
        const parametros = Object.fromEntries(new URLSearchParams(consulta));
        
        const rota = rotas[caminho];
        
        if (rota && typeof rota === 'function') {
            atualizarNavegacao();
            rota(parametros);
        } else {
            // Fallback para página inicial se rota não existir
            console.warn('Rota não encontrada:', caminho, '- Redirecionando para início');
            location.hash = '#/';
        }
    } catch (error) {
        console.error('Erro no navegador:', error);
        selecionar('#app').innerHTML = '<p>Erro ao carregar a página. Recarregue o navegador.</p>';
    }
}

// Inicializa o roteador
window.addEventListener('hashchange', navegador);
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(navegador, 100);
});