USE cnh_livre;

-- Criar usuário Lucas Castro com ID 35
INSERT INTO usuarios (id, email, senha_hash, nome_completo, cpf, telefone, tipo) 
VALUES (35, 'lucas.castro@test.com', '$2a$10$abcdefghijklmnopqrstuv', 'Lucas Castro', '111.222.333-44', '(31) 99999-9999', 'aluno')
ON DUPLICATE KEY UPDATE email=email;

-- Criar registro na tabela alunos
INSERT INTO alunos (usuario_id, data_nascimento, cnh_categoria_desejada, cidade, estado)
VALUES (35, '2000-05-15', 'B', 'Belo Horizonte', 'MG')
ON DUPLICATE KEY UPDATE usuario_id=usuario_id;

-- Adicionar 3 aulas futuras para Lucas
INSERT INTO aulas (aluno_id, instrutor_id, data_aula, hora_inicio, hora_fim, duracao_minutos, preco, status, local_encontro, observacoes)
SELECT 
    (SELECT id FROM alunos WHERE usuario_id = 35),
    2,
    '2025-12-05',
    '10:00:00',
    '11:00:00',
    60,
    85.00,
    'agendada',
    'Praça da Liberdade, BH',
    'Aula prática de direção'
WHERE NOT EXISTS (SELECT 1 FROM aulas WHERE aluno_id = (SELECT id FROM alunos WHERE usuario_id = 35) AND data_aula = '2025-12-05');

INSERT INTO aulas (aluno_id, instrutor_id, data_aula, hora_inicio, hora_fim, duracao_minutos, preco, status, local_encontro, observacoes)
SELECT 
    (SELECT id FROM alunos WHERE usuario_id = 35),
    6,
    '2025-12-08',
    '14:00:00',
    '15:00:00',
    60,
    90.00,
    'confirmada',
    'Estacionamento Mineirão, BH',
    'Treino de baliza'
WHERE NOT EXISTS (SELECT 1 FROM aulas WHERE aluno_id = (SELECT id FROM alunos WHERE usuario_id = 35) AND data_aula = '2025-12-08');

INSERT INTO aulas (aluno_id, instrutor_id, data_aula, hora_inicio, hora_fim, duracao_minutos, preco, status, local_encontro, observacoes)
SELECT 
    (SELECT id FROM alunos WHERE usuario_id = 35),
    10,
    '2025-12-12',
    '09:00:00',
    '10:00:00',
    60,
    95.00,
    'agendada',
    'Centro, BH',
    'Preparação para prova prática'
WHERE NOT EXISTS (SELECT 1 FROM aulas WHERE aluno_id = (SELECT id FROM alunos WHERE usuario_id = 35) AND data_aula = '2025-12-12');
