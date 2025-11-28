// Funções relacionadas ao calendário e agendamento
async function renderizarAgendamento(parametros) {
    carregarTemplate('tpl-agendar');
    
    const usuario = sessao.usuario;
    
    if (!usuario) {
        mostrarNotificacao('Faça login como aluno para agendar aula');
        location.hash = '#/cadastro?perfil=aluno';
        return;
    }

    // Verificar se é um aluno
    if (usuario.tipo !== 'aluno') {
        mostrarNotificacao('Apenas alunos podem agendar aulas');
        location.hash = '#/busca';
        return;
    }
    
    // Buscar instrutor do backend
    const instrutor_id = parametros.id;
    let instrutor;
    try {
        const resp = await fetch(`/api/instrutores/${instrutor_id}`);
        if (!resp.ok) throw new Error('Instrutor não encontrado');
        instrutor = await resp.json();
    } catch (err) {
        mostrarNotificacao('Erro ao carregar instrutor');
        location.hash = '#/busca';
        return;
    }
    
    selecionar('#agNome').textContent = instrutor.nome;
    selecionar('#agPreco').textContent = instrutor.preco;
    
    const agora = new Date();
    let mesAtual = { ano: agora.getFullYear(), mes: agora.getMonth() };
    const labelMes = selecionar('#mLabel');
    
    function desenharCalendario() {
        labelMes.textContent = new Date(mesAtual.ano, mesAtual.mes, 1).toLocaleString('pt-BR', {
            month: 'long',
            year: 'numeric'
        });
        
        const calendario = selecionar('#cal');
        calendario.innerHTML = '';
        
        const diasNoMes = new Date(mesAtual.ano, mesAtual.mes + 1, 0).getDate();
        
        for (let dia = 1; dia <= diasNoMes; dia++) {
            const botaoDia = document.createElement('button');
            botaoDia.type = 'button';
            botaoDia.className = 'dia';
            botaoDia.textContent = dia;
            
            botaoDia.onclick = function() {
                selecionarTodos('.dia', calendario).forEach(d => d.classList.remove('selecionado'));
                botaoDia.classList.add('selecionado');
                botaoDia.dataset.data = `${mesAtual.ano}-${String(mesAtual.mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
                calendario.dataset.selecionado = botaoDia.dataset.data;
            };
            
            calendario.appendChild(botaoDia);
        }
    }
    
    selecionar('#mPrev').onclick = function() {
        mesAtual.mes--;
        if (mesAtual.mes < 0) {
            mesAtual.mes = 11;
            mesAtual.ano--;
        }
        desenharCalendario();
    };
    
    selecionar('#mNext').onclick = function() {
        mesAtual.mes++;
        if (mesAtual.mes > 11) {
            mesAtual.mes = 0;
            mesAtual.ano++;
        }
        desenharCalendario();
    };
    
    desenharCalendario();
    
    selecionar('#goPagamento').onclick = async function() {
        const dataSelecionada = selecionar('#cal').dataset.selecionado;
        const horaSelecionada = selecionar('#selHora').value;
        
        if (!dataSelecionada || !horaSelecionada) {
            mostrarNotificacao('Selecione data e horário');
            return;
        }
        
        // Chamar POST /api/aulas para criar a aula no banco
        try {
            const horaInicio = horaSelecionada;
            const duracao = 60; // minutos
            const hora_fim = new Date(`${dataSelecionada}T${horaSelecionada}`);
            hora_fim.setMinutes(hora_fim.getMinutes() + duracao);
            const horaFim = `${String(hora_fim.getHours()).padStart(2, '0')}:${String(hora_fim.getMinutes()).padStart(2, '0')}`;
            
            // Debug: Verificar dados
            console.log('Dados para agendar:', {
                usuario_id: usuario.id,
                usuario_tipo: usuario.tipo,
                instrutor_usuario_id: instrutor.usuario_id,
                instrutor_id: instrutor.id
            });
            
            const aulaData = {
                aluno_id: usuario.id,
                instrutor_id: instrutor.id,
                data_aula: dataSelecionada,
                hora_inicio: horaInicio,
                hora_fim: horaFim,
                duracao_minutos: duracao,
                local_encontro: '',
                observacoes: ''
            };
            
            console.log('Enviando para API:', aulaData);
            
            const respAula = await fetch('/api/aulas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(aulaData)
            });
            
            if (!respAula.ok) {
                const errText = await respAula.text();
                console.error('Resposta do servidor:', respAula.status, errText);
                throw new Error(`Erro ao agendar aula: ${respAula.status}`);
            }
            
            const aula = await respAula.json();
            console.log('Aula criada:', aula);
            mostrarNotificacao('Aula agendada com sucesso!');
            location.hash = '#/minhas-aulas';
        } catch (err) {
            console.error('Erro ao agendar:', err);
            mostrarNotificacao('Erro ao agendar aula: ' + err.message);
        }
    };
}


// Placeholder para renderizarPagamento (para compatibilidade com rotas)
function renderizarPagamento() {
    // Redirect direto para minhas aulas já que a aula foi criada no agendamento
    location.hash = '#/minhas-aulas';
}


async function renderizarMinhasAulas() {
    carregarTemplate('tpl-minhas-aulas');
    
    const container = selecionar('#minhasAulas');
    const usuario = sessao.usuario;
    
    if (!usuario) {
        container.innerHTML = '<p class="texto-suave">Faça login para ver suas aulas.</p>';
        return;
    }
    
    try {
        // Determinar se é aluno ou instrutor
        const ehInstrutor = usuario.tipo === 'instrutor';
        
        // Buscar aulas do usuário (aluno ou instrutor)
        const endpoint = ehInstrutor 
            ? `/api/aulas/instrutor/${usuario.id}`
            : `/api/aulas/aluno/${usuario.id}`;
        
        const resp = await fetch(endpoint);
        if (!resp.ok) throw new Error('Erro ao buscar aulas');
        
        const aulas = await resp.json();
        
        container.innerHTML = '';
        
        if (!aulas || aulas.length === 0) {
            container.innerHTML = '<p class="texto-suave">Nenhuma aula agendada ainda.</p>';
            return;
        }
        
        aulas.forEach(aula => {
            const elemento = document.createElement('div');
            elemento.className = 'cartao';
            elemento.style.marginBottom = '12px';
            
            const dataFormatada = new Date(aula.data_aula).toLocaleDateString('pt-BR');
            const nomeOutraPessoa = ehInstrutor ? aula.aluno_nome : aula.instrutor_nome;
            const emailOutraPessoa = ehInstrutor ? aula.aluno_email : aula.instrutor_email;
            
            // Cores por status
            let corStatus = '#999';
            if (aula.status === 'confirmada') corStatus = '#4CAF50';
            if (aula.status === 'agendada') corStatus = '#2196F3';
            if (aula.status === 'cancelada') corStatus = '#f44336';
            if (aula.status === 'concluida') corStatus = '#8BC34A';
            
            elemento.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div style="flex: 1;">
                        <div><b>${nomeOutraPessoa}</b></div>
                        <div class="texto-pequeno texto-suave">${emailOutraPessoa}</div>
                        <div style="margin-top: 8px;">
                            <div><b>${dataFormatada}</b> • ${aula.hora_inicio} - ${aula.hora_fim}</div>
                            <div class="texto-pequeno texto-suave">Duração: ${aula.duracao_minutos} min</div>
                            ${aula.local_encontro ? `<div class="texto-pequeno texto-suave">Local: ${aula.local_encontro}</div>` : ''}
                            ${aula.observacoes ? `<div class="texto-pequeno texto-suave">Observações: ${aula.observacoes}</div>` : ''}
                        </div>
                    </div>
                    <div style="margin-left: 12px;">
                        <div style="padding: 4px 8px; background: ${corStatus}; color: white; border-radius: 4px; font-size: 12px; font-weight: bold; text-align: center; min-width: 100px;">
                            ${aula.status}
                        </div>
                    </div>
                </div>
                <div style="margin-top: 12px; display: flex; gap: 8px;">
                    ${aula.status === 'agendada' && !ehInstrutor ? `<button class="btn aviso acao-cancelar" data-aula-id="${aula.id}">Cancelar</button>` : ''}
                    ${aula.status === 'agendada' && ehInstrutor ? `<button class="btn primaria acao-confirmar" data-aula-id="${aula.id}">Confirmar</button>` : ''}
                </div>
            `;
            
            const btnCancelar = selecionar('.acao-cancelar', elemento);
            if (btnCancelar) {
                btnCancelar.onclick = async function() {
                    if (confirm('Deseja cancelar esta aula?')) {
                        try {
                            const respCancel = await fetch(`/api/aulas/${aula.id}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ status: 'cancelada' })
                            });
                            if (respCancel.ok) {
                                mostrarNotificacao('Aula cancelada com sucesso');
                                renderizarMinhasAulas();
                            }
                        } catch (err) {
                            mostrarNotificacao('Erro ao cancelar aula');
                        }
                    }
                };
            }
            
            const btnConfirmar = selecionar('.acao-confirmar', elemento);
            if (btnConfirmar) {
                btnConfirmar.onclick = async function() {
                    try {
                        const respConfirm = await fetch(`/api/aulas/${aula.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ status: 'confirmada' })
                        });
                        if (respConfirm.ok) {
                            mostrarNotificacao('Aula confirmada com sucesso');
                            renderizarMinhasAulas();
                        }
                    } catch (err) {
                        mostrarNotificacao('Erro ao confirmar aula');
                    }
                };
            }
            
            container.appendChild(elemento);
        });
        
    } catch (err) {
        console.error('Erro ao renderizar aulas:', err);
        container.innerHTML = '<p class="texto-suave">Erro ao carregar aulas</p>';
    }
}
