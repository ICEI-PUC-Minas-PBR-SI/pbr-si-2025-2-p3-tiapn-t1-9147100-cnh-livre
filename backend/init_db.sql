-- Cria o banco de dados
CREATE DATABASE IF NOT EXISTS cnh_livre;
USE cnh_livre;

-- Tabela de Instrutores
CREATE TABLE IF NOT EXISTS instrutores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    perfil VARCHAR(50) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    bio TEXT,
    preco DECIMAL(10, 2),
    local VARCHAR(100),
    categorias VARCHAR(50), -- Armazenado como string separada por vírgulas para simplificar
    avaliacao DECIMAL(2, 1),
    foto VARCHAR(255),
    verificado BOOLEAN DEFAULT FALSE,
    aceitaSocial BOOLEAN DEFAULT FALSE
);

-- Tabela de Questões do Simulado
CREATE TABLE IF NOT EXISTS questoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(100) NOT NULL,
    pergunta TEXT NOT NULL,
    opcoes TEXT NOT NULL, -- Armazenado como JSON string
    respostaCorreta INT NOT NULL,
    explicacao TEXT
);

-- Inserção de dados de Instrutores
INSERT INTO instrutores (perfil, nome, email, senha, cpf, bio, preco, local, categorias, avaliacao, foto, verificado, aceitaSocial) VALUES
('instrutor', 'João Silva', 'joao@demo', '123', '000.000.000-00', 'Instrutor credenciado com 10 anos de experiência.', 70.00, 'Belo Horizonte/MG', 'B', 4.7, 'https://i.pravatar.cc/150?img=12', TRUE, TRUE),
('instrutor', 'Carla Nunes', 'carla@demo', '123', '111.111.111-11', 'Especialista em Categoria A (motos).', 60.00, 'Contagem/MG', 'A', 4.6, 'https://i.pravatar.cc/150?img=45', TRUE, FALSE),
('instrutor', 'Marcos Leal', 'marcos@demo', '123', '222.222.222-22', 'Categoria C e D para profissionais.', 95.00, 'Betim/MG', 'C,D', 4.9, 'https://i.pravatar.cc/150?img=31', TRUE, TRUE);

-- Inserção de dados de Questões
INSERT INTO questoes (categoria, pergunta, opcoes, respostaCorreta, explicacao) VALUES
('Legislação de Trânsito', 'Qual a velocidade máxima permitida em vias urbanas arteriais, salvo sinalização em contrário?', '["30 km/h", "40 km/h", "60 km/h", "80 km/h"]', 2, 'De acordo com o CTB (Código de Trânsito Brasileiro), a velocidade máxima em vias arteriais é de 60 km/h, a menos que haja sinalização indicando o contrário.'),
('Direção Defensiva', 'O que é a "distância de seguimento"?', '["Distância entre o veículo e o acostamento.", "Distância de frenagem.", "Distância entre o veículo e o que segue à frente.", "Distância de reação."]', 2, 'Distância de seguimento é a distância segura que o condutor deve manter do veículo à sua frente, permitindo tempo de reação e frenagem adequados.'),
('Primeiros Socorros', 'Em caso de acidente com vítima, qual a primeira atitude a ser tomada pelo condutor?', '["Remover a vítima do veículo.", "Sinalizar o local e chamar o socorro.", "Oferecer água à vítima.", "Verificar os documentos da vítima."]', 1, 'A prioridade é garantir a segurança do local para evitar novos acidentes e acionar o socorro especializado (SAMU 192 ou Bombeiros 193).'),
('Meio Ambiente e Cidadania', 'Qual o principal poluente atmosférico emitido pelos veículos com motor a combustão?', '["Vapor d\'água", "Oxigênio", "Monóxido de Carbono (CO)", "Nitrogênio"]', 2, 'O Monóxido de Carbono (CO) é um gás incolor e inodoro, altamente tóxico, resultante da queima incompleta de combustível.'),
('Placas de Sinalização', 'A placa R-1 indica:', '["Dê a preferência", "Parada obrigatória", "Sentido proibido", "Proibido estacionar"]', 1, 'A placa R-1 (Regulamentação) é a placa de "Parada Obrigatória".'),
('Mecânica Básica', 'Qual o componente responsável por armazenar a energia elétrica do veículo?', '["Alternador", "Vela de ignição", "Bateria", "Motor de partida"]', 2, 'A bateria armazena a energia elétrica necessária para dar a partida no motor e alimentar os sistemas elétricos quando o motor está desligado.'),
('Legislação de Trânsito', 'Qual o documento de porte obrigatório que comprova a propriedade do veículo?', '["CRV (Certificado de Registro do Veículo)", "CNH (Carteira Nacional de Habilitação)", "CRLV (Certificado de Registro e Licenciamento do Veículo)", "Comprovante de residência"]', 2, 'O CRLV (Certificado de Registro e Licenciamento do Veículo) é o documento de porte obrigatório que comprova o registro e o licenciamento anual do veículo.'),
('Direção Defensiva', 'O que significa o termo "aquaplanagem" ou "hidroplanagem"?', '["O carro desliza em óleo na pista.", "Perda de contato do pneu com o solo devido a uma camada de água.", "O carro desliza em areia na pista.", "O carro perde o freio."]', 1, 'Aquaplanagem é a perda de contato dos pneus com a pista devido a uma camada de água, fazendo o veículo deslizar e o motorista perder o controle.'),
('Primeiros Socorros', 'Qual a manobra correta para desobstruir as vias aéreas de uma vítima engasgada (consciente)?', '["Manobra de Heimlich", "Massagem cardíaca", "Respiração boca a boca", "Posição lateral de segurança"]', 0, 'A Manobra de Heimlich é a técnica de primeiros socorros utilizada para desengasgar uma pessoa consciente.'),
('Meio Ambiente e Cidadania', 'O uso de buzina em áreas urbanas é permitido:', '["Em qualquer situação, para alertar outros motoristas.", "Apenas entre 6h e 22h, em toques breves.", "Apenas para advertir pedestres.", "É proibido em qualquer situação."]', 1, 'O CTB permite o uso da buzina em toques breves, para advertir outros condutores ou pedestres, entre 6h e 22h. É proibido em áreas e horários não permitidos pela sinalização.');
