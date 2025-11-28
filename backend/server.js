const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const morgan = require('morgan');
const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());
// Request logging for easier debugging
app.use(morgan('dev'));

const db = require('./db');
const bcrypt = require('bcryptjs');

// Health endpoint
app.get('/api/health', async (req, res) => {
    try {
        const ok = await db.testConnection();
        return res.json({ ok });
    } catch (err) {
        return res.status(500).json({ ok: false, error: err.message });
    }
});

// Registrar usuário (aluno)
app.post('/api/usuarios', async (req, res) => {
    try {
        const { nome_completo, cpf, email, senha, tipo } = req.body;
        if (!nome_completo || !cpf || !email || !senha) {
            return res.status(400).json({ error: 'campos faltando' });
        }
        // Checar existência
        const [exist] = await db.pool.query('SELECT id FROM usuarios WHERE email = ? OR cpf = ?', [email, cpf]);
        if (exist.length > 0) return res.status(409).json({ error: 'usuario_existente' });

        const hash = await bcrypt.hash(senha, 10);
        const tipoFinal = tipo || 'aluno';

        // Usar transação para garantir que o usuário e o registro em alunos/instrutores sejam consistentes
        const conn = await db.pool.getConnection();
        try {
            await conn.beginTransaction();

            const [result] = await conn.query(
                'INSERT INTO usuarios (email, senha_hash, nome_completo, cpf, tipo) VALUES (?, ?, ?, ?, ?)',
                [email, hash, nome_completo, cpf, tipoFinal]
            );

            const userId = result.insertId;

            // Se for aluno, crie a linha em `alunos` referenciando `usuario_id`
            if (tipoFinal === 'aluno') {
                await conn.query('INSERT INTO alunos (usuario_id) VALUES (?)', [userId]);
            }

            // Se for instrutor, crie a linha em `instrutores` com valores padrão
            if (tipoFinal === 'instrutor') {
                await conn.query(
                    'INSERT INTO instrutores (usuario_id, bio, preco_aula, categorias_ensina, avaliacao_media, total_avaliacoes, aceita_cnh_social, verificado, local) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [userId, 'Instrutor em CNH Livre', 100, JSON.stringify(['B']), 4.5, 0, 0, 0, 'Belo Horizonte, MG']
                );
            }

            await conn.commit();
            conn.release();

            const [rows] = await db.pool.query('SELECT id, email, nome_completo, cpf, tipo, data_cadastro, ativo FROM usuarios WHERE id = ?', [userId]);
            return res.status(201).json(rows[0]);
        } catch (txErr) {
            await conn.rollback();
            conn.release();
            console.error('Erro na transação ao registrar usuário:', txErr);
            return res.status(500).json({ error: 'erro_interno' });
        }
    } catch (err) {
        console.error('Erro ao registrar usuário:', err);
        return res.status(500).json({ error: 'erro_interno' });
    }
});

// GET /api/usuarios/:id - Obter dados do usuário
app.get('/api/usuarios/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        
        const [rows] = await db.pool.query(
            'SELECT id, nome_completo, email, cpf, telefone, tipo, data_cadastro, ativo, foto_url FROM usuarios WHERE id = ?',
            [userId]
        );
        
        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        
        const usuario = rows[0];
        
        // Se for aluno, incluir dados da tabela alunos
        if (usuario.tipo === 'aluno') {
            const [alunoData] = await db.pool.query(
                'SELECT data_nascimento, cnh_categoria_desejada, cnh_social, cidade, estado, endereco FROM alunos WHERE usuario_id = ?',
                [userId]
            );
            if (alunoData && alunoData.length > 0) {
                usuario.data_nascimento = alunoData[0].data_nascimento;
                usuario.cnh_categoria_desejada = alunoData[0].cnh_categoria_desejada;
                usuario.cnh_social = alunoData[0].cnh_social;
                usuario.cidade = alunoData[0].cidade;
                usuario.estado = alunoData[0].estado;
                usuario.endereco = alunoData[0].endereco;
            }
        }
        
        // Se for instrutor, incluir dados da tabela instrutores
        if (usuario.tipo === 'instrutor') {
            const [instrutorData] = await db.pool.query(
                'SELECT bio, preco_aula, categorias_ensina, local FROM instrutores WHERE usuario_id = ?',
                [userId]
            );
            if (instrutorData && instrutorData.length > 0) {
                usuario.bio = instrutorData[0].bio;
                usuario.preco_aula = instrutorData[0].preco_aula;
                usuario.categorias_ensina = instrutorData[0].categorias_ensina;
                usuario.local = instrutorData[0].local;
            }
        }
        
        res.json(usuario);
    } catch (err) {
        console.error('Erro ao obter usuário:', err);
        res.status(500).json({ error: 'erro_interno' });
    }
});

// PUT /api/usuarios/:id - Atualizar dados do usuário
app.put('/api/usuarios/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { nome_completo, telefone, endereco, cidade, estado, data_nascimento, cnh_categoria_desejada, cnh_social, bio, preco_aula, local } = req.body;
        
        // Atualizar tabela usuarios (apenas campos que existem lá)
        const updateFields = [];
        const values = [];
        
        if (nome_completo !== undefined) {
            updateFields.push('nome_completo = ?');
            values.push(nome_completo);
        }
        if (telefone !== undefined) {
            updateFields.push('telefone = ?');
            values.push(telefone);
        }
        
        if (updateFields.length > 0) {
            values.push(userId);
            await db.pool.query(
                `UPDATE usuarios SET ${updateFields.join(', ')} WHERE id = ?`,
                values
            );
        }
        
        // Atualizar dados específicos por tipo
        const [usuario] = await db.pool.query('SELECT tipo FROM usuarios WHERE id = ?', [userId]);
        if (!usuario || usuario.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        
        const tipo = usuario[0].tipo;
        
        if (tipo === 'aluno' && (data_nascimento !== undefined || cnh_categoria_desejada !== undefined || cnh_social !== undefined || endereco !== undefined || cidade !== undefined || estado !== undefined)) {
            const updateAlunoFields = [];
            const updateAlunoValues = [];
            
            if (data_nascimento !== undefined) {
                updateAlunoFields.push('data_nascimento = ?');
                updateAlunoValues.push(data_nascimento);
            }
            if (cnh_categoria_desejada !== undefined) {
                updateAlunoFields.push('cnh_categoria_desejada = ?');
                updateAlunoValues.push(cnh_categoria_desejada);
            }
            if (cnh_social !== undefined) {
                updateAlunoFields.push('cnh_social = ?');
                updateAlunoValues.push(cnh_social);
            }
            if (endereco !== undefined) {
                updateAlunoFields.push('endereco = ?');
                updateAlunoValues.push(endereco);
            }
            if (cidade !== undefined) {
                updateAlunoFields.push('cidade = ?');
                updateAlunoValues.push(cidade);
            }
            if (estado !== undefined) {
                updateAlunoFields.push('estado = ?');
                updateAlunoValues.push(estado);
            }
            
            if (updateAlunoFields.length > 0) {
                updateAlunoValues.push(userId);
                await db.pool.query(
                    `UPDATE alunos SET ${updateAlunoFields.join(', ')} WHERE usuario_id = ?`,
                    updateAlunoValues
                );
            }
        }
        
        if (tipo === 'instrutor' && (bio !== undefined || preco_aula !== undefined || local !== undefined)) {
            const updateInstrutorFields = [];
            const updateInstrutorValues = [];
            
            if (bio !== undefined) {
                updateInstrutorFields.push('bio = ?');
                updateInstrutorValues.push(bio);
            }
            if (preco_aula !== undefined) {
                updateInstrutorFields.push('preco_aula = ?');
                updateInstrutorValues.push(preco_aula);
            }
            if (local !== undefined) {
                updateInstrutorFields.push('local = ?');
                updateInstrutorValues.push(local);
            }
            
            if (updateInstrutorFields.length > 0) {
                updateInstrutorValues.push(userId);
                await db.pool.query(
                    `UPDATE instrutores SET ${updateInstrutorFields.join(', ')} WHERE usuario_id = ?`,
                    updateInstrutorValues
                );
            }
        }
        
        // Retornar dados atualizados
        const [updated] = await db.pool.query('SELECT id, nome_completo, email, tipo FROM usuarios WHERE id = ?', [userId]);
        res.json(updated[0]);
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err);
        res.status(500).json({ error: 'erro_interno', detail: err.message });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) return res.status(400).json({ error: 'campos_faltando' });

        const [rows] = await db.pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(401).json({ error: 'credenciais_invalidas' });

        const user = rows[0];
        const match = await bcrypt.compare(senha, user.senha_hash);
        if (!match) return res.status(401).json({ error: 'credenciais_invalidas' });

        // Retornar dados públicos
        const retorno = {
            id: user.id,
            nome_completo: user.nome_completo,
            email: user.email,
            tipo: user.tipo
        };
        return res.json(retorno);
    } catch (err) {
        console.error('Erro no login:', err);
        return res.status(500).json({ error: 'erro_interno' });
    }
});

// Função para conectar e iniciar o servidor somente após o teste de conexão
async function startServer() {
    const ok = await db.testConnection();
    if (!ok) {
        console.error('Não foi possível conectar ao banco de dados. Verifique as configurações e tente novamente.');
        // Em produção você pode querer process.exit(1);
    }
    console.log('Conexão com o MySQL estabelecida com sucesso!');

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

// Rota de teste
// Servir front-end estático (pasta ../app) - isso permite acessar a UI em http://localhost:3000/
app.use(express.static(path.join(__dirname, '..', 'app')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'app', 'index.html'));
});

// Rota para buscar instrutores
app.get('/api/instrutores', async (req, res) => {
    try {
        const { local, categoria, ordem } = req.query;
        // JOIN com usuarios para trazer nome, email, foto e LEFT JOIN com veiculos
        let sql = `SELECT 
                    i.id, i.usuario_id, i.bio, i.preco_aula, i.categorias_ensina, 
                    i.avaliacao_media, i.total_avaliacoes, i.aceita_cnh_social, 
                    i.verificado, i.credenciamento_detran, i.data_credenciamento, i.local,
                    u.nome_completo, u.email, u.foto_url,
                    v.id as veiculo_id, v.placa, v.modelo, v.ano, v.categoria as veiculo_categoria, v.cor as veiculo_cor, v.foto_url as veiculo_foto_url
                   FROM instrutores i
                   JOIN usuarios u ON u.id = i.usuario_id
                   LEFT JOIN veiculos v ON v.instrutor_id = i.usuario_id
                   WHERE 1=1`;
        const params = [];

        if (local) {
            // usar LOWER para busca case-insensitive e robusta
            sql += ' AND LOWER(i.local) LIKE ?';
            params.push(`%${String(local).toLowerCase()}%`);
        }

        if (categoria) {
            // categorias_ensina pode ser uma coluna JSON
            sql += ' AND i.categorias_ensina LIKE ?';
            params.push(`%"${categoria}"%`);
        }

        if (ordem === 'avaliacao') {
            sql += ' ORDER BY i.avaliacao_media DESC';
        } else if (ordem === 'preco') {
            sql += ' ORDER BY i.preco_aula ASC';
        }

        const [rows] = await db.pool.query(sql, params);
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar instrutores:', error && error.message ? error.message : error);
        res.status(500).json({ error: 'Erro interno do servidor', detail: (error && error.message) ? error.message : undefined });
    }
});

// Rota para buscar detalhes de um instrutor (combina dados de usuarios e veiculos)
app.get('/api/instrutores/:id', async (req, res) => {
    try {
        const id = req.params.id;
            // usar LEFT JOIN para retornar o instrutor mesmo que o usuário ou veículo associado não exista
            const sql = `SELECT i.*, u.nome_completo, u.foto_url, u.email,
                                v.id as veiculo_id, v.placa, v.modelo, v.ano, v.categoria as veiculo_categoria, v.cor as veiculo_cor, v.foto_url as veiculo_foto_url
                     FROM instrutores i
                     LEFT JOIN usuarios u ON u.id = i.usuario_id
                     LEFT JOIN veiculos v ON v.instrutor_id = i.usuario_id
                     WHERE i.id = ?`;
        const [rows] = await db.pool.query(sql, [id]);
        if (!rows || rows.length === 0) return res.status(404).json({ error: 'instrutor_nao_encontrado' });

        const r = rows[0];
        // Normalize output for frontend convenience
        const result = {
            id: r.id,
            usuario_id: r.usuario_id,
            nome: r.nome_completo,
            email: r.email,
            foto: r.foto_url,
            bio: r.bio,
            preco: Number(r.preco_aula || 0),
            categorias: Array.isArray(r.categorias_ensina) ? r.categorias_ensina : (r.categorias_ensina ? JSON.parse(r.categorias_ensina) : []),
            avaliacao: Number(r.avaliacao_media || 0),
            total_avaliacoes: r.total_avaliacoes || 0,
            aceita_cnh_social: Boolean(r.aceita_cnh_social),
            verificado: Boolean(r.verificado),
            credenciamento_detran: r.credenciamento_detran,
            data_credenciamento: r.data_credenciamento,
            local: r.local || '',
            // Veículo info
            veiculo: r.veiculo_id ? {
                id: r.veiculo_id,
                placa: r.placa,
                modelo: r.modelo,
                ano: r.ano,
                categoria: r.veiculo_categoria,
                cor: r.veiculo_cor,
                foto_url: r.veiculo_foto_url
            } : null
        };

        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar detalhe do instrutor:', err && err.message ? err.message : err);
        res.status(500).json({ error: 'erro_interno' });
    }
});

// Rota para buscar questões do simulado
app.get('/api/questoes', async (req, res) => {
    try {
        const { limite, categoria } = req.query;
        let sql = 'SELECT id, pergunta, categoria, opcoes_array, resposta_correta, explicacao, dificuldade FROM questoes WHERE ativa = 1';
        const params = [];

        if (categoria) {
            sql += ' AND categoria = ?';
            params.push(categoria);
        }

        // Embaralhar e limitar no Node.js, pois ORDER BY RAND() é ineficiente
        const [rows] = await db.pool.query(sql, params);
        
        // Formatar dados: converter opcoes_array de JSON string para array se necessário
        const questoes = rows.map(q => ({
            id: q.id,
            pergunta: q.pergunta,
            categoria: q.categoria,
            opcoes: typeof q.opcoes_array === 'string' ? JSON.parse(q.opcoes_array) : q.opcoes_array,
            respostaCorreta: q.resposta_correta,
            explicacao: q.explicacao,
            dificuldade: q.dificuldade
        }));
        
        // Embaralhar
        for (let i = questoes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questoes[i], questoes[j]] = [questoes[j], questoes[i]];
        }

        // Limitar
        const resultado = limite ? questoes.slice(0, parseInt(limite)) : questoes;

        res.json(resultado);
    } catch (error) {
        console.error('Erro ao buscar questões:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// ==== ENDPOINTS DE SIMULADOS (RESULTADOS) ====

// POST /api/simulados - Registrar resultado de simulado do aluno
app.post('/api/simulados', async (req, res) => {
    try {
        let { aluno_id, tipo, categoria, total_questoes, acertos, erros, percentual_acerto, tempo_total_segundos } = req.body;

        if (!aluno_id || !tipo || total_questoes == null || acertos == null) {
            return res.status(400).json({ error: 'campos_faltando', received: { aluno_id, tipo, total_questoes, acertos } });
        }

        // Se foi passado usuario_id, converter para alunos.id
        const [alunoFromUsuario] = await db.pool.query('SELECT id FROM alunos WHERE usuario_id = ?', [aluno_id]);
        let alunoIdFinal = aluno_id;
        if (alunoFromUsuario && alunoFromUsuario.length > 0) {
            alunoIdFinal = alunoFromUsuario[0].id;
        } else {
            // Validar se já é um id de alunos
            const [alunoCheck] = await db.pool.query('SELECT id FROM alunos WHERE id = ?', [aluno_id]);
            if (!alunoCheck || alunoCheck.length === 0) {
                return res.status(400).json({ error: 'aluno_nao_encontrado', aluno_id });
            }
        }

        const errosCalc = erros != null ? erros : Math.max(0, Number(total_questoes) - Number(acertos));
        const perc = percentual_acerto != null ? Number(percentual_acerto) : (Number(total_questoes) > 0 ? (Number(acertos) / Number(total_questoes)) * 100 : 0);
        const tempoSeg = tempo_total_segundos != null ? Number(tempo_total_segundos) : 0;

        const [result] = await db.pool.query(
            `INSERT INTO simulados (aluno_id, tipo, categoria, total_questoes, acertos, erros, percentual_acerto, tempo_total_segundos, data_realizacao)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [alunoIdFinal, String(tipo), categoria || 'geral', Number(total_questoes), Number(acertos), errosCalc, Number(perc.toFixed ? perc.toFixed(2) : perc), tempoSeg]
        );

        const [linha] = await db.pool.query('SELECT * FROM simulados WHERE id = ?', [result.insertId]);
        res.status(201).json(linha[0]);
    } catch (err) {
        console.error('Erro ao registrar simulado:', err);
        res.status(500).json({ error: 'erro_interno', detail: err.message });
    }
});

// GET /api/simulados/aluno/:aluno_id - Listar resultados de simulados de um aluno
app.get('/api/simulados/aluno/:aluno_id', async (req, res) => {
    try {
        let { aluno_id } = req.params;
        // Converter usuario_id -> alunos.id se necessário
        const [alunoCheck] = await db.pool.query('SELECT id FROM alunos WHERE usuario_id = ?', [aluno_id]);
        if (alunoCheck && alunoCheck.length > 0) {
            aluno_id = alunoCheck[0].id;
        }

        const [rows] = await db.pool.query(
            `SELECT id, aluno_id, tipo, categoria, total_questoes, acertos, erros, percentual_acerto, tempo_total_segundos, data_realizacao
             FROM simulados
             WHERE aluno_id = ?
             ORDER BY data_realizacao ASC, id ASC`,
            [aluno_id]
        );
        res.json(rows);
    } catch (err) {
        console.error('Erro ao buscar simulados do aluno:', err);
        res.status(500).json({ error: 'erro_interno' });
    }
});

// ==== ENDPOINTS DE AULAS (AGENDAMENTOS) ====

// POST /api/aulas - Criar nova aula
app.post('/api/aulas', async (req, res) => {
    try {
        let { aluno_id, instrutor_id, data_aula, hora_inicio, hora_fim, duracao_minutos, local_encontro, observacoes, veiculo_id } = req.body;
        console.log('POST /api/aulas body:', req.body);
        
        if (!aluno_id || !instrutor_id || !data_aula || !hora_inicio || !hora_fim) {
            return res.status(400).json({ error: 'Campos obrigatórios faltando', received: { aluno_id, instrutor_id, data_aula, hora_inicio, hora_fim } });
        }

        // Se aluno_id parece ser usuario_id (ID do usuário), converter para alunos.usuario_id
        // Verificar se existe um registro em alunos com usuario_id = aluno_id
        const [alunoFromUsuario] = await db.pool.query('SELECT id FROM alunos WHERE usuario_id = ?', [aluno_id]);
        let alunoIdFinal = aluno_id;
        
        if (alunoFromUsuario && alunoFromUsuario.length > 0) {
            // Existe registro em alunos, usar seu ID
            alunoIdFinal = alunoFromUsuario[0].id;
        } else {
            // Verificar se aluno_id já é um ID válido de alunos
            const [alunoCheck] = await db.pool.query('SELECT usuario_id FROM alunos WHERE id = ?', [aluno_id]);
            if (!alunoCheck || alunoCheck.length === 0) {
                return res.status(400).json({ error: 'Aluno não encontrado', aluno_id });
            }
        }

        // Verificar se aluno é de fato aluno
        const [usuarioCheck] = await db.pool.query('SELECT id, tipo FROM usuarios WHERE id IN (SELECT usuario_id FROM alunos WHERE id = ?)', [alunoIdFinal]);
        if (!usuarioCheck || usuarioCheck.length === 0 || usuarioCheck[0].tipo !== 'aluno') {
            return res.status(400).json({ error: 'Aluno não encontrado ou tipo inválido', aluno_id });
        }

        // Verificar se instrutor_id existe na tabela instrutores (ID da tabela instrutores)
        // Resolve o instrutor informado (pode vir como instrutores.id ou usuarios.id)
        // Precisamos armazenar em aulas.instrutor_id o usuarios.id do instrutor,
        // pois a FK referencia instrutores(usuario_id).
        let instrutorUsuarioIdFinal = null;
        let [instrutorCheck] = await db.pool.query(
            'SELECT i.id, i.usuario_id FROM instrutores i WHERE i.id = ? LIMIT 1',
            [instrutor_id]
        );
        console.log('Instrutor check by i.id:', instrutorCheck);
        if (instrutorCheck && instrutorCheck.length > 0 && instrutorCheck[0].usuario_id) {
            instrutorUsuarioIdFinal = instrutorCheck[0].usuario_id;
        } else {
            // Fallback: tratar instrutor_id como usuarios.id e achar o instrutor correspondente
            const [byUsuario] = await db.pool.query(
                'SELECT i.id, i.usuario_id FROM instrutores i WHERE i.usuario_id = ? LIMIT 1',
                [instrutor_id]
            );
            console.log('Instrutor check by usuario_id:', byUsuario);
            if (!byUsuario || byUsuario.length === 0) {
                return res.status(400).json({ error: 'Instrutor não encontrado ou tipo inválido', instrutor_id });
            }
            instrutorUsuarioIdFinal = byUsuario[0].usuario_id;
            instrutorCheck = byUsuario;
        }
        console.log('Resolved instrutorUsuarioIdFinal (to store in aulas):', instrutorUsuarioIdFinal);
        if (!instrutorUsuarioIdFinal) {
            return res.status(400).json({ error: 'Instrutor inválido (usuario_id ausente)', instrutor_id });
        }

        const insertSql = 'INSERT INTO aulas (aluno_id, instrutor_id, data_aula, hora_inicio, hora_fim, duracao_minutos, local_encontro, observacoes, veiculo_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        console.log('Inserting aula with:', { alunoIdFinal, instrutorUsuarioIdFinal, data_aula, hora_inicio, hora_fim });
        const [result] = await db.pool.query(
            insertSql,
            [alunoIdFinal, instrutorUsuarioIdFinal, data_aula, hora_inicio, hora_fim, duracao_minutos || 60, local_encontro || '', observacoes || '', veiculo_id || null, 'agendada']
        );

        // Retornar a aula criada
        const [aula] = await db.pool.query('SELECT * FROM aulas WHERE id = ?', [result.insertId]);
        res.status(201).json(aula[0]);
    } catch (err) {
        console.error('Erro ao criar aula:', err);
        res.status(500).json({ error: 'Erro ao criar aula', detail: err.message });
    }
});

// GET /api/aulas/aluno/:aluno_id - Listar aulas do aluno
app.get('/api/aulas/aluno/:aluno_id', async (req, res) => {
    try {
        let { aluno_id } = req.params;
        
        // Se passarem usuario_id, converter para aluno_id
        const [alunoCheck] = await db.pool.query('SELECT id FROM alunos WHERE usuario_id = ?', [aluno_id]);
        if (alunoCheck && alunoCheck.length > 0) {
            aluno_id = alunoCheck[0].id;
        }
        
        // Importante: a.instrutor_id armazena usuarios.id do instrutor (FK para instrutores.usuario_id)
        const [aulas] = await db.pool.query(
            `SELECT a.*, u.nome_completo as instrutor_nome, u.email as instrutor_email, i.preco_aula
             FROM aulas a
             LEFT JOIN usuarios u ON u.id = a.instrutor_id
             LEFT JOIN instrutores i ON i.usuario_id = a.instrutor_id
             WHERE a.aluno_id = ?
             ORDER BY a.data_aula DESC, a.hora_inicio DESC`,
            [aluno_id]
        );
        res.json(aulas);
    } catch (err) {
        console.error('Erro ao buscar aulas do aluno:', err);
        res.status(500).json({ error: 'Erro ao buscar aulas' });
    }
});

// GET /api/aulas/instrutor/:instrutor_id - Listar aulas do instrutor
app.get('/api/aulas/instrutor/:instrutor_id', async (req, res) => {
    try {
        const { instrutor_id } = req.params;
        // a.instrutor_id é usuarios.id do instrutor
        const [aulas] = await db.pool.query(
            `SELECT a.*, ualuno.nome_completo as aluno_nome, ualuno.email as aluno_email, ua.cidade as aluno_cidade, ua.estado as aluno_estado, i.preco_aula
             FROM aulas a
             JOIN alunos al ON al.id = a.aluno_id
             JOIN usuarios ualuno ON ualuno.id = al.usuario_id
             LEFT JOIN alunos ua ON ua.usuario_id = ualuno.id
             LEFT JOIN instrutores i ON i.usuario_id = a.instrutor_id
             WHERE a.instrutor_id = ?
             ORDER BY a.data_aula DESC, a.hora_inicio DESC`,
            [instrutor_id]
        );
        res.json(aulas);
    } catch (err) {
        console.error('Erro ao buscar aulas do instrutor:', err);
        res.status(500).json({ error: 'Erro ao buscar aulas' });
    }
});

// PUT /api/aulas/:id - Atualizar status ou detalhes da aula
app.put('/api/aulas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, observacoes, local_encontro } = req.body;

        if (!status && !observacoes && !local_encontro) {
            return res.status(400).json({ error: 'Nenhum campo para atualizar' });
        }

        let sql = 'UPDATE aulas SET ';
        const values = [];
        const updates = [];

        if (status) {
            updates.push('status = ?');
            values.push(status);
        }
        if (observacoes !== undefined) {
            updates.push('observacoes = ?');
            values.push(observacoes);
        }
        if (local_encontro !== undefined) {
            updates.push('local_encontro = ?');
            values.push(local_encontro);
        }

        sql += updates.join(', ') + ' WHERE id = ?';
        values.push(id);

        await db.pool.query(sql, values);

        // Retornar aula atualizada
        const [aula] = await db.pool.query('SELECT * FROM aulas WHERE id = ?', [id]);
        res.json(aula[0]);
    } catch (err) {
        console.error('Erro ao atualizar aula:', err);
        res.status(500).json({ error: 'Erro ao atualizar aula' });
    }
});

// GET /api/aulas/:id - Obter detalhes de uma aula específica
app.get('/api/aulas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [aula] = await db.pool.query(
            `SELECT a.*, 
                    u_aluno.nome_completo as aluno_nome, u_aluno.email as aluno_email,
                    u_instrutor.nome_completo as instrutor_nome, u_instrutor.email as instrutor_email
             FROM aulas a
             JOIN usuarios u_aluno ON u_aluno.id = a.aluno_id
             JOIN usuarios u_instrutor ON u_instrutor.id = a.instrutor_id
             WHERE a.id = ?`,
            [id]
        );

        if (!aula || aula.length === 0) {
            return res.status(404).json({ error: 'Aula não encontrada' });
        }

        res.json(aula[0]);
    } catch (err) {
        console.error('Erro ao buscar aula:', err);
        res.status(500).json({ error: 'Erro ao buscar aula' });
    }
});


// Inicialização
startServer();
