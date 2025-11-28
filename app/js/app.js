// Inicialização do aplicativo
document.addEventListener('DOMContentLoaded', function() {
    // Configura os formulários de autenticação
    configurarFormularios();
    
    // Carrega as questões do banco de dados em background
    if (typeof carregarQuestoesDoAPI === 'function') {
        carregarQuestoesDoAPI().catch(err => console.warn('Aviso: não foi possível pré-carregar as questões:', err));
    }
    
    // Pequeno delay para garantir que tudo carregou
    setTimeout(function() {
        if (typeof navegador === 'function') {
            navegador();
        } else {
            console.error('Função navegador não encontrada');
            // Fallback: redireciona para início se houver erro
            location.hash = '#/';
        }
    }, 50);
});

// Função auxiliar para gerar estrelas de avaliação (0-5)
function gerarEstrelas(rating) {
    const totalEstrelas = 5;
    const estrelasPreenchidas = Math.round(rating || 0);
    let html = '';
    
    for (let i = 1; i <= totalEstrelas; i++) {
        if (i <= estrelasPreenchidas) {
            html += '⭐'; // Estrela preenchida
        } else {
            html += '☆'; // Estrela vazia
        }
    }
    
    return html;
}

// Renderiza a tela inicial
function renderizarTelaInicial() { // NOME CORRETO - sem "Telalnicial"
    carregarTemplate('tpl-inicio');
    
    const usuario = sessao.usuario;
    const botoesInicio = selecionar('#botoesInicio');
    const secaoLogado = selecionar('#secaoLogado');
    
    if (usuario) {
        // Usuário logado - mostrar conteúdo para logados
        if (botoesInicio) botoesInicio.style.display = 'none';
        if (secaoLogado) {
            secaoLogado.style.display = 'block';
            secaoLogado.classList.remove('escondido');
        }
        carregarAulasInicio();
    } else {
        // Não logado - mostrar botões de cadastro
        if (botoesInicio) botoesInicio.style.display = 'flex';
        if (secaoLogado) {
            secaoLogado.style.display = 'none';
            secaoLogado.classList.add('escondido');
        }
    }
}

async function carregarAulasInicio() {
    try {
        const usuario = sessao.usuario;
        if (!usuario) return;

        const endpoint = usuario.tipo === 'instrutor' 
            ? `/api/aulas/instrutor/${usuario.id}`
            : `/api/aulas/aluno/${usuario.id}`;

        const resp = await fetch(endpoint);
        if (!resp.ok) return;

        const aulas = await resp.json();
        
        // Filtrar apenas aulas futuras e ordenar
        const agora = new Date();
        const aulasFuturas = aulas.filter(a => new Date(a.data_aula) > agora)
            .sort((a, b) => new Date(a.data_aula) - new Date(b.data_aula))
            .slice(0, 3); // Mostrar apenas as 3 próximas
        
        const listaEl = selecionar('#aulasPrincipais');
        if (!listaEl) return;
        
        if (aulasFuturas.length === 0) {
            listaEl.innerHTML = '<p class="texto-suave">Nenhuma aula agendada. <a href="#/busca">Procure um instrutor!</a></p>';
            return;
        }
        
        listaEl.innerHTML = aulasFuturas.map(a => formatarAulaInicio(a, usuario.tipo)).join('');
    } catch (err) {
        console.error('Erro ao carregar aulas da página inicial:', err);
    }
}

function formatarAulaInicio(aula, tipoUsuario) {
    const data = new Date(aula.data_aula);
    const dataFormatada = data.toLocaleDateString('pt-BR', { weekday: 'short', month: 'short', day: 'numeric' });
    const hora = aula.hora_inicio ? aula.hora_inicio.substring(0, 5) : 'N/A';
    
    if (tipoUsuario === 'instrutor') {
        return `
            <div class="item-lista" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #eee;">
                <div>
                    <div style="font-weight: 600;">${aula.aluno_nome || 'Aluno'}</div>
                    <div class="texto-suave texto-pequeno">${dataFormatada} às ${hora}</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 18px; font-weight: 600;">R$ ${formatarMoeda(aula.preco_aula || 0)}</div>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="item-lista" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #eee;">
                <div>
                    <div style="font-weight: 600;">${aula.instrutor_nome || 'Instrutor'}</div>
                    <div class="texto-suave texto-pequeno">${dataFormatada} às ${hora}</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 18px; font-weight: 600;">R$ ${formatarMoeda(aula.preco_aula || 0)}</div>
                </div>
            </div>
        `;
    }
}

function formatarMoeda(valor) {
    return parseFloat(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

// Renderiza a tela de autenticação
function renderizarAutenticacao(parametros) {
    carregarTemplate('tpl-autenticacao');
    
    const perfil = parametros.perfil || 'aluno';
    selecionar('#perfilReg').textContent = perfil;
    
    const extraAluno = selecionar('#extraAluno');
    const extraInstrutor = selecionar('#extraInstrutor');
    
    if (perfil === 'aluno') {
        extraAluno.classList.remove('escondido');
    } else {
        extraInstrutor.classList.remove('escondido');
    }

    // Após renderizar o template, (re)configura os formulários para garantir que os handlers
    // sejam ligados aos elementos que foram inseridos dinamicamente.
    if (typeof configurarFormularios === 'function') configurarFormularios();
    if (typeof configurarCadastroAluno === 'function') configurarCadastroAluno();

    // Ajustar campos de arquivo (docCnh/docCert/docDetran) para serem required somente
    // quando o perfil for instrutor — evita erro do navegador: "An invalid form control ... is not focusable"
    try {
        const fileSelectors = ['input[name="docCnh"]', 'input[name="docCert"]', 'input[name="docDetran"]'];
        fileSelectors.forEach(sel => {
            const el = selecionar(sel);
            if (!el) return;
            el.required = (perfil === 'instrutor');
        });
    } catch (e) {
        // se algo falhar, não interrompe a renderização
        console.warn('Não foi possível ajustar campos de arquivo:', e.message);
    }
}

// Adicione estas funções placeholder para evitar erros
function renderizarBuscaInstrutores() {
    console.log('Busca de instrutores');
    carregarTemplate('tpl-busca');

    // Adiciona o listener ao botão de busca
    selecionar('#btnBuscarInstrutores').addEventListener('click', function() {
        filtrarInstrutores();
    });

    // Renderiza a lista inicial de instrutores
    filtrarInstrutores();
}

async function filtrarInstrutores() {
    const local = selecionar('#fLocal').value.toLowerCase();
    const categoria = selecionar('#fCategoria').value;
    const ordem = selecionar('#fOrdem').value;
    const listaInstrutores = selecionar('#listaInstrutores');

    // Buscar instrutores do backend aplicando filtros
    const filtros = {};
    if (local) filtros.local = local;
    if (categoria) filtros.categoria = categoria;
    if (ordem) filtros.ordem = ordem;

    const instrutoresFiltrados = await buscarInstrutoresAPI(filtros);

    // Renderizar
    if (!instrutoresFiltrados || instrutoresFiltrados.length === 0) {
        listaInstrutores.innerHTML = '<p class="texto-suave" style="text-align: center; padding: 20px;">Nenhum instrutor encontrado com os critérios de busca.</p>';
        return;
    }

    listaInstrutores.innerHTML = instrutoresFiltrados.map(instrutor => {
        const avaliacao = instrutor.avaliacao || instrutor.avaliacao_media || 0;
        const totalAvaliacoes = instrutor.total_avaliacoes || 0;
        const estrelasHTML = gerarEstrelas(avaliacao);
        const verificadoHTML = instrutor.verificado ? '✅' : '';
        const categorias = Array.isArray(instrutor.categorias) 
            ? instrutor.categorias.join(', ') 
            : (Array.isArray(instrutor.categorias_ensina)
                ? instrutor.categorias_ensina.join(', ')
                : (typeof instrutor.categorias === 'string' 
                    ? instrutor.categorias 
                    : ''));
        
        // Veículo info
        let veiculoHtml = '';
        if (instrutor.veiculo) {
            const v = instrutor.veiculo;
            veiculoHtml = `<div class="linha texto-pequeno texto-suave" style="gap: 8px; margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee;">
                <span>🚗 ${v.modelo || ''} (${v.ano || 'N/A'})</span>
                <span>🎨 ${v.cor || ''}</span>
                ${v.placa ? `<span>📋 ${v.placa}</span>` : ''}
            </div>`;
        }
        
        return `
        <div class="cartao instrutor-card">
            <div class="linha">
                <img class="avatar" src="${instrutor.foto}" alt="Foto de ${instrutor.nome}"/>
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                        <h4 style="margin: 0;">${instrutor.nome}</h4>
                        ${verificadoHTML ? `<span title="Verificado no Detran">✅</span>` : ''}
                    </div>
                    <div class="linha texto-pequeno texto-suave" style="gap: 8px; margin-bottom: 8px;">
                        <span>📍 ${instrutor.local}</span>
                        <span>📂 ${categorias}</span>
                        <span>💰 R$ ${Number(instrutor.preco).toFixed(2).replace('.', ',')}/aula</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; font-size: 0.9em;">
                        <span style="color: #ffc107; font-size: 1em; letter-spacing: 2px;">${estrelasHTML}</span>
                        <span style="color: var(--texto-suave);">(${avaliacao.toFixed(1)}/5 • ${totalAvaliacoes} ${totalAvaliacoes === 1 ? 'avaliação' : 'avaliações'})</span>
                    </div>
                </div>
            </div>
            <p class="texto-suave" style="margin: 12px 0 8px 0; line-height: 1.4;">${instrutor.bio}</p>
            ${veiculoHtml}
            <div class="linha" style="justify-content: flex-end; gap: 8px;">
                <a href="#/perfil-instrutor?id=${instrutor.id}" class="btn primaria">Ver Perfil</a>
            </div>
        </div>
        `;
    }).join('');
}

async function renderizarPerfilInstrutor(parametros = {}) {
    console.log('Perfil instrutor');
    carregarTemplate('tpl-perfil-instrutor');

    const id = parametros.id;
    if (!id) {
        selecionar('#app').innerHTML = '<p>Instrutor não especificado.</p>';
        return;
    }

    try {
        const resp = await fetch(`/api/instrutores/${id}`);
        if (!resp.ok) {
            selecionar('#piNome').textContent = 'Instrutor não encontrado';
            return;
        }
        const data = await resp.json();

        // Normalização de campos (backend pode enviar nomes diferentes)
        const nome = data.nome || data.nome_completo || `Instrutor ${data.id}`;
        const foto = data.foto || data.foto_url || `https://i.pravatar.cc/150?u=${data.usuario_id||data.id}`;
        const preco = (data.preco != null ? Number(data.preco) : (data.preco_aula != null ? Number(data.preco_aula) : 0));
        const categoriasArr = Array.isArray(data.categorias)
            ? data.categorias
            : (Array.isArray(data.categorias_ensina)
                ? data.categorias_ensina
                : (typeof data.categorias_ensina === 'string'
                    ? data.categorias_ensina.split(',').map(s => s.trim())
                    : []));
        const avaliacao = data.avaliacao != null ? Number(data.avaliacao) : (data.avaliacao_media != null ? Number(data.avaliacao_media) : 0);
        const totalAvaliacoes = data.total_avaliacoes || 0;
        const estrelasHTML = gerarEstrelas(avaliacao);

        selecionar('#piFoto').src = foto;
        selecionar('#piNome').textContent = nome;
        selecionar('#piLocal').textContent = data.local || '';
        selecionar('#piCats').textContent = categoriasArr.join(', ');
        selecionar('#piPreco').textContent = preco.toFixed(2).replace('.', ',');
        
        // Atualizar rating com melhor formatação
        const piRating = selecionar('#piRating');
        piRating.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: #ffc107; font-size: 1.2em; letter-spacing: 2px;">${estrelasHTML}</span>
                <span style="color: var(--texto-suave);">${avaliacao.toFixed(1)}/5 • ${totalAvaliacoes} ${totalAvaliacoes === 1 ? 'avaliação' : 'avaliações'}</span>
            </div>
        `;
        
        selecionar('#piBio').textContent = data.bio || '';

        // Adicionar informações do veículo (se existir)
        const piVeiculo = selecionar('#piVeiculo');
        if (piVeiculo && data.veiculo) {
            const v = data.veiculo;
            piVeiculo.innerHTML = `
                <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px;">
                    <h5 style="margin-top: 0; color: #333;">🚗 Veículo</h5>
                    <div style="font-size: 0.95em; line-height: 1.6;">
                        <div><strong>Modelo:</strong> ${v.modelo || 'N/A'}</div>
                        <div><strong>Ano:</strong> ${v.ano || 'N/A'}</div>
                        <div><strong>Cor:</strong> ${v.cor || 'N/A'}</div>
                        ${v.placa ? `<div><strong>Placa:</strong> ${v.placa}</div>` : ''}
                        ${v.categoria ? `<div><strong>Categoria:</strong> ${v.categoria}</div>` : ''}
                    </div>
                </div>
            `;
        } else if (piVeiculo) {
            piVeiculo.innerHTML = '';
        }

        // Atualizar botões (agendar/chat) com comportamento simples
        const btnAgendar = selecionar('#btnAgendar');
        if (btnAgendar) {
            // Sempre usar o ID da tabela instrutores
            btnAgendar.onclick = () => { location.hash = `#/agendar?id=${data.id}`; };
        }
        const btnChat = selecionar('#btnChat');
        if (btnChat) {
            // Chat também deve usar instrutor.id para consistência
            btnChat.onclick = () => { location.hash = `#/chat?instrutorId=${data.id}`; };
        }

    } catch (err) {
        console.error('Erro ao carregar perfil do instrutor:', err);
        selecionar('#piNome').textContent = 'Erro ao carregar perfil';
    }
}

function renderizarEAD() {
    console.log('EAD');
    carregarTemplate('tpl-ead');
}

function renderizarDocumentacao() {
    console.log('Meu Progresso');
    if (window.renderizarDocs) {
        window.renderizarDocs();
    } else {
        carregarTemplate('tpl-docs');
    }
}


window.filtrarInstrutores = filtrarInstrutores;
