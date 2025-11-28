-- Banco de dados CNH Livre
CREATE DATABASE cnh_livre;
USE cnh_livre;

-- Tabela de alunos
CREATE TABLE alunos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_completo VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    categoria_desejada ENUM('A', 'B', 'C', 'D', 'AB') DEFAULT 'B',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE
);

-- Alguns dados de exemplo (opcional)
INSERT INTO alunos (nome_completo, cpf, email, senha, cidade, categoria_desejada) VALUES
('João Silva', '123.456.789-00', 'joao@email.com', 'senha123', 'Belo Horizonte', 'B'),
('Maria Santos', '987.654.321-00', 'maria@email.com', 'senha123', 'Contagem', 'A');

USE cnh_livre;

-- 1) Desabilita checagem de FK para truncar sem erro
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE instrutores;
TRUNCATE TABLE alunos;
TRUNCATE TABLE usuarios;

SET FOREIGN_KEY_CHECKS = 1;

-- 2) Inserir usuarios explicitando os ids (1..30)
--    (nomes longos >= 25 caracteres, CPFs únicos - ajuste se quiser)
INSERT INTO usuarios (id, email, senha_hash, nome_completo, cpf, telefone, foto_url, tipo)
VALUES
(1,  'usuario1@example.com', 'h1', 'João Pedro da Silva Costa Neto Junior',   '100.001.001-01', '(31) 98877-0001', NULL, 'aluno'),
(2,  'usuario2@example.com', 'h2', 'Maria Fernanda Oliveira dos Santos Lima', '100.002.002-02', '(11) 97777-0002', NULL, 'instrutor'),
(3,  'usuario3@example.com', 'h3', 'Carlos Roberto Almeida Pereira da Fonseca', '100.003.003-03', '(31) 99999-0003', NULL, 'administrador'),
(4,  'usuario4@example.com', 'h4', 'Eric Gil de Almeida Rodrigues da Silva',    '100.004.004-04', '(11) 98888-0004', NULL, 'aluno'),
(5,  'usuario5@example.com', 'h5', 'Lucas Henrique de Castro Melo Andrade',    '100.005.005-05', '(21) 97777-0005', NULL, 'aluno'),
(6,  'usuario6@example.com', 'h6', 'Carlos Eduardo dos Santos Lima Carvalho',   '100.006.006-06', '(31) 96666-0006', NULL, 'instrutor'),
(7,  'usuario7@example.com', 'h7', 'Ana Beatriz de Oliveira Souza Pereira',     '100.007.007-07', '(41) 95555-0007', NULL, 'instrutor'),
(8,  'usuario8@example.com', 'h8', 'Marcelo Augusto Ferreira Pinto Junior',    '100.008.008-08', '(32) 98877-0008', NULL, 'aluno'),
(9,  'usuario9@example.com', 'h9', 'Camila Fernanda Pereira Costa Almeida',     '100.009.009-09', '(11) 97766-0009', NULL, 'aluno'),
(10, 'usuario10@example.com','h10','Rodrigo Henrique Alves Martins Souza',     '100.010.010-10', '(21) 98855-0010', NULL, 'instrutor'),
(11, 'usuario11@example.com','h11','Juliana Cristina Moraes Santos Oliveira',    '100.011.011-11', '(41) 97777-0011', NULL, 'instrutor'),
(12, 'usuario12@example.com','h12','Felipe Augusto Souza Martins Carvalho',     '100.012.012-12', '(71) 98888-0012', NULL, 'aluno'),
(13, 'usuario13@example.com','h13','Laís Fernanda Carvalho Mendes Albuquerque',  '100.013.013-13', '(61) 97777-0013', NULL, 'aluno'),
(14, 'usuario14@example.com','h14','Thiago Roberto Lima Fernandes Pereira',     '100.014.014-14', '(81) 98866-0014', NULL, 'instrutor'),
(15, 'usuario15@example.com','h15','Aline Cristina Silva Barbosa Moreira',     '100.015.015-15', '(85) 97755-0015', NULL, 'instrutor'),
(16, 'usuario16@example.com','h16','Mariana de Azevedo Rocha Pinto Nunes',      '100.016.016-16', '(11) 95566-0016', NULL, 'aluno'),
(17, 'usuario17@example.com','h17','Rafael Teixeira Albuquerque Lima Souza',    '100.017.017-17', '(41) 96655-0017', NULL, 'aluno'),
(18, 'usuario18@example.com','h18','Débora Cristina Gomes Almeida Ferreira',     '100.018.018-18', '(21) 98877-0018', NULL, 'instrutor'),
(19, 'usuario19@example.com','h19','Bruno Henrique Machado Costa Pereira',     '100.019.019-19', '(31) 97766-0019', NULL, 'instrutor'),
(20, 'usuario20@example.com','h20','Cláudia Ramos de Oliveira Lima Andrade',    '100.020.020-20', '(51) 98855-0020', NULL, 'aluno'),
(21, 'usuario21@example.com','h21','Gustavo Henrique Mendes Silva Rocha',      '100.021.021-21', '(71) 97744-0021', NULL, 'aluno'),
(22, 'usuario22@example.com','h22','Isabela Cristina Costa Andrade Matos',     '100.022.022-22', '(81) 96633-0022', NULL, 'instrutor'),
(23, 'usuario23@example.com','h23','Ricardo Oliveira da Cunha Neto Pereira',    '100.023.023-23', '(61) 95522-0023', NULL, 'instrutor'),
(24, 'usuario24@example.com','h24','Helena Moura de Souza Campos Ribeiro',      '100.024.024-24', '(41) 98811-0024', NULL, 'aluno'),
(25, 'usuario25@example.com','h25','Vitor Hugo Silveira Monteiro Santos',      '100.025.025-25', '(91) 97700-0025', NULL, 'aluno'),
(26, 'usuario26@example.com','h26','Tatiane Martins de Andrade Souza Lima',     '100.026.026-26', '(31) 98899-0026', NULL, 'instrutor'),
(27, 'usuario27@example.com','h27','Joana Rodrigues Pereira Almeida Castro',    '100.027.027-27', '(11) 97788-0027', NULL, 'instrutor'),
(28, 'usuario28@example.com','h28','Marcos Antônio Freitas Carvalho Neto',      '100.028.028-28', '(85) 98877-0028', NULL, 'administrador'),
(29, 'usuario29@example.com','h29','Andréa Mendes de Souza Farias Rocha',      '100.029.029-29', '(81) 97766-0029', NULL, 'administrador'),
(30, 'usuario30@example.com','h30','Sergio Eduardo Lima Santos da Silva',      '100.030.030-30', '(21) 98888-0030', NULL, 'aluno');

-- 3) Ajustar auto_increment para o próximo id (opcional, mas bom)
ALTER TABLE usuarios AUTO_INCREMENT = 31;

-- 4) Agora insere alunos (referenciando usuario_id que existem: 1..30)
INSERT INTO alunos (usuario_id, data_nascimento, cnh_categoria_desejada, cnh_social, cidade, estado, endereco)
VALUES
(1,  '2003-05-15', 'B', FALSE, 'Belo Horizonte', 'MG', 'Rua das Flores, 123 - Centro'),
(4,  '2000-05-10', 'B', FALSE, 'São Paulo', 'SP', 'Rua das Flores, 100'),
(5,  '1998-09-22', 'A', TRUE,  'Rio de Janeiro', 'RJ', 'Av. Atlântica, 500'),
(8,  '1999-02-11', 'B', FALSE, 'Juiz de Fora', 'MG', 'Rua Coronel Vidal, 210'),
(9,  '2001-11-09', 'A', FALSE, 'Campinas', 'SP', 'Rua das Palmeiras, 47'),
(12, '2002-03-21', 'B', TRUE,  'Salvador', 'BA', 'Av. Sete de Setembro, 300'),
(13, '2004-01-30', 'B', FALSE, 'Brasília', 'DF', 'SQN 210 Bloco A, 10'),
(17, '2001-07-14', 'A', FALSE, 'Curitiba', 'PR', 'Rua João Gualberto, 88'),
(18, '1997-09-28', 'AB', TRUE, 'Belém', 'PA', 'Travessa das Mangueiras, 70'),
(21, '1996-10-05', 'C', FALSE, 'Porto Alegre', 'RS', 'Rua da Praia, 25'),
(22, '1999-04-17', 'B', TRUE,  'Recife', 'PE', 'Av. Boa Viagem, 501'),
(25, '1998-06-29', 'D', FALSE, 'Manaus', 'AM', 'Rua dos Franceses, 40'),
(26, '2003-02-22', 'AB', TRUE, 'Fortaleza', 'CE', 'Av. Beira Mar, 201'),
(27, '2000-12-09', 'A', FALSE, 'São Luís', 'MA', 'Rua do Sol, 311'),
(28, '1997-01-18', 'B', FALSE, 'Aracaju', 'SE', 'Rua das Árvores, 99'),
(29, '2002-08-23', 'C', TRUE,  'Goiânia', 'GO', 'Av. Goiás, 1020'),
(30, '1999-03-12', 'D', FALSE, 'Natal', 'RN', 'Rua Potengi, 600'),
(10, '2001-10-21', 'B', TRUE,  'Campo Grande', 'MS', 'Av. Mato Grosso, 250'),
(11, '1998-04-02', 'AB', FALSE, 'Cuiabá', 'MT', 'Rua Dom Bosco, 87'),
(14, '2000-06-19', 'A', TRUE,  'João Pessoa', 'PB', 'Av. Epitácio Pessoa, 310'),
(15, '1999-08-07', 'B', FALSE, 'Florianópolis', 'SC', 'Rua das Acácias, 55'),
(16, '1997-09-15', 'D', TRUE,  'Vitória', 'ES', 'Av. Fernando Ferrari, 400'),
(19, '1998-12-01', 'AB', FALSE, 'Pelotas', 'RS', 'Rua Quinze de Novembro, 14'),
(20, '2002-05-25', 'B', TRUE,  'Londrina', 'PR', 'Av. Higienópolis, 702'),
(23, '1996-11-11', 'C', FALSE, 'Uberlândia', 'MG', 'Rua Goiás, 650'),
(24, '2003-07-20', 'B', TRUE,  'Santos', 'SP', 'Rua da Liberdade, 81'),
(6,  '1995-02-17', 'A', FALSE, 'Teresina', 'PI', 'Rua Coelho Neto, 90'),
(7,  '1998-03-25', 'D', TRUE,  'Maceió', 'AL', 'Av. Pajuçara, 102'),
(2,  '2001-08-10', 'B', FALSE, 'Niterói', 'RJ', 'Rua Moreira César, 350'),
(3,  '1996-01-02', 'AB', TRUE,  'Macapá', 'AP', 'Rua Beira Rio, 54');

-- 5) Inserir instrutores (referenciando usuario_id válidos)
INSERT INTO instrutores (usuario_id, bio, preco_aula, categorias_ensina, avaliacao_media, total_avaliacoes, aceita_cnh_social, verificado, credenciamento_detran, data_credenciamento)
VALUES
(2,  'Instrutora com 10 anos de experiência em direção defensiva e prática urbana.', 85.00, JSON_ARRAY('A','B'), 4.8, 25, TRUE, TRUE, 'MG-2022-4455', '2025-01-10'),
(6,  'Instrutor especializado em aulas de categoria B com foco em direção segura.', 90.00, JSON_ARRAY('B'), 4.9, 31, TRUE, TRUE, 'SP-2020-4451', '2025-02-12'),
(7,  'Instrutora de motocicletas com 8 anos de experiência e foco em empatia.', 88.00, JSON_ARRAY('A','AB'), 4.7, 40, TRUE, FALSE, 'PR-2021-3344', '2025-03-08'),
(10, 'Instrutor certificado pelo Detran com vasta experiência em autoescolas.', 95.00, JSON_ARRAY('B'), 4.9, 54, TRUE, TRUE, 'RJ-2019-9988', '2025-01-22'),
(11, 'Instrutora referência no ensino de direção para habilitação A e AB.', 92.00, JSON_ARRAY('A','AB'), 4.8, 47, TRUE, TRUE, 'SP-2020-8899', '2025-04-05'),
(14, 'Instrutor de alta performance com foco em aprovação em primeira prova.', 100.00, JSON_ARRAY('B','C'), 4.6, 38, TRUE, TRUE, 'BA-2025-1111', '2025-02-18'),
(15, 'Instrutora premiada em 2024 por excelência em aulas práticas de motocicleta.', 89.00, JSON_ARRAY('A'), 4.9, 45, TRUE, TRUE, 'SC-2021-5566', '2025-03-22'),
(16, 'Instrutor com certificação em direção econômica e manutenção preventiva.', 78.00, JSON_ARRAY('B','C'), 4.7, 28, FALSE, TRUE, 'ES-2023-6677', '2025-02-25'),
(19, 'Instrutor veterano com mais de 15 anos de experiência em veículos pesados.', 120.00, JSON_ARRAY('C','D'), 4.9, 65, TRUE, TRUE, 'RS-2010-1212', '2025-04-01'),
(20, 'Instrutora com foco em acessibilidade e atendimento de CNH Social.', 82.00, JSON_ARRAY('B','AB'), 4.8, 33, TRUE, TRUE, 'PR-2022-2233', '2025-03-15'),
(22, 'Instrutor licenciado com mais de 12 anos de experiência.', 110.00, JSON_ARRAY('B','C'), 4.9, 50, TRUE, TRUE, 'SP-2023-5599', '2025-04-18'),
(23, 'Instrutora com foco em direção segura e psicologia do trânsito.', 95.00, JSON_ARRAY('A','B'), 4.6, 28, TRUE, TRUE, 'RJ-2024-4400', '2025-02-11'),
(25, 'Instrutor com ampla experiência no ensino prático para caminhões e ônibus.', 130.00, JSON_ARRAY('C','D'), 4.9, 70, TRUE, TRUE, 'AM-2020-7700', '2025-03-09'),
(26, 'Instrutora destaque pelo atendimento humanizado em CNH Social.', 93.00, JSON_ARRAY('A','AB'), 4.7, 55, TRUE, TRUE, 'CE-2021-9900', '2025-04-10'),
(27, 'Instrutor com especialização em técnicas avançadas de frenagem e controle.', 105.00, JSON_ARRAY('B'), 4.8, 36, TRUE, TRUE, 'MA-2025-2200', '2025-05-01'),
(28, 'Instrutora com certificação internacional em direção defensiva.', 115.00, JSON_ARRAY('A','B'), 4.9, 42, TRUE, TRUE, 'SE-2022-9901', '2025-02-14'),
(29, 'Instrutor experiente em provas práticas e simuladores de trânsito.', 97.00, JSON_ARRAY('B','C'), 4.6, 39, FALSE, TRUE, 'GO-2020-5544', '2025-03-30'),
(30, 'Instrutora formada em psicologia e especialista em fobia de direção.', 125.00, JSON_ARRAY('B','A'), 4.9, 49, TRUE, TRUE, 'RN-2023-6633', '2025-04-21'),
(3,  'Instrutor sênior de direção e coordenador técnico de treinamento de condutores.', 135.00, JSON_ARRAY('B','D'), 4.8, 60, TRUE, TRUE, 'MG-2019-8890', '2025-05-05'),
(12, 'Instrutora de longa data, reconhecida pela empatia e método eficaz.', 88.00, JSON_ARRAY('A','B'), 4.7, 52, TRUE, TRUE, 'SP-2021-3333', '2025-04-25');

-- 9) Inserir 30 veículos (Motos para A/Carros para B/Caminhões para C/Ônibus para D)

-- 9) Inserir 30 veículos (Motos para A/Carros para B/Caminhões para C/Ônibus para D)

-- 9) Inserir 30 veículos
INSERT INTO veiculos (instrutor_id, placa, modelo, ano, categoria, cor, foto_url, disponivel)
VALUES
(2, 'ABC1234', 'Chevrolet Onix', 2023, 'B', 'Branco', NULL, TRUE),
(2, 'XYZ5678', 'Honda CG 160 Titan', 2024, 'A', 'Vermelho', NULL, TRUE),
(6, 'DEF4567', 'Fiat Mobi', 2022, 'B', 'Preto', NULL, TRUE),
(7, 'GHI8901', 'Yamaha FZ25 Fazer', 2023, 'A', 'Azul', NULL, TRUE),
(7, 'JKL2345', 'Renault Kwid', 2021, 'B', 'Prata', NULL, TRUE),
(10, 'MNO6789', 'Volkswagen Gol', 2020, 'B', 'Cinza', NULL, TRUE),
(10, 'PQR0123', 'Hyundai HB20', 2023, 'B', 'Branco', NULL, TRUE),
(11, 'STU4567', 'Honda Biz 125', 2024, 'A', 'Rosa', NULL, TRUE),
(11, 'VWX8901', 'Ford Ka', 2019, 'B', 'Prata', NULL, TRUE),
(14, 'YZA2345', 'Chevrolet Prisma', 2020, 'B', 'Vermelho', NULL, TRUE),
(14, 'BCD6789', 'Mercedes-Benz Accelo', 2018, 'C', 'Branco', NULL, TRUE),
(15, 'EFC0123', 'Kawasaki Ninja 400', 2022, 'A', 'Verde', NULL, TRUE),
(16, 'GHI4567', 'Toyota Etios', 2021, 'B', 'Azul Marinho', NULL, TRUE),
(16, 'JKL8901', 'Ford Cargo 816', 2017, 'C', 'Vermelho', NULL, FALSE),
(19, 'MNO2345', 'Volkswagen Delivery 9.170', 2020, 'C', 'Amarelo', NULL, TRUE),
(19, 'PQR6789', 'Marcopolo Volare W9', 2019, 'D', 'Branco', NULL, TRUE),
(20, 'STU0123', 'Nissan March', 2018, 'B', 'Laranja', NULL, TRUE),
(20, 'VWX4567', 'Honda CB 300R', 2017, 'A', 'Preto Fosco', NULL, TRUE),
(22, 'YZA8901', 'JEEP Renegade (Adaptação PCD)', 2023, 'B', 'Verde Militar', NULL, TRUE),
(22, 'BCD2345', 'Volvo VM 270', 2021, 'C', 'Branco', NULL, TRUE),
(23, 'EFC6789', 'Honda XRE 190', 2024, 'A', 'Branco', NULL, TRUE),
(23, 'GHI0123', 'Fiat Palio', 2016, 'B', 'Cinza Chumbo', NULL, FALSE),
(25, 'JKL4567', 'Scania P360 (Toco)', 2022, 'C', 'Vermelho', NULL, TRUE),
(25, 'MNO8901', 'Mercedes-Benz O 500 R', 2023, 'D', 'Prata', NULL, TRUE),
(26, 'PQR2345', 'Shineray Jet 50cc', 2023, 'A', 'Preto', NULL, TRUE),
(26, 'STU6789', 'Volkswagen Voyage', 2022, 'B', 'Azul Metálico', NULL, TRUE),
(27, 'VWX0123', 'Toyota Corolla (Automático)', 2021, 'B', 'Branco Perolado', NULL, TRUE),
(28, 'YZA4567', 'Royal Enfield Meteor 350', 2022, 'A', 'Marrom', NULL, TRUE),
(29, 'BCD8901', 'Volkswagen Fox', 2018, 'B', 'Vermelho', NULL, TRUE),
(30, 'EFC2345', 'Suzuki Intruder 125', 2015, 'A', 'Cinza', NULL, FALSE),
(30, 'GHI6789', 'Chevrolet Celta', 2010, 'B', 'Verde', NULL, TRUE),
(3, 'JKL0123', 'Iveco Daily 35S14', 2019, 'B', 'Branco', NULL, TRUE),
(3, 'MNO4567', 'Comil Svelto (Urbano)', 2015, 'D', 'Amarelo', NULL, TRUE);

-- 9) Inserir 40 agendamentos (Aulas) - CÓDIGO FINAL CORRIGIDO
INSERT INTO aulas (aluno_id, instrutor_id, veiculo_id, data_aula, hora_inicio, hora_fim, duracao_minutos, preco, status, local_encontro, observacoes)
VALUES
(1, 2, 1, '2025-10-28', '08:00:00', '09:00:00', 60, 85.00, 'concluida', 'Praça da Liberdade, BH', 'Primeira aula prática, foco em embreagem.'),
(1, 6, 3, '2025-10-30', '10:00:00', '11:00:00', 60, 90.00, 'concluida', 'Estacionamento Mineirão, BH', 'Treino de baliza e rampa.'),
(1, 27, 27, '2025-11-05', '14:30:00', '15:30:00', 60, 105.00, 'agendada', 'Auto Escola Central, BH', 'Aula em carro automático (Corolla).'),
(3, 7, 4, '2025-10-25', '16:00:00', '17:00:00', 60, 88.00, 'concluida', 'Pátio Detran, RJ', 'Foco em cone e equilíbrio.'),
(5, 15, 12, '2025-11-04', '07:30:00', '08:30:00', 60, 89.00, 'confirmada', 'Parque Industrial, Campinas', 'Prática em trânsito de baixa velocidade.'),
(5, 23, 21, '2025-11-07', '09:00:00', '10:00:00', 60, 95.00, 'agendada', 'Avenida Principal, Campinas', 'Moto Honda XRE 190.'),
(4, 10, 6, '2025-10-29', '11:00:00', '12:00:00', 60, 95.00, 'cancelada', 'Centro, Juiz de Fora', 'Aluno cancelou 2h antes.'),
(4, 19, 29, '2025-11-06', '13:00:00', '14:00:00', 60, 120.00, 'agendada', 'Próximo ao Shopping, Juiz de Fora', 'Aula com instrutor Bruno.'),
(6, 22, 20, '2025-10-26', '14:00:00', '15:30:00', 90, 110.00, 'concluida', 'Orla Marítima, Salvador', 'Aula de 90 min. com veículo PCD.'),
(6, 20, 17, '2025-11-03', '08:30:00', '09:30:00', 60, 82.00, 'confirmada', 'Estacionamento do Mercado, Salvador', 'Instrutora Cláudia (aceita CNH Social).'),
(8, 11, 8, '2025-11-01', '17:00:00', '18:00:00', 60, 92.00, 'agendada', 'Praça Tiradentes, Curitiba', 'Aula noturna.'),
(9, 2, 1, '2025-10-27', '09:00:00', '10:00:00', 60, 85.00, 'concluida', 'Rua XV de Novembro, Londrina', 'Foco em controle de direção e uso de pisca.'),
(10, 14, 10, '2025-10-29', '15:00:00', '16:00:00', 60, 100.00, 'em_andamento', 'Rodoviária, Porto Alegre', 'Aula de categoria C (caminhão).'),
(11, 26, 26, '2025-11-02', '10:30:00', '11:30:00', 60, 93.00, 'agendada', 'Ponte Estaiada, Santos', 'Instrutora Tatiane.'),
(12, 25, 24, '2025-11-05', '06:00:00', '08:00:00', 120, 130.00, 'agendada', 'Terminal de Cargas, Manaus', 'Aula de categoria D (Ônibus), 120 minutos.'),
(13, 16, 13, '2025-10-24', '13:00:00', '14:00:00', 60, 78.00, 'concluida', 'Setor Hoteleiro, Brasília', 'Foco em direção econômica.'),
(14, 29, 30, '2025-11-08', '09:00:00', '10:00:00', 60, 97.00, 'agendada', 'Parque Vaca Brava, Goiânia', 'Prática para prova categoria C.'),
(15, 30, 31, '2025-11-09', '10:00:00', '11:30:00', 90, 125.00, 'agendada', 'Via Costeira, Natal', 'Aula de 90 min, foco em fobia de dirigir.'),
(21, 19, 15, '2025-10-31', '15:00:00', '17:00:00', 120, 120.00, 'confirmada', 'Pátio da Transportadora, Porto Alegre', 'Treino de manobra com caminhão.'),
(25, 3, 31, '2025-11-01', '07:00:00', '08:00:00', 60, 135.00, 'confirmada', 'Terminal Rodoviário, Manaus', 'Aula em ônibus (usando veículo 31).'), -- ID 33 alterado para 31
(2, 6, 3, '2025-10-20', '09:00:00', '10:00:00', 60, 90.00, 'concluida', 'Av. Paulista, SP', 'Percurso de prova.'),
(2, 10, 7, '2025-10-22', '13:00:00', '14:00:00', 60, 95.00, 'reagendada', 'Estádio do Morumbi, SP', 'Aula reagendada para 2025-11-15.'),
(8, 7, 4, '2025-10-15', '11:00:00', '12:00:00', 60, 88.00, 'cancelada', 'Centro, Juiz de Fora', 'Cancelada pelo instrutor por imprevisto.'),
(17, 28, 28, '2025-11-10', '16:00:00', '17:00:00', 60, 115.00, 'agendada', 'Praia de Iracema, Fortaleza', 'Aula de moto (A) avançada.'),
(4, 10, 6, '2025-11-12', '10:00:00', '11:00:00', 60, 95.00, 'agendada', 'Praça Central, Juiz de Fora', 'Retomada após cancelamento.'),
(16, 2, 1, '2025-10-26', '12:00:00', '13:00:00', 60, 85.00, 'concluida', 'Av. Brasil, SP', 'Aula de trânsito intenso.'),
(24, 6, 3, '2025-11-03', '15:00:00', '16:00:00', 60, 90.00, 'confirmada', 'Avenida da Praia, Santos', 'Treino de estacionamento em ladeira.'),
(20, 16, 13, '2025-10-29', '14:00:00', '15:00:00', 60, 78.00, 'concluida', 'Centro, Londrina', 'Aula básica, foco em marchas.'),
(18, 11, 9, '2025-11-01', '10:00:00', '11:00:00', 60, 92.00, 'agendada', 'Mercado Ver-o-Peso, Belém', 'Aula de carro para categoria AB.'),
(18, 20, 18, '2025-11-01', '11:00:00', '12:00:00', 60, 82.00, 'agendada', 'Mercado Ver-o-Peso, Belém', 'Aula de moto para categoria AB.'),
(29, 3, 32, '2025-11-04', '09:00:00', '11:00:00', 120, 135.00, 'confirmada', 'Garagem da Viação, Goiânia', 'Aula prática de 2h em ônibus (usando veículo 32).'), -- ID 34 alterado para 32
(7, 25, 24, '2025-11-06', '14:00:00', '16:00:00', 120, 130.00, 'agendada', 'Rodovia DF-001, Brasília', 'Aula de 2h em caminhão (Categoria C).'),
(1, 10, 6, '2025-09-15', '14:00:00', '15:00:00', 60, 95.00, 'concluida', 'Av. Afonso Pena, BH', 'Simulado de prova.'),
(4, 7, 5, '2025-09-20', '08:00:00', '09:00:00', 60, 88.00, 'concluida', 'Centro, Juiz de Fora', 'Aula focada em baliza.'),
(5, 11, 8, '2025-09-25', '18:00:00', '19:00:00', 60, 92.00, 'concluida', 'Bairro Cambuí, Campinas', 'Aula noturna.'),
(12, 14, 11, '2025-10-01', '07:00:00', '08:00:00', 60, 100.00, 'concluida', 'Farol da Barra, Salvador', 'Aula cedo, trânsito leve.'),
(13, 16, 13, '2025-10-05', '11:00:00', '12:00:00', 60, 78.00, 'concluida', 'Eixo Monumental, Brasília', 'Prática em vias rápidas.'),
(17, 2, 1, '2025-10-10', '15:00:00', '16:00:00', 60, 85.00, 'concluida', 'Parque Barigui, Curitiba', 'Revisão geral.'),
(21, 19, 15, '2025-10-12', '16:00:00', '18:00:00', 120, 120.00, 'concluida', 'Avenida Ipiranga, Porto Alegre', 'Manobras em pátio com caminhão.'),
(24, 27, 27, '2025-10-18', '13:00:00', '14:00:00', 60, 105.00, 'concluida', 'Av. Ana Costa, Santos', 'Aula de carro automático.'),
(26, 26, 25, '2025-10-20', '09:30:00', '10:30:00', 60, 93.00, 'concluida', 'Beira Mar, Fortaleza', 'Aula de moto (A) com CNH Social.'),
(27, 28, 28, '2025-10-21', '17:30:00', '18:30:00', 60, 115.00, 'concluida', 'Lago da Jansen, São Luís', 'Aula noturna de carro.'),
(30, 30, 32, '2025-10-23', '10:00:00', '11:00:00', 60, 125.00, 'concluida', 'Praia de Ponta Negra, Natal', 'Superando a fobia.'),
(23, 23, NULL, '2025-11-11', '18:00:00', '19:30:00', 90, 95.00, 'agendada', 'Campus UFU, Uberlândia', 'Simulador de trânsito (Sem veículo físico).');



-- 10) Inserir Avaliações para Aulas Concluídas (usando subconsulta)
INSERT INTO avaliacoes (aula_id, aluno_id, instrutor_id, nota, comentario, anonima)
SELECT
    a.id,
    a.aluno_id,
    a.instrutor_id,
    FLOOR(1 + (RAND() * 5)) AS nota_aleatoria, -- Gera nota aleatória entre 1 e 5
    CASE FLOOR(1 + (RAND() * 5))
        WHEN 5 THEN 'Excelente aula, instrutor muito paciente e didático!'
        WHEN 4 THEN 'Bom treino de baliza e rampa. Progresso satisfatório.'
        WHEN 3 THEN 'Aula padrão, sem problemas. Poderia ter focado mais na prática.'
        WHEN 2 THEN 'Achei o instrutor um pouco apressado. Precisa melhorar.'
        ELSE 'Experiência ruim, instrutor se atrasou e o carro estava sujo.'
    END AS comentario_aleatorio,
    CASE WHEN RAND() > 0.8 THEN TRUE ELSE FALSE END -- 20% das avaliações são anônimas
FROM
    aulas a
WHERE
    a.status = 'concluida';

-- 1. DESABILITA temporariamente a verificação de Chaves Estrangeiras
SET FOREIGN_KEY_CHECKS = 0;

-- 2. TENTE NOVAMENTE O INSERT (use a versão compacta que enviei anteriormente)
INSERT INTO problemas_aula (aula_id, usuario_id, tipo_problema, descricao, status) VALUES (1, 1, 'atraso', 'O instrutor chegou 15 minutos atrasado, o que reduziu o tempo da minha aula.', 'resolvido'), (16, 2, 'pagamento', 'O aluno não pagou o saldo restante da aula. Necessita cobrança.', 'em_analise'), (7, 4, 'comportamento', 'O instrutor cancelou a aula com menos de 2 horas de antecedência, alegando motivo pessoal. Gostaria de reembolso da taxa.', 'em_analise'), (10, 14, 'veiculo', 'O caminhão (placa BCD6789) apresentou problemas na marcha lenta durante a aula.', 'resolvido'), (23, 8, 'outro', 'Houve confusão no reagendamento, o sistema marcou a aula no horário errado.', 'arquivado'), (24, 17, 'atraso', 'O veículo demorou a chegar ao local. Aula iniciou 10 minutos depois do combinado.', 'pendente'), (20, 3, 'veiculo', 'A moto (Honda CB 300R) estava com o retrovisor solto, atrapalhando a visualização.', 'resolvido'), (15, 15, 'pagamento', 'O sistema duplicou a cobrança desta aula no meu cartão de crédito.', 'em_analise'), (29, 25, 'comportamento', 'O aluno estava ao celular durante 15 minutos da aula prática, desrespeitando as regras de segurança.', 'resolvido'), (40, 23, 'outro', 'Aula de simulador foi interrompida várias vezes por falha no software.', 'pendente');

-- 3. REABILITA a verificação de Chaves Estrangeiras
SET FOREIGN_KEY_CHECKS = 1;

-- 14) Inserir 8 Cursos EAD
INSERT INTO cursos_ead (titulo, descricao, carga_horaria, categoria, preco, nivel, thumbnail_url) VALUES ('Direção Defensiva: Teoria Completa', 'Revisão das normas e procedimentos para evitar acidentes e dirigir com segurança.', 10, 'Teórico', 79.90, 'intermediario', 'url_defensiva.jpg'), ('Primeiros Socorros no Trânsito', 'Como agir em caso de emergência e prestar os primeiros socorros antes da ajuda médica.', 6, 'Emergência', 49.90, 'iniciante', 'url_socorros.jpg'), ('Legislação de Trânsito para Renovação', 'Atualização completa sobre o Código de Trânsito Brasileiro (CTB) e suas recentes alterações.', 8, 'Legislação', 65.00, 'avancado', 'url_legislacao.jpg'), ('Manutenção Básica do Veículo', 'Aprenda a checar óleo, pneus, freios e a fazer manutenção preventiva simples no seu carro.', 4, 'Mecânica', 39.90, 'iniciante', 'url_manutencao.jpg'), ('Pilotagem Segura de Motocicletas', 'Curso focado em técnicas de frenagem, curvas e equilíbrio para pilotos de moto.', 12, 'Pilotagem', 89.90, 'intermediario', 'url_moto_segura.jpg'), ('Simulado de Prova Teórica: 1000 Questões', 'Banco de questões com foco na prova oficial do DETRAN.', 20, 'Simulado', 29.90, 'intermediario', 'url_simulado.jpg'), ('Dirigindo em Condições Adversas (Chuva e Neblina)', 'Módulo especial para condutores que sentem insegurança em condições climáticas desfavoráveis.', 3, 'Técnicas Especiais', 55.00, 'intermediario', 'url_adversas.jpg'), ('Revalidação de Categoria D (Ônibus)', 'Curso obrigatório para revalidação da CNH Categoria D.', 50, 'Profissional', 199.00, 'avancado', 'url_categoria_d.jpg');

-- 16) Inserir 12 Módulos de Curso (VERSÃO COMPACTA)
INSERT INTO modulos_curso (curso_id, titulo, ordem, tipo, conteudo_url, duracao_minutos) VALUES 
(1, 'Introdução à Direção Defensiva', 1, 'video', 'url_video_intro.mp4', 15), 
(1, 'Elementos da Direção Defensiva e Prevenção', 2, 'texto', 'url_texto_elementos.pdf', 30), 
(1, 'Checklist de Segurança e Manutenção Preventiva', 3, 'pdf', 'url_pdf_checklist.pdf', 10), 
(1, 'Quiz Final: Direção Defensiva', 4, 'quiz', 'url_quiz_defensiva', 5), 

(2, 'Avaliação da Cena e Acionamento de Socorro', 1, 'video', 'url_video_cena.mp4', 20), 
(2, 'Lesões Mais Comuns no Trânsito', 2, 'texto', 'url_texto_lesoes.txt', 15), 
(2, 'Movimentação e Retirada de Vítimas (Teoria)', 3, 'video', 'url_video_movimentacao.mp4', 25), 
(2, 'Guia Rápido de Primeiros Socorros (PDF)', 4, 'pdf', 'url_pdf_guia_rapido.pdf', 5), 

(3, 'Fundamentos do Código de Trânsito Brasileiro (CTB)', 1, 'texto', 'url_texto_ctb_fundamentos.html', 40), 
(3, 'Infrações, Penalidades e Recursos', 2, 'video', 'url_video_infracoes.mp4', 35), 
(3, 'Direitos e Deveres do Condutor na Renovação', 3, 'texto', 'url_texto_direitos.txt', 15), 
(3, 'Link para o site oficial do DETRAN', 4, 'link', 'https://www.detran.uf.gov.br/legislacao', 5);

-- 18) Inserir 15 Registros de Progresso em Cursos EAD (VERSÃO ULTRA-COMPACTA FINAL)
INSERT INTO progresso_cursos (aluno_id, curso_id, modulo_id, concluido, data_inicio, data_conclusao, percentual_concluso) VALUES (1, 1, 1, TRUE, '2025-10-01 10:00:00', '2025-10-01 10:15:00', 100), (1, 1, 2, TRUE, '2025-10-01 10:30:00', '2025-10-01 11:00:00', 100), (1, 1, 3, FALSE, '2025-10-02 09:00:00', NULL, 50), (1, 1, 4, FALSE, NULL, NULL, 0), (6, 2, 5, FALSE, '2025-10-25 14:00:00', NULL, 75), (6, 2, 6, FALSE, NULL, NULL, 0), (4, 3, 9, TRUE, '2025-10-10 18:00:00', '2025-10-10 18:40:00', 100), (4, 3, 10, TRUE, '2025-10-11 19:00:00', '2025-10-11 19:35:00', 100), (4, 3, 11, FALSE, '2025-10-11 19:40:00', NULL, 10), (15, 1, 1, TRUE, '2025-09-15 11:00:00', '2025-09-15 11:15:00', 100), (15, 1, 2, FALSE, '2025-09-15 11:30:00', NULL, 90), (20, 3, 9, TRUE, '2025-10-29 08:00:00', '2025-10-29 08:40:00', 100), (20, 2, 5, FALSE, '2025-10-30 16:00:00', NULL, 20), (1, 2, 5, FALSE, '2025-10-20 17:00:00', NULL, 40);

-- 20) Inserir 10 Questões para Simulado (VERSÃO ULTRA-COMPACTA)
INSERT INTO questoes (enunciado, categoria, dificuldade, explicacao) VALUES 
('Qual é a velocidade máxima permitida em uma rodovia de pista dupla, onde não houver sinalização regulamentadora, para automóveis, caminhonetes e motocicletas?', 'legislacao', 'medio', 'A velocidade máxima é de 110 km/h, conforme o Código de Trânsito Brasileiro (CTB), para a maioria dos veículos leves.'), 
('A placa A-15a (Interseção em T) adverte o condutor sobre o quê?', 'sinalizacao', 'facil', 'A placa indica que a via em que se trafega se encontra com outra via que só permite o trânsito em uma direção.'), 
('O condutor defensivo, ao ser ultrapassado, deve:', 'direcao_defensiva', 'medio', 'O condutor deve manter a velocidade e facilitar a ultrapassagem, se possível, deslocando-se para a direita.'), 
('Em caso de acidente com vítima, a primeira atitude correta de um condutor é:', 'primeiros_socorros', 'facil', 'Garantir a segurança do local, sinalizando o acidente para evitar novas colisões.'), 
('O que é o fenômeno da aquaplanagem?', 'mecanica', 'medio', 'A perda de contato dos pneus com o solo devido a uma camada de água entre eles, resultando na perda de controle do veículo.'), 
('A má regulagem dos motores dos veículos provoca:', 'meio_ambiente', 'facil', 'Aumento da poluição atmosférica e sonora, contribuindo para o efeito estufa.'), 
('O que significa a luz amarela do semáforo?', 'sinalizacao', 'facil', 'Significa "atenção", indicando que o condutor deve parar, a menos que esteja em área de difícil e perigosa frenagem.'), 
('Dirigir com calçado que não se firme nos pés ou que comprometa a utilização dos pedais é uma infração de natureza:', 'legislacao', 'dificil', 'Média, sujeita à multa e retenção do veículo até a regularização. (Art. 252, IV do CTB)'), 
('Qual é a técnica de primeiros socorros utilizada para desobstruir as vias aéreas de uma vítima de engasgo?', 'primeiros_socorros', 'medio', 'Manobra de Heimlich.'), 
('Onde a responsabilidade por danos causados ao meio ambiente é aplicada, segundo a legislação de trânsito?', 'meio_ambiente', 'dificil', 'Na esfera civil, administrativa e penal, cumulativamente.');

-- 22) Inserir 40 Alternativas para as Questões (VERSÃO ULTRA-COMPACTA)
INSERT INTO alternativas (questao_id, texto, correta, letra) VALUES 
-- Questão 1: Velocidade Máxima
(1, '90 km/h.', FALSE, 'A'), (1, '100 km/h.', FALSE, 'B'), (1, '110 km/h.', TRUE, 'C'), (1, '120 km/h.', FALSE, 'D'), 
-- Questão 2: Placa A-15a (Interseção em T)
(2, 'Interseção em círculo.', FALSE, 'A'), (2, 'Confluência à direita.', FALSE, 'B'), (2, 'Fim de pista dupla.', FALSE, 'C'), (2, 'Interseção em T.', TRUE, 'D'), 
-- Questão 3: Condutor Defensivo ao ser ultrapassado
(3, 'Acelerar o veículo para evitar a ultrapassagem.', FALSE, 'A'), (3, 'Manter a velocidade e facilitar a ultrapassagem.', TRUE, 'B'), (3, 'Mudar de faixa imediatamente.', FALSE, 'C'), (3, 'Frear bruscamente.', FALSE, 'D'), 
-- Questão 4: Primeira atitude em acidente com vítima
(4, 'Tentar socorrer a vítima imediatamente.', FALSE, 'A'), (4, 'Acionar o resgate e aguardar.', FALSE, 'B'), (4, 'Garantir a segurança e sinalizar o local.', TRUE, 'C'), (4, 'Remover o veículo da via para desobstruir o tráfego.', FALSE, 'D'), 
-- Questão 5: Aquaplanagem
(5, 'O aumento de atrito entre o pneu e o asfalto.', FALSE, 'A'), (5, 'A perda de contato dos pneus com o solo devido à água.', TRUE, 'B'), (5, 'O travamento das rodas em frenagens bruscas.', FALSE, 'C'), (5, 'O desgaste irregular da banda de rodagem do pneu.', FALSE, 'D'), 
-- Questão 6: Má regulagem dos motores
(6, 'Redução do consumo de combustível.', FALSE, 'A'), (6, 'Aumento da poluição atmosférica e sonora.', TRUE, 'B'), (6, 'Melhora na potência do veículo.', FALSE, 'C'), (6, 'Apenas o aumento de ruído.', FALSE, 'D'), 
-- Questão 7: Luz amarela do semáforo
(7, 'Parada obrigatória, como o sinal vermelho.', FALSE, 'A'), (7, 'Passagem liberada, mas com atenção.', FALSE, 'B'), (7, 'Atenção, o condutor deve parar, se possível.', TRUE, 'C'), (7, 'Acelerar para evitar o sinal vermelho.', FALSE, 'D'), 
-- Questão 8: Dirigir com calçado inadequado (natureza da infração)
(8, 'Leve.', FALSE, 'A'), (8, 'Média.', TRUE, 'B'), (8, 'Grave.', FALSE, 'C'), (8, 'Gravíssima.', FALSE, 'D'), 
-- Questão 9: Técnica para engasgo
(9, 'Massagem Cardíaca.', FALSE, 'A'), (9, 'Respiração Boca a Boca.', FALSE, 'B'), (9, 'Manobra de Heimlich.', TRUE, 'C'), (9, 'Torniquete.', FALSE, 'D'), 
-- Questão 10: Responsabilidade por danos ao meio ambiente
(10, 'Apenas na esfera civil.', FALSE, 'A'), (10, 'Apenas na esfera penal.', FALSE, 'B'), (10, 'Apenas na esfera administrativa.', FALSE, 'C'), (10, 'Nas esferas civil, administrativa e penal.', TRUE, 'D');


-- 24) Inserir 8 Resultados de Simulados (VERSÃO ULTRA-COMPACTA)
INSERT INTO simulados (aluno_id, tipo, categoria, total_questoes, acertos, erros, percentual_acerto, tempo_total_segundos, data_realizacao) VALUES 
(1, 'completo', 'AB', 30, 25, 5, 83.33, 1500, '2025-10-15 10:00:00'),
(1, 'treino', 'sinalizacao', 10, 9, 1, 90.00, 300, '2025-10-16 14:30:00'),
(4, 'completo', 'B', 30, 18, 12, 60.00, 2000, '2025-10-20 09:00:00'), -- Reprovado (abaixo de 70%)
(6, 'categoria', 'direcao_defensiva', 20, 16, 4, 80.00, 950, '2025-10-22 18:00:00'),
(15, 'completo', 'A', 30, 28, 2, 93.33, 1200, '2025-10-25 11:30:00'),
(20, 'treino', 'primeiros_socorros', 5, 5, 0, 100.00, 150, '2025-10-27 19:15:00'),
(4, 'completo', 'B', 30, 22, 8, 73.33, 1650, '2025-10-28 10:30:00'), -- Aprovado
(1, 'completo', 'AB', 30, 30, 0, 100.00, 1050, '2025-10-31 15:45:00');


-- 26) Inserir 10 Respostas Detalhadas para o Simulado ID 1 (VERSÃO ULTRA-COMPACTA)
INSERT INTO respostas_simulado (simulado_id, questao_id, alternativa_escolhida, correta, tempo_resposta_segundos) VALUES 
-- ACERTOS (Simulado 1)
(1, 1, 3, TRUE, 15), (1, 2, 8, TRUE, 12), (1, 4, 15, TRUE, 22), (1, 5, 18, TRUE, 30), (1, 6, 22, TRUE, 18), 
(1, 7, 27, TRUE, 10), (1, 9, 35, TRUE, 25), (1, 10, 40, TRUE, 40), 
-- ERROS (Simulado 1)
(1, 3, 12, FALSE, 35), -- Aluno escolheu D (ID 12), a correta era B (ID 10)
(1, 8, 32, FALSE, 28); -- Aluno escolheu D (ID 32), a correta era B (ID 30)


-- 28) Inserir 8 Mensagens (VERSÃO ULTRA-COMPACTA)
INSERT INTO mensagens (remetente_id, destinatario_id, conteudo, lida, data_envio, tipo) VALUES 
(1, 3, 'Professor, consigo reagendar a aula de amanhã às 10h para a parte da tarde?', FALSE, '2025-10-31 08:30:00', 'texto'),
(3, 1, 'Claro, João. Verifiquei e posso te atender às 15h. Confirma?', TRUE, '2025-10-31 09:05:00', 'texto'),
(1, 3, 'Confirmo! Muito obrigado.', TRUE, '2025-10-31 09:10:00', 'texto'),
(29, 1, 'Seu agendamento (Aula ID: 15) foi reagendado com sucesso para 2025-11-04 às 15:00. [Link de confirmação]', FALSE, '2025-10-31 09:11:00', 'sistema'),
(1, 2, 'Bom dia, instrutora. Meu certificado do curso de Direção Defensiva já está disponível para download?', FALSE, '2025-10-31 10:00:00', 'texto'),
(2, 1, 'Olá! O sistema emitiu hoje. Você pode baixar na área do aluno ou use este link: [Link para PDF]', TRUE, '2025-10-31 11:30:00', 'texto'),
(29, 4, 'Parabéns! Você concluiu 100% dos módulos do curso Primeiros Socorros. O certificado foi emitido.', FALSE, '2025-10-31 12:00:00', 'sistema'),
(6, 29, 'Gostaria de saber sobre as novas turmas para a categoria D. Favor me retornar.', FALSE, '2025-10-31 16:00:00', 'texto');

-- 6) Conferir contagens
SELECT COUNT(*) AS total_usuarios FROM usuarios;
SELECT COUNT(*) AS total_alunos FROM alunos;
SELECT COUNT(*) AS total_instrutores FROM instrutores;

-- 7) Visualizar amostras
SELECT id, email, nome_completo FROM usuarios ORDER BY id LIMIT 30;
SELECT * FROM alunos ORDER BY usuario_id LIMIT 30;
SELECT * FROM instrutores ORDER BY usuario_id LIMIT 30;
