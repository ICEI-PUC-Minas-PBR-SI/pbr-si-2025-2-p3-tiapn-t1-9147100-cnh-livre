USE cnh_livre;

-- Adicionar 3 aulas futuras para Lucas Castro (aluno_id 37)
INSERT INTO aulas (aluno_id, instrutor_id, data_aula, hora_inicio, hora_fim, duracao_minutos, preco, status, local_encontro, observacoes)
VALUES 
    (37, 2, '2025-12-05', '10:00:00', '11:00:00', 60, 85.00, 'agendada', 'Praça da Liberdade, BH', 'Aula prática de direção'),
    (37, 6, '2025-12-08', '14:00:00', '15:00:00', 60, 90.00, 'confirmada', 'Estacionamento Mineirão, BH', 'Treino de baliza'),
    (37, 10, '2025-12-12', '09:00:00', '10:00:00', 60, 95.00, 'agendada', 'Centro, BH', 'Preparação para prova prática');
