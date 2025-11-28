const questoesSimulado = [
    {
        id: 1,
        categoria: "Legislação de Trânsito",
        pergunta: "Qual a velocidade máxima permitida em vias urbanas arteriais, salvo sinalização em contrário?",
        opcoes: ["30 km/h", "40 km/h", "60 km/h", "80 km/h"],
        respostaCorreta: 2, // 60 km/h
        explicacao: "De acordo com o CTB (Código de Trânsito Brasileiro), a velocidade máxima em vias arteriais é de 60 km/h, a menos que haja sinalização indicando o contrário."
    },
    {
        id: 2,
        categoria: "Direção Defensiva",
        pergunta: "O que é a 'distância de seguimento'?",
        opcoes: ["Distância entre o veículo e o acostamento.", "Distância de frenagem.", "Distância entre o veículo e o que segue à frente.", "Distância de reação."],
        respostaCorreta: 2, // Distância entre o veículo e o que segue à frente.
        explicacao: "Distância de seguimento é a distância segura que o condutor deve manter do veículo à sua frente, permitindo tempo de reação e frenagem adequados."
    },
    {
        id: 3,
        categoria: "Primeiros Socorros",
        pergunta: "Em caso de acidente com vítima, qual a primeira atitude a ser tomada pelo condutor?",
        opcoes: ["Remover a vítima do veículo.", "Sinalizar o local e chamar o socorro.", "Oferecer água à vítima.", "Verificar os documentos da vítima."],
        respostaCorreta: 1, // Sinalizar o local e chamar o socorro.
        explicacao: "A prioridade é garantir a segurança do local para evitar novos acidentes e acionar o socorro especializado (SAMU 192 ou Bombeiros 193)."
    },
    {
        id: 4,
        categoria: "Meio Ambiente e Cidadania",
        pergunta: "Qual o principal poluente atmosférico emitido pelos veículos com motor a combustão?",
        opcoes: ["Vapor d'água", "Oxigênio", "Monóxido de Carbono (CO)", "Nitrogênio"],
        respostaCorreta: 2, // Monóxido de Carbono (CO)
        explicacao: "O Monóxido de Carbono (CO) é um gás incolor e inodoro, altamente tóxico, resultante da queima incompleta de combustível."
    },
    {
        id: 5,
        categoria: "Placas de Sinalização",
        pergunta: "A placa R-1 indica:",
        opcoes: ["Dê a preferência", "Parada obrigatória", "Sentido proibido", "Proibido estacionar"],
        respostaCorreta: 1, // Parada obrigatória
        explicacao: "A placa R-1 (Regulamentação) é a placa de 'Parada Obrigatória'."
    },
    {
        id: 6,
        categoria: "Mecânica Básica",
        pergunta: "Qual o componente responsável por armazenar a energia elétrica do veículo?",
        opcoes: ["Alternador", "Vela de ignição", "Bateria", "Motor de partida"],
        respostaCorreta: 2, // Bateria
        explicacao: "A bateria armazena a energia elétrica necessária para dar a partida no motor e alimentar os sistemas elétricos quando o motor está desligado."
    },
    {
        id: 7,
        categoria: "Legislação de Trânsito",
        pergunta: "Qual o documento de porte obrigatório que comprova a propriedade do veículo?",
        opcoes: ["CRV (Certificado de Registro do Veículo)", "CNH (Carteira Nacional de Habilitação)", "CRLV (Certificado de Registro e Licenciamento do Veículo)", "Comprovante de residência"],
        respostaCorreta: 2, // CRLV (Certificado de Registro e Licenciamento do Veículo)
        explicacao: "O CRLV (Certificado de Registro e Licenciamento do Veículo) é o documento de porte obrigatório que comprova o registro e o licenciamento anual do veículo."
    },
    {
        id: 8,
        categoria: "Direção Defensiva",
        pergunta: "O que significa o termo 'aquaplanagem' ou 'hidroplanagem'?",
        opcoes: ["O carro desliza em óleo na pista.", "Perda de contato do pneu com o solo devido a uma camada de água.", "O carro desliza em areia na pista.", "O carro perde o freio."],
        respostaCorreta: 1, // Perda de contato do pneu com o solo devido a uma camada de água.
        explicacao: "Aquaplanagem é a perda de contato dos pneus com a pista devido a uma camada de água, fazendo o veículo deslizar e o motorista perder o controle."
    },
    {
        id: 9,
        categoria: "Primeiros Socorros",
        pergunta: "Qual a manobra correta para desobstruir as vias aéreas de uma vítima engasgada (consciente)?",
        opcoes: ["Manobra de Heimlich", "Massagem cardíaca", "Respiração boca a boca", "Posição lateral de segurança"],
        respostaCorreta: 0, // Manobra de Heimlich
        explicacao: "A Manobra de Heimlich é a técnica de primeiros socorros utilizada para desengasgar uma pessoa consciente."
    },
    {
        id: 10,
        categoria: "Meio Ambiente e Cidadania",
        pergunta: "O uso de buzina em áreas urbanas é permitido:",
        opcoes: ["Em qualquer situação, para alertar outros motoristas.", "Apenas entre 6h e 22h, em toques breves.", "Apenas para advertir pedestres.", "É proibido em qualquer situação."],
        respostaCorreta: 1, // Apenas entre 6h e 22h, em toques breves.
        explicacao: "O CTB permite o uso da buzina em toques breves, para advertir outros condutores ou pedestres, entre 6h e 22h. É proibido em áreas e horários não permitidos pela sinalização."
    }
];

window.questoesSimulado = questoesSimulado;
