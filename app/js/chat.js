// Funções relacionadas ao chat
function renderizarChat() {
    carregarTemplate('tpl-chat');
    
    const usuario = sessao.usuario;
    if (!usuario) {
        mostrarNotificacao('Faça login primeiro');
        location.hash = '#/cadastro';
        return;
    }
    
    let contatoId = sessao.chatCom || armazenamento.obter('instrutores', [])[0]?.id;
    const mensagens = armazenamento.obter('mensagens', []);
    
    function exibirMensagens() {
        const containerMensagens = selecionar('#chatMsgs');
        containerMensagens.innerHTML = '';
        
        const conversa = mensagens.filter(mensagem => 
            (mensagem.remetenteId === usuario.id && mensagem.destinatarioId === contatoId) ||
            (mensagem.remetenteId === contatoId && mensagem.destinatarioId === usuario.id)
        );
        
        if (!conversa.length) {
            containerMensagens.innerHTML = '<p class="texto-suave">Nenhuma mensagem ainda.</p>';
            return;
        }
        
        conversa.forEach(mensagem => {
            const ehMinhaMensagem = mensagem.remetenteId === usuario.id;
            const elemento = document.createElement('div');
            elemento.className = 'item-lista';
            elemento.style.justifyContent = ehMinhaMensagem ? 'flex-end' : 'flex-start';
            
            elemento.innerHTML = `
                <div class="pilula" style="max-width:70%; background: ${ehMinhaMensagem ? '#e3f2fd' : '#f5f5f5'}">
                    ${mensagem.texto}
                    <div class="texto-pequeno texto-suave" style="font-size:10px; margin-top:4px">
                        ${new Date(mensagem.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            `;
            
            containerMensagens.appendChild(elemento);
        });
        
        containerMensagens.scrollTop = containerMensagens.scrollHeight;
    }
    
    function obterNomeContato() {
        if (usuario.perfil === 'aluno') {
            const instrutor = armazenamento.obter('instrutores', []).find(x => x.id === contatoId);
            return instrutor?.nome || 'Instrutor';
        } else {
            const aluno = armazenamento.obter('alunos', []).find(x => x.id === contatoId);
            return aluno?.nome || 'Aluno';
        }
    }
    
    // Atualizar título do chat
    selecionar('.cabecalho-cartao').textContent = `Chat com ${obterNomeContato()}`;
    
    exibirMensagens();
    
    selecionar('#chatEnviar').onclick = function() {
        const texto = selecionar('#chatTexto').value.trim();
        if (!texto) return;
        
        mensagens.push({
            id: gerarId(),
            remetenteId: usuario.id,
            destinatarioId: contatoId,
            texto: texto,
            timestamp: Date.now()
        });
        
        armazenamento.salvar('mensagens', mensagens);
        selecionar('#chatTexto').value = '';
        exibirMensagens();
    };
    
    // Enviar mensagem com Enter
    selecionar('#chatTexto').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            selecionar('#chatEnviar').click();
        }
    });
}

// Função para iniciar chat com instrutor
function iniciarChatComInstrutor(instrutorId) {
    sessao.chatCom = instrutorId;
    location.hash = '#/chat';
}