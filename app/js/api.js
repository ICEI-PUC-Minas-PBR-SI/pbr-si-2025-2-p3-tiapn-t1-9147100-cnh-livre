// Usar base absoluta para evitar problemas quando o frontend é servido
const API_BASE_URL = window.location.origin + '/api';

async function buscarInstrutoresAPI(filtros = {}) {
    try {
        const params = new URLSearchParams();
        if (filtros.local) params.append('local', filtros.local);
        if (filtros.categoria) params.append('categoria', filtros.categoria);
        if (filtros.ordem) params.append('ordem', filtros.ordem);

        const url = `${API_BASE_URL}/instrutores?${params.toString()}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        // Normaliza formas diferentes de como o backend pode retornar campos
        return data.map(instrutor => {
            // categorias: pode ser string "A,B" ou array em categorias_ensina
            let categorias = [];
            if (instrutor.categorias) {
                categorias = typeof instrutor.categorias === 'string' ? instrutor.categorias.split(',') : instrutor.categorias;
            } else if (instrutor.categorias_ensina) {
                categorias = Array.isArray(instrutor.categorias_ensina) ? instrutor.categorias_ensina : instrutor.categorias_ensina.split(',');
            }

            // preco: pode vir como preco or preco_aula (string)
            const precoRaw = instrutor.preco || instrutor.preco_aula || instrutor.preco_aula;
            const preco = precoRaw ? Number(precoRaw) : 0;

            // avaliacao: pode vir como avaliacao or avaliacao_media
            const avaliacao = Number(instrutor.avaliacao || instrutor.avaliacao_media || 0);

            // nome/foto: tentar várias colunas (nome, nome_completo, perfil)
            const nome = instrutor.nome_completo || instrutor.nome || instrutor.perfil || instrutor.email || `Instrutor ${instrutor.id}`;
            const foto = instrutor.foto_url || instrutor.foto || null;
            const fotoFinal = foto ? foto : `https://i.pravatar.cc/150?u=${instrutor.usuario_id || instrutor.id}`;
            const local = instrutor.local || instrutor.endereco || '';

            // Veículo info: pode vir veiculo_id + placa/modelo/cor/ano separados OU um objeto veiculo
            let veiculo = null;
            if (instrutor.veiculo && typeof instrutor.veiculo === 'object') {
                veiculo = instrutor.veiculo;
            } else if (instrutor.veiculo_id) {
                veiculo = {
                    id: instrutor.veiculo_id,
                    placa: instrutor.placa || '',
                    modelo: instrutor.modelo || '',
                    ano: instrutor.ano || '',
                    categoria: instrutor.veiculo_categoria || '',
                    cor: instrutor.veiculo_cor || '',
                    foto_url: instrutor.veiculo_foto_url || null
                };
            }

            return {
                id: instrutor.id,
                usuario_id: instrutor.usuario_id,
                nome,
                bio: instrutor.bio,
                categorias,
                preco,
                avaliacao,
                foto: fotoFinal,
                local,
                email: instrutor.email,
                veiculo,
                raw: instrutor
            };
        });

    } catch (error) {
        console.error('Erro ao buscar instrutores na API:', error);
        return []; // Retorna array vazio em caso de erro
    }
}

async function buscarQuestoesAPI(filtros = {}) {
    try {
        const params = new URLSearchParams();
        if (filtros.limite) params.append('limite', filtros.limite);
        if (filtros.categoria) params.append('categoria', filtros.categoria);

        const url = `${API_BASE_URL}/questoes?${params.toString()}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        // Normaliza opcoes para array (pode vir array já parseado ou string JSON)
        return data.map(questao => ({
            ...questao,
            opcoes: Array.isArray(questao.opcoes) ? questao.opcoes : (typeof questao.opcoes === 'string' ? JSON.parse(questao.opcoes) : [])
        }));

    } catch (error) {
        console.error('Erro ao buscar questões na API:', error);
        return []; // Retorna array vazio em caso de erro
    }
}

async function buscarAulasDoAluno(alunoUsuarioId) {
    try {
        const url = `${API_BASE_URL}/aulas/aluno/${alunoUsuarioId}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const dados = await response.json();
        // Mapear para um formato amigável ao frontend
        return dados.map(a => ({
            id: a.id,
            data: a.data_aula,
            hora_inicio: a.hora_inicio,
            hora_fim: a.hora_fim,
            status: a.status,
            instrutorNome: a.instrutor_nome,
            instrutorEmail: a.instrutor_email,
            local: a.local_encontro || '',
            preco: a.preco_aula ? Number(a.preco_aula) : 0
        }));
    } catch (error) {
        console.error('Erro ao buscar aulas do aluno:', error);
        return [];
    }
}

async function buscarSimuladosAluno(alunoUsuarioId) {
    try {
        const url = `${API_BASE_URL}/simulados/aluno/${alunoUsuarioId}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const dados = await response.json();
        return dados;
    } catch (error) {
        console.error('Erro ao buscar simulados do aluno:', error);
        return [];
    }
}

async function enviarResultadoSimulado(payload) {
    try {
        const url = `${API_BASE_URL}/simulados`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Erro ao enviar resultado do simulado:', error);
        return null;
    }
}

// Exportar para uso global
window.buscarInstrutoresAPI = buscarInstrutoresAPI;
window.buscarQuestoesAPI = buscarQuestoesAPI;
window.buscarAulasDoAluno = buscarAulasDoAluno;
window.buscarSimuladosAluno = buscarSimuladosAluno;
window.enviarResultadoSimulado = enviarResultadoSimulado;
