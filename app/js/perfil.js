// perfil.js - Gerenciamento de perfil do usuário

async function renderizarPerfil() {
    console.log('📋 Renderizando perfil do usuário');
    
    const usuario = sessao.usuario;
    if (!usuario) {
        location.hash = '#/';
        return;
    }

    const tpl = selecionar('#tpl-perfil').content.cloneNode(true);
    const container = selecionar('#app');
    container.innerHTML = '';
    container.appendChild(tpl);

    // Preencher informações básicas
    const nomeEl = selecionar('#perfilNome');
    const emailEl = selecionar('#perfilEmail');
    const tipoEl = selecionar('#perfilTipo');
    const fotoEl = selecionar('#perfilFoto');

    if (nomeEl) nomeEl.textContent = usuario.nome_completo || usuario.nome || 'Usuário';
    if (emailEl) emailEl.textContent = usuario.email || '';
    if (tipoEl) tipoEl.textContent = usuario.tipo === 'instrutor' ? '👨‍🏫 Instrutor' : '👨‍🎓 Aluno';
    if (fotoEl && usuario.foto_url) {
        fotoEl.src = usuario.foto_url;
    }

    // Carregar próximas aulas
    await carregarAulasPerfil();
}

async function carregarAulasPerfil() {
    try {
        const usuario = sessao.usuario;
        if (!usuario) return;

        const endpoint = usuario.tipo === 'instrutor' 
            ? `/api/aulas/instrutor/${usuario.id}`
            : `/api/aulas/aluno/${usuario.id}`;

        const resp = await fetch(endpoint);
        if (!resp.ok) {
            console.error('Erro ao carregar aulas:', resp.status);
            return;
        }

        const aulas = await resp.json();
        const listaEl = selecionar('#proximo');
        if (!listaEl) return;

        if (!aulas || aulas.length === 0) {
            listaEl.innerHTML = '<p class="texto-suave">Nenhuma aula agendada</p>';
            return;
        }

        // Filtrar apenas aulas futuras
        const agora = new Date();
        const aulasFuturas = aulas.filter(a => {
            const dataAula = new Date(a.data_aula);
            return dataAula > agora;
        }).sort((a, b) => new Date(a.data_aula) - new Date(b.data_aula));

        listaEl.innerHTML = aulasFuturas.map(a => formatarCartaoAula(a, usuario.tipo)).join('');
    } catch (err) {
        console.error('Erro ao carregar aulas do perfil:', err);
    }
}

function formatarCartaoAula(aula, tipoUsuario) {
    const data = new Date(aula.data_aula);
    const dataFormatada = data.toLocaleDateString('pt-BR');
    const hora = aula.hora_inicio ? aula.hora_inicio.substring(0, 5) : 'N/A';
    
    if (tipoUsuario === 'instrutor') {
        // Para instrutor, mostrar info do aluno
        return `
            <div class="item-lista">
                <div class="linha">
                    <div>
                        <strong>${aula.aluno_nome || 'Aluno'}</strong>
                        <div class="texto-suave texto-pequeno">${dataFormatada} às ${hora}</div>
                    </div>
                    <div class="texto-pequeno" style="text-align:right">
                        <div>R$ ${formatarMoeda(aula.preco_aula || 0)}</div>
                        <div class="etiqueta" style="background:#e8f5e9">${aula.status || 'agendada'}</div>
                    </div>
                </div>
                <div class="texto-suave texto-pequeno">
                    📞 ${aula.aluno_telefone || 'N/A'} | 📍 ${aula.local_encontro || 'Local a confirmar'}
                </div>
            </div>
        `;
    } else {
        // Para aluno, mostrar info do instrutor
        return `
            <div class="item-lista">
                <div class="linha">
                    <div>
                        <strong>${aula.instrutor_nome || 'Instrutor'}</strong>
                        <div class="texto-suave texto-pequeno">${dataFormatada} às ${hora}</div>
                    </div>
                    <div class="texto-pequeno" style="text-align:right">
                        <div>R$ ${formatarMoeda(aula.preco_aula || 0)}</div>
                        <div class="etiqueta" style="background:#e3f2fd">${aula.status || 'agendada'}</div>
                    </div>
                </div>
                <div class="texto-suave texto-pequeno">
                    👤 ${aula.instrutor_email || 'N/A'} | 📍 ${aula.local_encontro || 'Local a confirmar'}
                </div>
            </div>
        `;
    }
}

async function renderizarEditarPerfil() {
    console.log('✏️  Renderizando edição de perfil');
    
    const usuario = sessao.usuario;
    if (!usuario) {
        location.hash = '#/';
        return;
    }

    const tpl = selecionar('#tpl-perfil-editar').content.cloneNode(true);
    const container = selecionar('#app');
    container.innerHTML = '';
    container.appendChild(tpl);

    // Carregar dados do usuário do backend
    try {
        const resp = await fetch(`/api/usuarios/${usuario.id}`);
        if (resp.ok) {
            const userData = await resp.json();
            
            // Preencher formulário com dados do usuário
            const form = selecionar('#formEditarPerfil');
            if (form) {
                form.nome_completo.value = userData.nome_completo || '';
                form.email.value = userData.email || '';
                form.cpf.value = userData.cpf || '';
                
                if (userData.endereco) form.endereco.value = userData.endereco;
                if (userData.cidade) form.cidade.value = userData.cidade;
                if (userData.estado) form.estado.value = userData.estado;
                
                // Dados de aluno
                if (userData.data_nascimento) form.data_nascimento.value = userData.data_nascimento.split('T')[0];
                if (userData.cnh_categoria_desejada) form.cnh_categoria_desejada.value = userData.cnh_categoria_desejada;
                if (userData.cnh_social) form.cnh_social.checked = userData.cnh_social;
                
                // Dados de instrutor
                if (userData.bio) form.bio.value = userData.bio;
                if (userData.preco_aula) form.preco_aula.value = userData.preco_aula;
                if (userData.local) form.local.value = userData.local;
                
                // Mostrar/ocultar seções
                const secaoAluno = selecionar('#secaoAluno');
                const secaoInstrutor = selecionar('#secaoInstrutor');
                
                if (userData.tipo === 'instrutor') {
                    if (secaoAluno) secaoAluno.classList.add('escondido');
                    if (secaoInstrutor) secaoInstrutor.classList.remove('escondido');
                } else {
                    if (secaoAluno) secaoAluno.classList.remove('escondido');
                    if (secaoInstrutor) secaoInstrutor.classList.add('escondido');
                }
                
                // Foto
                if (userData.foto_url) {
                    selecionar('#editFoto').src = userData.foto_url;
                }
            }
        }
    } catch (err) {
        console.error('Erro ao carregar dados do usuário:', err);
    }

    // Configurar evento de submit
    const form = selecionar('#formEditarPerfil');
    if (form) {
        form.addEventListener('submit', salvarPerfil);
        
        // Adicionar preview de foto
        const inputFoto = form.foto;
        if (inputFoto) {
            inputFoto.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                        const img = selecionar('#editFoto');
                        if (img) {
                            img.src = evt.target.result;
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }
}

async function salvarPerfil(e) {
    e.preventDefault();
    
    try {
        const form = e.target;
        const usuario = sessao.usuario;

        // Preparar dados
        const dados = {
            nome_completo: form.nome_completo.value,
            endereco: form.endereco.value,
            cidade: form.cidade.value,
            estado: form.estado.value,
        };

        // Dados específicos por tipo
        if (usuario.tipo === 'aluno') {
            dados.data_nascimento = form.data_nascimento.value || null;
            dados.cnh_categoria_desejada = form.cnh_categoria_desejada.value || null;
            dados.cnh_social = form.cnh_social.checked ? 1 : 0;
        } else {
            dados.bio = form.bio.value;
            dados.preco_aula = form.preco_aula.value ? parseFloat(form.preco_aula.value) : null;
            dados.local = form.local.value;
        }

        // Processar foto se um arquivo foi selecionado
        if (form.foto && form.foto.files && form.foto.files.length > 0) {
            const file = form.foto.files[0];
            const reader = new FileReader();
            
            await new Promise((resolve, reject) => {
                reader.onload = (e) => {
                    // Redimensionar imagem para reduzir tamanho
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const maxWidth = 300;
                        const maxHeight = 300;
                        let width = img.width;
                        let height = img.height;
                        
                        if (width > height) {
                            if (width > maxWidth) {
                                height *= maxWidth / width;
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width *= maxHeight / height;
                                height = maxHeight;
                            }
                        }
                        
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);
                        
                        // Converter para base64 com qualidade reduzida
                        dados.foto_url = canvas.toDataURL('image/jpeg', 0.7);
                        resolve();
                    };
                    img.onerror = reject;
                    img.src = e.target.result;
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }

        // Enviar para backend
        const resp = await fetch(`/api/usuarios/${usuario.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (!resp.ok) {
            const err = await resp.json();
            mostrarNotificacao('Erro: ' + (err.error || 'Não foi possível salvar'));
            return;
        }

        const usuarioAtualizado = await resp.json();
        
        // Atualizar sessão com nova foto
        sessao.usuario = {
            ...usuario,
            nome_completo: usuarioAtualizado.nome_completo,
            foto_url: usuarioAtualizado.foto_url || dados.foto_url,
            ...dados
        };

        mostrarNotificacao('✓ Perfil atualizado com sucesso!');
        setTimeout(() => location.hash = '#/perfil', 1500);
    } catch (err) {
        console.error('Erro ao salvar perfil:', err);
        mostrarNotificacao('Erro ao salvar perfil');
    }
}

function formatarMoeda(valor) {
    return parseFloat(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}
