// Variáveis de estado do Simulado
let simuladoAtual = [];
let indiceQuestaoAtual = 0;
let respostasUsuario = [];
let questoesEmbaralhadas = [];
let todasQuestoes = []; // Armazenar questões do banco de dados
let categoriasDisponiveis = []; // Armazenar categorias únicas
let simuladoInicioTimestamp = null;

// Mapeamento de categorias do banco para nomes legíveis
const mapeamentoCategorias = {
    'legislacao': 'Legislação de Trânsito',
    'sinalizacao': 'Placas de Sinalização',
    'direcao_defensiva': 'Direção Defensiva',
    'primeiros_socorros': 'Primeiros Socorros',
    'meio_ambiente': 'Meio Ambiente e Cidadania',
    'mecanica': 'Mecânica Básica'
};

// Função para gerar barra de progresso visual
function gerarBarraProgresso(acertos, total) {
    const percentual = (acertos / total) * 100;
    const corBarra = percentual >= 70 ? 'var(--sucesso)' : percentual >= 50 ? '#ff9800' : 'var(--erro)';
    
    return `
        <div style="width: 100%; background: #e0e0e0; border-radius: 10px; overflow: hidden; height: 20px;">
            <div style="width: ${percentual}%; height: 100%; background: ${corBarra}; transition: width 0.5s ease; border-radius: 10px;"></div>
        </div>
    `;
}

// Função para gerar estrelas de avaliação (0-5)
function gerarEstrelas(rating) {
    const totalEstrelas = 5;
    const estrelasPreenchidas = Math.round(rating);
    let html = '';
    
    for (let i = 1; i <= totalEstrelas; i++) {
        if (i <= estrelasPreenchidas) {
            html += '⭐'; // Estrela preenchida
        } else if (i - estrelasPreenchidas < 1) {
            html += '✨'; // Meia estrela (opcional)
        } else {
            html += '☆'; // Estrela vazia
        }
    }
    
    return html;
}

function formatarNomeCategoria(categoria) {
    return mapeamentoCategorias[categoria] || categoria;
}

// Função para embaralhar um array (Algoritmo de Fisher-Yates)
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Carregar questões do banco de dados
async function carregarQuestoesDoAPI() {
    try {
        const resposta = await fetch('/api/questoes');
        const questoes = await resposta.json();
        
        if (questoes && questoes.length > 0) {
            // Processar questões: garantir que opcoes é um array
            todasQuestoes = questoes.map(q => {
                if (typeof q.opcoes === 'string') {
                    try {
                        q.opcoes = JSON.parse(q.opcoes);
                    } catch (e) {
                        q.opcoes = q.opcoes.split(',').map(op => op.trim());
                    }
                }
                // Normalizar nome da categoria para o formato legível
                q.categoriaNome = formatarNomeCategoria(q.categoria);
                return q;
            });
            
            // Extrair categorias únicas (usar valores originais do banco)
            categoriasDisponiveis = [...new Set(todasQuestoes.map(q => q.categoria))].sort();
            
            console.log(`✓ Carregadas ${todasQuestoes.length} questões de ${categoriasDisponiveis.length} categorias`);
        }
    } catch (erro) {
        console.error('Erro ao carregar questões:', erro);
        mostrarToast('Erro ao carregar questões do banco de dados', 'erro');
    }
}

// Renderiza a tela principal de Simulados
async function renderizarSimulados() {
    carregarTemplate('tpl-simulados');
    
    // Carregar questões se ainda não foram carregadas
    if (todasQuestoes.length === 0) {
        await carregarQuestoesDoAPI();
    }
    
    const totalQuestoes = todasQuestoes.length;
    const quizContainer = selecionar('#quiz');
    
    quizContainer.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h2>🚗 Simulados Detran</h2>
            <p class="texto-suave">Teste seus conhecimentos para a prova teórica</p>
            
            <div class="cartao" style="margin: 20px 0;">
                <div class="cabecalho-cartao">Informações</div>
                <div class="conteudo-cartao">
                    <p>Total de questões: <b>${totalQuestoes}</b></p>
                    <p>Categorias disponíveis: <b>${categoriasDisponiveis.length}</b></p>
                    <p>Seu melhor resultado: <b>${armazenamento.obter('melhorSimulado', 'N/A')}</b></p>
                </div>
            </div>
            
            <div class="grade" style="grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 30px 0;">
                <button class="btn primaria" onclick="iniciarSimulado('rapido')">
                    Simulado Rápido (5)
                </button>
                <button class="btn" onclick="iniciarSimulado('completo')">
                    Simulado Completo (10)
                </button>
                <button class="btn" onclick="renderizarSimuladosPorCategoria()">
                    Por Categoria
                </button>
                <button class="btn" onclick="verEstatisticas()">
                    Estatísticas
                </button>
            </div>
        </div>
    `;
}

// Inicia um novo simulado
function iniciarSimulado(tipo, categoria = null) {
    if (todasQuestoes.length === 0) {
        mostrarToast('Banco de questões vazio. Carregando...', 'aviso');
        carregarQuestoesDoAPI().then(() => iniciarSimulado(tipo, categoria));
        return;
    }
    
    indiceQuestaoAtual = 0;
    respostasUsuario = [];
    
    let questoesFiltradas = todasQuestoes;
    if (categoria) {
        questoesFiltradas = todasQuestoes.filter(q => q.categoria === categoria);
    }
    
    questoesEmbaralhadas = embaralhar([...questoesFiltradas]);
    
    if (tipo === 'rapido') {
        simuladoAtual = questoesEmbaralhadas.slice(0, 5);
    } else if (tipo === 'completo') {
        simuladoAtual = questoesEmbaralhadas.slice(0, 10);
    } else {
        simuladoAtual = questoesEmbaralhadas;
    }
    // Metadados para histórico e backend
    simuladoAtual.tipo = tipo;
    if (categoria) simuladoAtual.categoria = categoria;
    simuladoInicioTimestamp = Date.now();
    
    if (simuladoAtual.length === 0) {
        mostrarToast('Não há questões disponíveis para esta seleção.', 'aviso');
        renderizarSimulados();
        return;
    }
    
    renderizarQuestao();
}

// Renderiza a questão atual
function renderizarQuestao() {
    const quizContainer = selecionar('#quiz');
    const questao = simuladoAtual[indiceQuestaoAtual];

    if (!questao) {
        finalizarSimulado();
        return;
    }

    const opcoesHTML = questao.opcoes.map((opcao, index) => `
        <button class="btn" style="width: 100%; margin: 5px 0; text-align: left;" 
                onclick="responderQuestao(${index})" id="opcao-${index}">
            ${String.fromCharCode(65 + index)}) ${opcao}
        </button>
    `).join('');

    quizContainer.innerHTML = `
        <div class="cartao">
            <div class="cabecalho-cartao">
                Questão ${indiceQuestaoAtual + 1}/${simuladoAtual.length} 
                <span class="etiqueta">${questao.categoriaNome || questao.categoria}</span>
            </div>
            <div class="conteudo-cartao">
                <h3>${questao.pergunta}</h3>
                
                <div style="margin: 20px 0;" id="opcoes-container">
                    ${opcoesHTML}
                </div>
                
                <div class="linha" style="justify-content: space-between; margin-top: 20px;">
                    <button class="btn" onclick="pularQuestao()">Pular</button>
                    <button class="btn primaria" disabled id="btn-proximo" onclick="proximaQuestao()">Próxima ➡️</button>
                </div>
            </div>
        </div>
    `;
}

// Lida com a resposta do usuário
function responderQuestao(indiceResposta) {
    const questao = simuladoAtual[indiceQuestaoAtual];
    const opcoesContainer = selecionar('#opcoes-container');
    const btnProximo = selecionar('#btn-proximo');

    // Desabilita todas as opções após a resposta
    opcoesContainer.querySelectorAll('button').forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = 0.6;
    });

    // Armazena a resposta
    respostasUsuario[indiceQuestaoAtual] = indiceResposta;

    // Marca a opção selecionada
    const btnSelecionado = selecionar(`#opcao-${indiceResposta}`);
    btnSelecionado.classList.add('aviso');
    btnSelecionado.style.opacity = 1;

    // Marca a resposta correta
    const btnCorreto = selecionar(`#opcao-${questao.respostaCorreta}`);
    btnCorreto.classList.remove('aviso');
    btnCorreto.classList.add('sucesso');

    // Se errou, marca a errada
    if (indiceResposta !== questao.respostaCorreta) {
        btnSelecionado.classList.remove('aviso');
        btnSelecionado.classList.add('erro');
    }

    // Exibe a explicação
    opcoesContainer.insertAdjacentHTML('afterend', `
        <div class="cartao" style="margin-top: 15px; border-left: 5px solid var(--primaria);">
            <div class="conteudo-cartao">
                <b>Explicação:</b> ${questao.explicacao}
            </div>
        </div>
    `);

    // Habilita o botão de próxima
    btnProximo.disabled = false;
}

// Pula a questão (considerada como resposta errada)
function pularQuestao() {
    respostasUsuario[indiceQuestaoAtual] = -1; // -1 indica que pulou
    proximaQuestao();
}

// Avança para a próxima questão
function proximaQuestao() {
    indiceQuestaoAtual++;
    renderizarQuestao();
}

// Finaliza o simulado e exibe o resultado
function finalizarSimulado() {
    const quizContainer = selecionar('#quiz');
    let acertos = 0;
    
    simuladoAtual.forEach((questao, index) => {
        if (respostasUsuario[index] === questao.respostaCorreta) {
            acertos++;
        }
    });
    
    const totalQuestoes = simuladoAtual.length;
    const percentualAcerto = (acertos / totalQuestoes) * 100;
    const aprovado = percentualAcerto >= 70; // Critério de aprovação do Detran (70%)
    
    // Atualiza o melhor resultado
    const melhorResultado = armazenamento.obter('melhorSimulado', '0%');
    const melhorPercentual = parseFloat(melhorResultado.replace('%', ''));
    if (percentualAcerto > melhorPercentual) {
        armazenamento.salvar('melhorSimulado', `${percentualAcerto.toFixed(0)}%`);
    }
    
    // Salvar no histórico de simulados
    const historicos = armazenamento.obter('historicoSimulados', []);
    const tempoMin = simuladoInicioTimestamp ? Math.round((Date.now() - simuladoInicioTimestamp) / 60000) : 0;
    historicos.push({
        tipo: simuladoAtual.tipo || (totalQuestoes <= 5 ? 'rapido' : 'completo'),
        categoria: simuladoAtual.categoria || 'geral',
        data: new Date().toISOString(),
        total: totalQuestoes,
        acertos: acertos,
        percentual: percentualAcerto.toFixed(0),
        tempoGasto: tempoMin
    });
    armazenamento.salvar('historicoSimulados', historicos);

    // Enviar para o backend se estiver logado
    try {
        if (typeof sessao !== 'undefined' && sessao.usuario && window.enviarResultadoSimulado) {
            const usuarioId = sessao.usuario.id;
            const payload = {
                aluno_id: usuarioId,
                tipo: simuladoAtual.tipo || (totalQuestoes <= 5 ? 'rapido' : 'completo'),
                categoria: simuladoAtual.categoria || 'geral',
                total_questoes: totalQuestoes,
                acertos: acertos,
                erros: totalQuestoes - acertos,
                percentual_acerto: Number(percentualAcerto.toFixed(2)),
                tempo_total_segundos: tempoMin * 60
            };
            enviarResultadoSimulado(payload);
        }
    } catch (e) {
        console.warn('Falha ao enviar resultado do simulado ao backend:', e);
    }
    
    // Gerar barra de progresso com cores
    const barraHTML = gerarBarraProgresso(acertos, totalQuestoes);
    
    quizContainer.innerHTML = `
        <div class="cartao" style="text-align: center;">
            <div class="cabecalho-cartao">${aprovado ? '✅ Parabéns! Aprovado!' : '❌ Que pena! Reprovado.'}</div>
            <div class="conteudo-cartao">
                <h2>Resultado do Simulado</h2>
                
                <div style="margin: 20px 0; padding: 15px; background: rgba(0,0,0,0.05); border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span><b>Acertos:</b> ${acertos}/${totalQuestoes}</span>
                        <span style="font-size: 1.2em; font-weight: bold; color: ${aprovado ? 'var(--sucesso)' : 'var(--erro)'};">
                            ${percentualAcerto.toFixed(0)}%
                        </span>
                    </div>
                    ${barraHTML}
                </div>
                
                <div class="divisor"></div>
                
                <button class="btn primaria" onclick="renderizarSimulados()">Novo Simulado</button>
                <button class="btn" onclick="revisarSimulado()">Revisar Respostas</button>
            </div>
        </div>
    `;
}

// Renderiza a tela de revisão
function revisarSimulado() {
    const quizContainer = selecionar('#quiz');
    let revisaoHTML = '<h2>Revisão do Simulado</h2>';
    
    simuladoAtual.forEach((questao, index) => {
        const respostaDada = respostasUsuario[index];
        const correta = questao.respostaCorreta;
        const acertou = respostaDada === correta;
        
        revisaoHTML += `
            <div class="cartao" style="margin-bottom: 15px; border-left: 5px solid ${acertou ? 'var(--sucesso)' : 'var(--erro)'};">
                <div class="conteudo-cartao">
                    <h4>${index + 1}. ${questao.pergunta}</h4>
                    <p><b>Sua resposta:</b> ${respostaDada === -1 ? 'Pulada' : questao.opcoes[respostaDada]}</p>
                    <p style="color: var(--sucesso);"><b>Resposta Correta:</b> ${questao.opcoes[correta]}</p>
                    <p class="texto-suave"><b>Explicação:</b> ${questao.explicacao}</p>
                </div>
            </div>
        `;
    });
    
    revisaoHTML += `<button class="btn" onclick="renderizarSimulados()">Voltar</button>`;
    quizContainer.innerHTML = revisaoHTML;
}

// Renderiza a tela de seleção por categoria
async function renderizarSimuladosPorCategoria() {
    const quizContainer = selecionar('#quiz');
    
    // Garantir que categorias foram carregadas
    if (categoriasDisponiveis.length === 0) {
        await carregarQuestoesDoAPI();
    }
    
    const categoriasHTML = categoriasDisponiveis.map(cat => {
        const qtd = todasQuestoes.filter(q => q.categoria === cat).length;
        const nomeLegivel = formatarNomeCategoria(cat);
        return `
            <button class="btn" onclick="iniciarSimulado('completo', '${cat}')">
                ${nomeLegivel} <span style="display: block; font-size: 0.85em; opacity: 0.8;">(${qtd} questões)</span>
            </button>
        `;
    }).join('');
    
    quizContainer.innerHTML = `
        <div class="cartao">
            <div class="cabecalho-cartao">Simulados por Categoria</div>
            <div class="conteudo-cartao">
                <p class="texto-suave">Selecione a categoria para iniciar um simulado.</p>
                <div class="grade" style="grid-template-columns: 1fr; gap: 10px; margin-top: 20px;">
                    ${categoriasHTML}
                </div>
                <div class="divisor"></div>
                <button class="btn" onclick="renderizarSimulados()">Voltar</button>
            </div>
        </div>
    `;
}

// Renderiza a tela de estatísticas (placeholder)
function verEstatisticas() {
    const quizContainer = selecionar('#quiz');
    quizContainer.innerHTML = `
        <div class="cartao" style="text-align: center; padding: 40px;">
            <h2>📊 Estatísticas</h2>
            <p>Seu desempenho detalhado será exibido aqui.</p>
            <p>Melhor resultado: <b>${armazenamento.obter('melhorSimulado', 'N/A')}</b></p>
            <div class="divisor"></div>
            <button class="btn" onclick="renderizarSimulados()">Voltar</button>
        </div>
    `;
}

// Torna as funções globais para serem acessíveis no HTML
window.renderizarSimulados = renderizarSimulados;
window.iniciarSimulado = iniciarSimulado;
window.responderQuestao = responderQuestao;
window.pularQuestao = pularQuestao;
window.proximaQuestao = proximaQuestao;
window.revisarSimulado = revisarSimulado;
window.renderizarSimuladosPorCategoria = renderizarSimuladosPorCategoria;
window.verEstatisticas = verEstatisticas;
