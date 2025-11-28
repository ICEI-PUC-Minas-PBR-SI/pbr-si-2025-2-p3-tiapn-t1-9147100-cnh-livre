// Funções relacionadas ao fórum
function renderizarForum() {
    carregarTemplate('tpl-forum');
    
    const listaTopicos = selecionar('#forumLista');
    const topicos = armazenamento.obter('forum', []);
    
    function exibirTopicos() {
        listaTopicos.innerHTML = '';
        
        if (!topicos.length) {
            listaTopicos.innerHTML = '<p class="texto-suave">Nenhum tópico ainda.</p>';
            return;
        }
        
        // Ordenar por data (mais recentes primeiro)
        const topicosOrdenados = [...topicos].sort((a, b) => {
            const dataA = a.dataCriacao || 0;
            const dataB = b.dataCriacao || 0;
            return dataB - dataA;
        });
        
        topicosOrdenados.forEach(topico => {
            const elemento = document.createElement('div');
            elemento.className = 'item-lista';
            
            elemento.innerHTML = `
                <div style="flex:1">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div>
                            <b>${topico.titulo}</b>
                            <div class="texto-pequeno texto-suave">por ${topico.autor}</div>
                        </div>
                        <span class="badge">${topico.respostas?.length || 0} respostas</span>
                    </div>
                    
                    <div class="texto-suave" style="margin: 8px 0;">${topico.conteudo}</div>
                    
                    ${topico.respostas && topico.respostas.length > 0 ? `
                        <div class="divisor"></div>
                        <div style="max-height: 150px; overflow-y: auto;">
                            ${topico.respostas.map(resposta => `
                                <div style="margin: 8px 0; padding: 8px; background: #f8f9fa; border-radius: 8px;">
                                    <div class="texto-pequeno"><b>${resposta.autor}:</b> ${resposta.texto}</div>
                                    ${resposta.data ? `<div class="texto-pequeno texto-suave" style="font-size: 10px;">${new Date(resposta.data).toLocaleDateString('pt-BR')}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    <div class="divisor"></div>
                    <div class="linha" style="margin-top: 8px;">
                        <input type="text" class="entrada" placeholder="Sua resposta..." style="flex:1" id="resposta-${topico.id}">
                        <button class="btn primaria btn-responder" data-topico="${topico.id}">Responder</button>
                    </div>
                </div>
            `;
            
            const btnResponder = selecionar('.btn-responder', elemento);
            btnResponder.onclick = function() {
                const textoResposta = selecionar(`#resposta-${topico.id}`).value.trim();
                if (!textoResposta) {
                    mostrarNotificacao('Digite uma resposta');
                    return;
                }
                
                if (!topico.respostas) topico.respostas = [];
                
                topico.respostas.push({
                    autor: sessao.usuario?.nome || 'Visitante',
                    texto: textoResposta,
                    data: Date.now()
                });
                
                armazenamento.salvar('forum', topicos);
                selecionar(`#resposta-${topico.id}`).value = '';
                mostrarNotificacao('Resposta enviada!');
                exibirTopicos();
            };
            
            listaTopicos.appendChild(elemento);
        });
    }
    
    exibirTopicos();
    
    selecionar('#fPost').onclick = function() {
        const titulo = selecionar('#fTitulo').value.trim();
        const conteudo = selecionar('#fConteudo').value.trim();
        
        if (!titulo || !conteudo) {
            mostrarNotificacao('Preencha título e conteúdo');
            return;
        }
        
        const autor = sessao.usuario?.nome || 'Anônimo';
        
        topicos.push({
            id: gerarId(),
            titulo: titulo,
            conteudo: conteudo,
            autor: autor,
            dataCriacao: Date.now(),
            respostas: []
        });
        
        armazenamento.salvar('forum', topicos);
        selecionar('#fTitulo').value = '';
        selecionar('#fConteudo').value = '';
        
        mostrarNotificacao('Tópico criado com sucesso!');
        exibirTopicos();
    };
}

// Funções auxiliares para o fórum
function formatarDataForum(timestamp) {
    return new Date(timestamp).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function buscarTopicos(termo) {
    const topicos = armazenamento.obter('forum', []);
    return topicos.filter(topico => 
        topico.titulo.toLowerCase().includes(termo.toLowerCase()) ||
        topico.conteudo.toLowerCase().includes(termo.toLowerCase()) ||
        topico.autor.toLowerCase().includes(termo.toLowerCase())
    );
}