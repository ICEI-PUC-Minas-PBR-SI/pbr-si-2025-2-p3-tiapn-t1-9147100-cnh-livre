const mysql = require('mysql2/promise');

// Novas questões de qualidade para o banco de dados CNH
const novasQuestoes = [
    // LEGISLAÇÃO DE TRÂNSITO (adicional)
    {
        pergunta: "Qual é o documento que todo condutor deve portar obrigatoriamente ao dirigir?",
        opcoes: ["RG", "CPF", "CNH - Carteira Nacional de Habilitação", "Cartão de vacinação"],
        respostaCorreta: 2,
        categoria: "legislacao",
        explicacao: "De acordo com o CTB (Código de Trânsito Brasileiro), todo condutor deve portar obrigatoriamente a CNH (Carteira Nacional de Habilitação) ao dirigir.",
        dificuldade: "facil"
    },
    {
        pergunta: "Qual é a penalidade máxima prevista no CTB para dirigir embriagado?",
        opcoes: ["Multa simples", "Suspensão de 12 meses", "Perda da CNH por 12 meses e multa", "Apenas advertência"],
        respostaCorreta: 2,
        categoria: "legislacao",
        explicacao: "Dirigir sob influência de álcool é uma infração gravíssima que pode resultar em suspensão da CNH por 12 meses e multa pesada.",
        dificuldade: "medio"
    },
    {
        pergunta: "Em quanto tempo um condutor deve renovar sua CNH?",
        opcoes: ["A cada ano", "A cada 3 anos", "A cada 5 anos para maiores de 65 anos e 10 anos para menores", "Nunca precisa renovar"],
        respostaCorreta: 2,
        categoria: "legislacao",
        explicacao: "A CNH tem validade de 10 anos para maiores de 65 anos e 5 anos para menores de 65 anos.",
        dificuldade: "facil"
    },
    {
        pergunta: "Qual é a velocidade máxima permitida em vias urbanas (não arteriais)?",
        opcoes: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"],
        respostaCorreta: 1,
        categoria: "legislacao",
        explicacao: "Em vias urbanas não arteriais, a velocidade máxima é 40 km/h, conforme o CTB.",
        dificuldade: "facil"
    },
    {
        pergunta: "O que é infração de trânsito?",
        opcoes: ["Qualquer estacionamento irregular", "Violação das normas de trânsito estabelecidas", "Dirigir acima de 80 km/h", "Não usar cinto de segurança"],
        respostaCorreta: 1,
        categoria: "legislacao",
        explicacao: "Infração de trânsito é a violação de qualquer norma de trânsito estabelecida pelo CTB ou por regulamentações específicas.",
        dificuldade: "medio"
    },

    // SINALIZAÇÃO (adicional)
    {
        pergunta: "O que significa uma placa triangular vermelha?",
        opcoes: ["Proibição", "Advertência/Perigo", "Informação", "Obrigação"],
        respostaCorreta: 1,
        categoria: "sinalizacao",
        explicacao: "Placas triangulares com borda vermelha indicam advertência de perigo à frente.",
        dificuldade: "facil"
    },
    {
        pergunta: "Qual é o significado da placa circular com fundo vermelho e barra diagonal branca?",
        opcoes: ["Proibido entrar", "Proibido estacionar", "Permitido entrar", "Parada obrigatória"],
        respostaCorreta: 0,
        categoria: "sinalizacao",
        explicacao: "A placa circular com fundo vermelho e barra diagonal branca (C-1) significa 'Proibido Entrar'.",
        dificuldade: "medio"
    },
    {
        pergunta: "O que indica a placa quadrada ou retangular com fundo azul?",
        opcoes: ["Proibição", "Informação ou orientação", "Advertência", "Obrigação"],
        respostaCorreta: 1,
        categoria: "sinalizacao",
        explicacao: "Placas quadradas ou retangulares com fundo azul indicam informações ou orientações ao condutor.",
        dificuldade: "facil"
    },
    {
        pergunta: "O que significa uma placa com um X branco em fundo vermelho?",
        opcoes: ["Via expressa", "Cruzamento perigoso", "Fim de proibição", "Prioridade"],
        respostaCorreta: 1,
        categoria: "sinalizacao",
        explicacao: "A placa com X branco em fundo vermelho (A-5) adverte sobre cruzamento ou interseção perigosa.",
        dificuldade: "medio"
    },
    {
        pergunta: "O que indica uma seta branca em uma via?",
        opcoes: ["Direção a seguir", "Parada obrigatória", "Proibido passar", "Velocidade máxima"],
        respostaCorreta: 0,
        categoria: "sinalizacao",
        explicacao: "Setas brancas na via indicam a direção que o condutor deve seguir.",
        dificuldade: "facil"
    },

    // DIREÇÃO DEFENSIVA (adicional)
    {
        pergunta: "O que é direção defensiva?",
        opcoes: ["Dirigir agressivamente", "Antecipar perigos e adotar atitudes seguras", "Dirigir rápido", "Não respeitar outros motoristas"],
        respostaCorreta: 1,
        categoria: "direcao_defensiva",
        explicacao: "Direção defensiva é a prática de antecipar possíveis perigos e adotar atitudes preventivas para evitar acidentes.",
        dificuldade: "facil"
    },
    {
        pergunta: "Qual é a distância mínima de seguimento em via urbana a 50 km/h?",
        opcoes: ["10 metros", "20 metros", "30 metros", "50 metros"],
        respostaCorreta: 1,
        categoria: "direcao_defensiva",
        explicacao: "A distância de seguimento mínima em via urbana deve ser de aproximadamente 2 segundos do veículo à frente, o que corresponde a cerca de 20 metros a 50 km/h.",
        dificuldade: "medio"
    },
    {
        pergunta: "O que deve fazer um condutor ao notar que seus pneus estão desgastados?",
        opcoes: ["Continuar dirigindo até estragar", "Dirigir mais devagar", "Trocar os pneus imediatamente", "Encher mais ar nos pneus"],
        respostaCorreta: 2,
        categoria: "direcao_defensiva",
        explicacao: "Pneus desgastados comprometem a aderência e o frenagem. O condutor deve trocá-los imediatamente por razões de segurança.",
        dificuldade: "facil"
    },
    {
        pergunta: "Qual é o procedimento correto ao dirigir com chuva?",
        opcoes: ["Aumentar velocidade", "Diminuir velocidade e aumentar distância entre veículos", "Ligar farol baixo", "Buzinar mais"],
        respostaCorreta: 1,
        categoria: "direcao_defensiva",
        explicacao: "Em chuva, deve-se reduzir a velocidade, aumentar a distância de seguimento e ter cuidado com aquaplanagem.",
        dificuldade: "medio"
    },
    {
        pergunta: "O que fazer se o freio do veículo falhar?",
        opcoes: ["Saltar do veículo", "Usar o freio de mão gradualmente e procurar uma superfície morna", "Pisar fundo no acelerador", "Sair da estrada imediatamente"],
        respostaCorreta: 1,
        categoria: "direcao_defensiva",
        explicacao: "Se o freio falhar, o condutor deve usar o freio de mão gradualmente, procurar uma superfície ascendente ou se chocar com algo que o freie.",
        dificuldade: "dificil"
    },

    // PRIMEIROS SOCORROS (adicional)
    {
        pergunta: "Qual é o número de emergência para chamar a ambulância no Brasil?",
        opcoes: ["190", "192", "193", "194"],
        respostaCorreta: 1,
        categoria: "primeiros_socorros",
        explicacao: "O número 192 é o código da central de emergência médica (SAMU) no Brasil.",
        dificuldade: "facil"
    },
    {
        pergunta: "Em caso de acidente com ferimento leve, qual é a primeira atitude?",
        opcoes: ["Mover a vítima", "Lavar a ferida com água limpa e cobrir com gaze", "Aplicar torniquete", "Colocar gelo diretamente"],
        respostaCorreta: 1,
        categoria: "primeiros_socorros",
        explicacao: "Para ferimentos leves, deve-se lavar com água limpa, secar e cobrir com gaze ou banda para evitar infecção.",
        dificuldade: "facil"
    },
    {
        pergunta: "Como reconhecer uma vítima em choque?",
        opcoes: ["Dormindo profundamente", "Pele pálida, pulso fraco, respiração acelerada", "Rosto corado", "Muito agitada e gritando"],
        respostaCorreta: 1,
        categoria: "primeiros_socorros",
        explicacao: "Sinais de choque incluem pele pálida/fria, pulso fraco e rápido, respiração acelerada, e possível perda de consciência.",
        dificuldade: "medio"
    },
    {
        pergunta: "O que fazer se encontrar uma vítima inconsciente?",
        opcoes: ["Deixar em repouso e ir embora", "Verificar respiração, colocar em posição lateral de segurança e chamar socorro", "Dar água", "Tentar movimentá-la bruscamente"],
        respostaCorreta: 1,
        categoria: "primeiros_socorros",
        explicacao: "Deve-se verificar respiração, colocar em posição lateral de segurança para evitar asfixia e chamar socorro imediatamente.",
        dificuldade: "medio"
    },
    {
        pergunta: "Qual é a técnica correta de reanimação cardiopulmonar (RCP)?",
        opcoes: ["Apenas massagem cardíaca", "Apenas respiração boca a boca", "30 compressões torácicas seguidas de 2 respirações", "Não existe técnica correta"],
        respostaCorreta: 2,
        categoria: "primeiros_socorros",
        explicacao: "A RCP moderna recomenda 30 compressões torácicas seguidas de 2 respirações, repetindo este ciclo até chegada do socorro.",
        dificuldade: "dificil"
    },

    // MEIO AMBIENTE E CIDADANIA (adicional)
    {
        pergunta: "Qual é o principal objetivo de reduzir emissões de poluentes do trânsito?",
        opcoes: ["Economizar combustível", "Proteger a saúde pública e o ambiente", "Aumentar potência do motor", "Reduzir ruído apenas"],
        respostaCorreta: 1,
        categoria: "meio_ambiente",
        explicacao: "Reduzir emissões de poluentes é fundamental para proteger a saúde das pessoas e preservar o meio ambiente.",
        dificuldade: "facil"
    },
    {
        pergunta: "O que é poluição sonora causada por veículos?",
        opcoes: ["Som do motor funcionando", "Ruído excessivo causado por buzina e escape alterado", "Som da via", "Ruído do ar-condicionado"],
        respostaCorreta: 1,
        categoria: "meio_ambiente",
        explicacao: "Poluição sonora é o ruído excessivo causado principalmente por buzina inadequada e escape alterado.",
        dificuldade: "facil"
    },
    {
        pergunta: "Qual é a importância de manter o veículo com revisão em dia?",
        opcoes: ["Apenas economia", "Reduzir emissões poluentes e garantir segurança", "Aumentar velocidade", "Apenas estética"],
        respostaCorreta: 1,
        categoria: "meio_ambiente",
        explicacao: "Manutenção adequada do veículo reduz emissões de poluentes e garante segurança para o condutor e terceiros.",
        dificuldade: "medio"
    },
    {
        pergunta: "Como o condutor pode contribuir para a redução de poluição?",
        opcoes: ["Dirigindo mais rápido", "Manutenção regular, direção eficiente, e uso de transportes alternativos quando possível", "Aumentar uso de ar-condicionado", "Não importa"],
        respostaCorreta: 1,
        categoria: "meio_ambiente",
        explicacao: "O condutor pode contribuir através de manutenção regular, direção eficiente (sem acelerações bruscas) e uso de alternativas como transporte público.",
        dificuldade: "medio"
    },
    {
        pergunta: "O que significa 'economia defensiva'?",
        opcoes: ["Gastar menos dinheiro", "Dirigir seguro para economizar combustível e reduzir poluição", "Não pagar impostos", "Dirigir devagar sempre"],
        respostaCorreta: 1,
        categoria: "meio_ambiente",
        explicacao: "Economia defensiva é dirigir com segurança, evitando acelerações e frenagens bruscas, reduzindo consumo de combustível.",
        dificuldade: "medio"
    },

    // MECÂNICA BÁSICA (adicional)
    {
        pergunta: "Para que serve o sistema de freios de um veículo?",
        opcoes: ["Acelerar o veículo", "Desacelerar e parar o veículo de forma controlada", "Virar o volante", "Aumentar velocidade"],
        respostaCorreta: 1,
        categoria: "mecanica",
        explicacao: "O sistema de freios é responsável por desacelerar e parar o veículo de forma controlada e segura.",
        dificuldade: "facil"
    },
    {
        pergunta: "O que indica uma luz de aviso vermelha no painel?",
        opcoes: ["Manutenção em breve", "Problema crítico que requer atenção imediata", "Apenas informação", "Não significa nada"],
        respostaCorreta: 1,
        categoria: "mecanica",
        explicacao: "Luz vermelha indica problema crítico. O condutor deve parar o veículo e verificar imediatamente.",
        dificuldade: "facil"
    },
    {
        pergunta: "Qual é a função do radiador do veículo?",
        opcoes: ["Gerar calor", "Resfriar o motor mantendo temperatura ideal", "Armazenar combustível", "Filtrar ar"],
        respostaCorreta: 1,
        categoria: "mecanica",
        explicacao: "O radiador dissipa o calor gerado pelo motor, mantendo a temperatura de funcionamento ideal.",
        dificuldade: "medio"
    },
    {
        pergunta: "O que fazer se o motor superaqueceu?",
        opcoes: ["Continuar dirigindo", "Parar em local seguro e desligar o motor", "Abrir o radiador imediatamente", "Acelerar mais"],
        respostaCorreta: 1,
        categoria: "mecanica",
        explicacao: "Se o motor superaqueceu, deve-se parar em local seguro, desligar o motor e deixar esfriar antes de verificar.",
        dificuldade: "medio"
    },
    {
        pergunta: "Com que frequência devemos trocar o óleo do motor?",
        opcoes: ["A cada 5.000 km", "A cada 10.000 km ou conforme recomendação do fabricante", "Nunca", "A cada 1.000 km"],
        respostaCorreta: 1,
        categoria: "mecanica",
        explicacao: "A troca de óleo deve ser feita a cada 10.000 km em média, ou conforme recomendação específica do fabricante do veículo.",
        dificuldade: "facil"
    }
];

(async () => {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'cnhlivre1234*',
        database: 'cnh_livre'
    });

    const conn = await pool.getConnection();

    try {
        console.log(`Adicionando ${novasQuestoes.length} novas questões...\n`);
        
        let adicionadas = 0;
        
        for (const q of novasQuestoes) {
            const opcoesJSON = JSON.stringify(q.opcoes);
            
            const [result] = await conn.query(`
                INSERT INTO questoes (enunciado, pergunta, opcoes_array, resposta_correta, categoria, explicacao, dificuldade, ativa)
                VALUES (?, ?, ?, ?, ?, ?, ?, 1)
            `, [q.pergunta, q.pergunta, opcoesJSON, q.respostaCorreta, q.categoria, q.explicacao, q.dificuldade]);
            
            if (result.affectedRows > 0) {
                adicionadas++;
            }
        }
        
        console.log(`✅ ${adicionadas} novas questões adicionadas com sucesso!\n`);
        
        // Mostrar estatísticas
        const [total] = await conn.query('SELECT COUNT(*) as total FROM questoes');
        console.log(`Total de questões no banco: ${total[0].total}`);
        
        const [porCategoria] = await conn.query(`
            SELECT categoria, COUNT(*) as qtd FROM questoes 
            GROUP BY categoria ORDER BY categoria ASC
        `);
        
        console.log('\nDistribuição por categoria:');
        porCategoria.forEach(c => {
            console.log(`  • ${c.categoria.padEnd(20)} ${c.qtd.toString().padStart(2)} questões`);
        });
        
        const [porDificuldade] = await conn.query(`
            SELECT dificuldade, COUNT(*) as qtd FROM questoes 
            GROUP BY dificuldade ORDER BY dificuldade ASC
        `);
        
        console.log('\nDistribuição por dificuldade:');
        porDificuldade.forEach(d => {
            console.log(`  • ${d.dificuldade.padEnd(20)} ${d.qtd.toString().padStart(2)} questões`);
        });
        
    } catch (err) {
        console.error('❌ Erro:', err.message);
    } finally {
        conn.release();
        pool.end();
    }
})();
