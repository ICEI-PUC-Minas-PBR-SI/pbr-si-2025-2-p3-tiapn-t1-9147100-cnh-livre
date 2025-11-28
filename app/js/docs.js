// Dashboard de progresso do aluno
const progressoDados = {
    // Questões e simulados
    async obterProgressoQuestoes() {
        // Preferir dados do backend quando logado; caso contrário usar localStorage
        try {
            if (typeof sessao !== 'undefined' && sessao.usuario && window.buscarSimuladosAluno) {
                const lista = await buscarSimuladosAluno(sessao.usuario.id);
                const totalSimulados = lista.length;
                const totalQuestoes = lista.reduce((s, r) => s + (r.total_questoes || 0), 0);
                const totalAcertos = lista.reduce((s, r) => s + (r.acertos || 0), 0);
                const totalErros = totalQuestoes - totalAcertos;
                const percentualAcerto = totalQuestoes > 0 ? ((totalAcertos / totalQuestoes) * 100).toFixed(1) : 0;
                const ultimoSimulado = totalSimulados > 0 ? lista[lista.length - 1] : null;
                return { totalSimulados, totalQuestoes, totalAcertos, totalErros, percentualAcerto, ultimoSimulado };
            }
        } catch (e) {
            console.warn('Falha ao obter progresso de questões do backend, usando local:', e);
        }

        const historicos = armazenamento.obter('historicoSimulados', []);
        const totalQuestoes = historicos.reduce((sum, h) => sum + h.total, 0);
        const totalAcertos = historicos.reduce((sum, h) => sum + h.acertos, 0);
        const totalErros = totalQuestoes - totalAcertos;
        const percentualAcerto = totalQuestoes > 0 ? ((totalAcertos / totalQuestoes) * 100).toFixed(1) : 0;
        return {
            totalSimulados: historicos.length,
            totalQuestoes,
            totalAcertos,
            totalErros,
            percentualAcerto,
            ultimoSimulado: historicos[historicos.length - 1] || null
        };
    },

    // Progresso por categoria
    async obterProgressoPorCategoria() {
        const historicos = armazenamento.obter('historicoSimulados', []);
        const categorias = {};
        
        historicos.forEach(h => {
            if (!categorias[h.categoria]) {
                categorias[h.categoria] = {
                    nome: mapeamentoCategorias[h.categoria] || h.categoria,
                    total: 0,
                    acertos: 0,
                    tentativas: 0
                };
            }
            categorias[h.categoria].total += h.total;
            categorias[h.categoria].acertos += h.acertos;
            categorias[h.categoria].tentativas += 1;
        });
        
        return categorias;
    },

    // Aulas agendadas/realizadas
    async obterProgressoAulas() {
        try {
            if (typeof sessao !== 'undefined' && sessao.usuario) {
                const aulas = await fetch(`/api/aulas/aluno/${sessao.usuario.id}`).then(r => r.json());
                const hoje = new Date();
                const realizadas = aulas.filter(a => (a.status === 'concluida' || a.status === 'realizada'));
                const futuras = aulas.filter(a => {
                    const data = new Date(a.data_aula);
                    return (a.status === 'agendada' || a.status === 'confirmada' || a.status === 'em_andamento' || a.status === 'reagendada') && data >= hoje;
                }).sort((a,b) => new Date(a.data_aula) - new Date(b.data_aula)).slice(0,3);

                return {
                    totalAulasRealizadas: realizadas.length,
                    aulasProximas: futuras,
                    totalAulasAgendadas: aulas.length
                };
            }
        } catch (e) {
            console.warn('Falha ao obter aulas do backend, usando local:', e);
        }

        const aulasAgendadas = armazenamento.obter('aulasAgendadas', []);
        const aulasRealizadas = aulasAgendadas.filter(a => a.status === 'realizada');
        const aulasProximas = aulasAgendadas.filter(a => a.status === 'agendada').slice(0, 3);
        return {
            totalAulasRealizadas: aulasRealizadas.length,
            aulasProximas,
            totalAulasAgendadas: aulasAgendadas.length
        };
    },

    // Tempo de estudo
    obterTempoEstudo() {
        const historicos = armazenamento.obter('historicoSimulados', []);
        const tempoTotalMinutos = historicos.reduce((sum, h) => sum + (h.tempoGasto || 0), 0);
        const horas = Math.floor(tempoTotalMinutos / 60);
        const minutos = tempoTotalMinutos % 60;
        
        return {
            tempoTotalMinutos,
            tempoFormatado: `${horas}h ${minutos}m`,
            mediaTempoSimulado: historicos.length > 0 ? Math.round(tempoTotalMinutos / historicos.length) : 0
        };
    }
};

// Renderizar dashboard de progresso
async function renderizarDocs() {
    carregarTemplate('tpl-docs');
    
    // Carregar dados
    const [progQuestoes, progAulas] = await Promise.all([
        progressoDados.obterProgressoQuestoes(),
        progressoDados.obterProgressoAulas()
    ]);
    const progTempo = progressoDados.obterTempoEstudo();
    const progCategoria = await progressoDados.obterProgressoPorCategoria();
    
    // Resumo Geral
    const resumoContainer = selecionar('#dashResumo');
    if (resumoContainer) {
        resumoContainer.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div class="cartao-dashboard">
                    <div class="icone-dashboard">📋</div>
                    <div class="info-dashboard">
                        <h3>${progQuestoes.totalQuestoes}</h3>
                        <p>Questões Resolvidas</p>
                        <span class="subtexto">de 100+ disponíveis</span>
                    </div>
                </div>
                
                <div class="cartao-dashboard">
                    <div class="icone-dashboard">🎯</div>
                    <div class="info-dashboard">
                        <h3>${progQuestoes.percentualAcerto}%</h3>
                        <p>Taxa de Acerto</p>
                        <span class="subtexto">${progQuestoes.totalAcertos} corretas</span>
                    </div>
                </div>
                
                <div class="cartao-dashboard">
                    <div class="icone-dashboard">✅</div>
                    <div class="info-dashboard">
                        <h3>${progQuestoes.totalSimulados}</h3>
                        <p>Simulados Realizados</p>
                        <span class="subtexto">Ótimo treino!</span>
                    </div>
                </div>
                
                <div class="cartao-dashboard">
                    <div class="icone-dashboard">⏱️</div>
                    <div class="info-dashboard">
                        <h3>${progTempo.tempoFormatado}</h3>
                        <p>Tempo Total de Estudo</p>
                        <span class="subtexto">Média: ${progTempo.mediaTempoSimulado}min/simulado</span>
                    </div>
                </div>
                
                <div class="cartao-dashboard">
                    <div class="icone-dashboard">🚗</div>
                    <div class="info-dashboard">
                        <h3>${progAulas.totalAulasRealizadas}</h3>
                        <p>Aulas Realizadas</p>
                        <span class="subtexto">${20 - progAulas.totalAulasRealizadas} aulas faltam</span>
                    </div>
                </div>
                
                <div class="cartao-dashboard">
                    <div class="icone-dashboard">📅</div>
                    <div class="info-dashboard">
                        <h3>${progAulas.aulasProximas.length}</h3>
                        <p>Aulas Agendadas</p>
                        <span class="subtexto">Próximas a vencer</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Progresso por Categoria
    const categoriasContainer = selecionar('#dashCategorias');
    if (categoriasContainer) {
        if (Object.keys(progCategoria).length === 0) {
            categoriasContainer.innerHTML = `
                <p style="text-align: center; color: var(--texto-suave); padding: 40px 20px;">
                    📊 Nenhum simulado realizado ainda. Comece a treinar!
                </p>
            `;
        } else {
            categoriasContainer.innerHTML = `
                <div style="display: grid; gap: 16px;">
                    ${Object.entries(progCategoria).map(([chave, cat]) => {
                        const percentual = cat.total > 0 ? ((cat.acertos / cat.total) * 100).toFixed(0) : 0;
                        const corBarra = percentual >= 70 ? '#10b981' : percentual >= 50 ? '#f59e0b' : '#ef4444';
                        return `
                            <div style="padding: 15px; background: rgba(0,0,0,0.03); border-radius: 8px; border-left: 4px solid ${corBarra};">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                    <h4 style="margin: 0; font-size: 0.95em;">${cat.nome}</h4>
                                    <span style="font-weight: bold; color: ${corBarra};">${percentual}%</span>
                                </div>
                                <div style="background: #e0e0e0; border-radius: 6px; height: 8px; overflow: hidden; margin-bottom: 8px;">
                                    <div style="background: ${corBarra}; height: 100%; width: ${percentual}%; transition: width 0.3s ease;"></div>
                                </div>
                                <p style="margin: 0; font-size: 0.85em; color: var(--texto-suave);">
                                    ${cat.acertos}/${cat.total} questões • ${cat.tentativas} ${cat.tentativas === 1 ? 'tentativa' : 'tentativas'}
                                </p>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }
    }
    
    // Histórico Recente
    const historicoContainer = selecionar('#dashHistorico');
    if (historicoContainer) {
        const historicos = armazenamento.obter('historicoSimulados', []);
        if (historicos.length === 0) {
            historicoContainer.innerHTML = `
                <p style="text-align: center; color: var(--texto-suave); padding: 30px 20px;">
                    Seus últimos simulados aparecerão aqui
                </p>
            `;
        } else {
            const ultimos5 = historicos.slice(-5).reverse();
            historicoContainer.innerHTML = `
                <div style="display: grid; gap: 12px;">
                    ${ultimos5.map((hist) => {
                        const percentual = ((hist.acertos / hist.total) * 100).toFixed(0);
                        const corStatus = percentual >= 70 ? 'var(--sucesso)' : percentual >= 50 ? '#f59e0b' : 'var(--erro)';
                        const dataBr = new Date(hist.data).toLocaleDateString('pt-BR');
                        return `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(0,0,0,0.02); border-radius: 6px; border-left: 4px solid ${corStatus};">
                                <div>
                                    <p style="margin: 0; font-weight: 500;">${hist.tipo === 'completo' ? 'Simulado Completo' : hist.tipo === 'rapido' ? 'Simulado Rápido' : 'Categoria: ' + (mapeamentoCategorias[hist.categoria] || hist.categoria)}</p>
                                    <p style="margin: 4px 0 0 0; font-size: 0.85em; color: var(--texto-suave);">${dataBr}</p>
                                </div>
                                <div style="text-align: right;">
                                    <p style="margin: 0; font-weight: bold; color: ${corStatus};">${hist.acertos}/${hist.total} acertos</p>
                                    <p style="margin: 4px 0 0 0; font-size: 0.9em; color: var(--texto-suave);">${percentual}%</p>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }
    }
    
    // Próximas Aulas
    const aulasContainer = selecionar('#dashAulas');
    if (aulasContainer) {
        if (progAulas.aulasProximas.length === 0) {
            aulasContainer.innerHTML = `
                <p style="text-align: center; color: var(--texto-suave); padding: 30px 20px;">
                    Nenhuma aula agendada. <a href="#/instrutores" style="color: var(--primaria); text-decoration: none;">Agende uma aula</a>
                </p>
            `;
        } else {
            aulasContainer.innerHTML = `
                <div style="display: grid; gap: 12px;">
                    ${progAulas.aulasProximas.map(aula => {
                        const dataBr = new Date(aula.data_aula).toLocaleDateString('pt-BR');
                        const hora = aula.hora_inicio ? aula.hora_inicio.substring(0, 5) : 'Sem horário';
                        return `
                            <div style="padding: 12px; background: rgba(255, 193, 7, 0.1); border-radius: 6px; border-left: 4px solid #ffc107;">
                                <p style="margin: 0; font-weight: 500;">🚗 ${aula.instrutor_nome || 'Instrutor'}</p>
                                <p style="margin: 4px 0; font-size: 0.9em; color: var(--texto-suave);">📅 ${dataBr} às ${hora}</p>
                                <p style="margin: 4px 0; font-size: 0.85em; color: var(--texto-suave);">📍 ${aula.local_encontro || 'Local não definido'}</p>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }
    }
    
    // Recomendações
    const recomendacaoContainer = selecionar('#dashRecomendacoes');
    if (recomendacaoContainer) {
        const recomendacoes = [];
        
        if (progQuestoes.totalQuestoes < 50) {
            recomendacoes.push({tipo: '📚', titulo: 'Mais questões!', descricao: 'Pratique mais para melhorar'});
        }
        if (progQuestoes.percentualAcerto < 70 && progQuestoes.totalQuestoes > 0) {
            recomendacoes.push({tipo: '🎯', titulo: 'Melhore sua taxa', descricao: 'Revise o conteúdo das categorias fracas'});
        }
        if (progAulas.totalAulasRealizadas < 10) {
            recomendacoes.push({tipo: '🚗', titulo: 'Mais aulas!', descricao: `Você tem ${progAulas.totalAulasRealizadas}/20 aulas`});
        }
        if (recomendacoes.length === 0) {
            recomendacoes.push({tipo: '🏆', titulo: 'Ótimo!', descricao: 'Você está no caminho certo!'});
        }
        
        recomendacaoContainer.innerHTML = `
            <div style="display: grid; gap: 12px;">
                ${recomendacoes.map(rec => `
                    <div style="padding: 15px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 112, 219, 0.1)); border-radius: 8px; border-left: 4px solid var(--primaria);">
                        <p style="margin: 0; font-weight: 600; font-size: 1.05em;">${rec.tipo} ${rec.titulo}</p>
                        <p style="margin: 8px 0 0 0; color: var(--texto-suave);">${rec.descricao}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

// Tornar funções globais
window.renderizarDocs = renderizarDocs;
