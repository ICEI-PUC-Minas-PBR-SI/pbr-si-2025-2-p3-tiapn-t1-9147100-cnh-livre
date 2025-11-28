const mysql = require('mysql2/promise');

// Últimas 9 questões para atingir 100
const ultimasQuestoes = [
    {
        pergunta: "Qual é a importância de fazer aquecimento do motor antes de dirigir em dias frios?",
        opcoes: ["Nenhuma", "Permitir que o óleo lubrificante atinja temperatura ideal", "Economizar combustível", "Apenas hábito"],
        respostaCorreta: 1,
        categoria: "mecanica",
        explicacao: "Aquecimento permite viscosidade correta do óleo para lubrificação adequada.",
        dificuldade: "facil"
    },
    {
        pergunta: "O que fazer se perder o poder de direção hidráulica?",
        opcoes: ["Continuar normalmente", "Parar em local seguro com cautela e procurar mecânico", "Acelerar", "Ignorar"],
        respostaCorreta: 1,
        categoria: "direcao_defensiva",
        explicacao: "Sem direção hidráulica, o volante fica muito duro. Deve-se parar com segurança.",
        dificuldade: "medio"
    },
    {
        pergunta: "Como proceder ao notar que o veículo 'puxa' para um lado?",
        opcoes: ["Ignorar", "Compensar girando o volante constantemente", "Levar para revisão de alinhamento", "Nada a fazer"],
        respostaCorreta: 2,
        categoria: "mecanica",
        explicacao: "Veículo puxando para um lado indica desalinhamento que deve ser corrigido.",
        dificuldade: "facil"
    },
    {
        pergunta: "O que significa uma luz amarela piscante no painel?",
        opcoes: ["Perigo crítico", "Aviso - manutenção necessária em breve", "Nada importante", "Sistema ok"],
        respostaCorreta: 1,
        categoria: "mecanica",
        explicacao: "Luz amarela piscante indica aviso de manutenção necessária.",
        dificuldade: "facil"
    },
    {
        pergunta: "Como proceder em caso de neblina muito densa?",
        opcoes: ["Aumentar velocidade para sair da neblina", "Reduzir velocidade, ligar farol baixo, buzina e aumentar distância", "Desligar farol", "Continuar normalmente"],
        respostaCorreta: 1,
        categoria: "direcao_defensiva",
        explicacao: "Em neblina densa, reduz-se velocidade drasticamente e aumenta-se vigilância.",
        dificuldade: "medio"
    },
    {
        pergunta: "Qual é a função do conversor catalítico?",
        opcoes: ["Aumentar potência", "Converter gases tóxicos em menos poluentes", "Arrefecer motor", "Nada importante"],
        respostaCorreta: 1,
        categoria: "meio_ambiente",
        explicacao: "Conversor catalítico transforma gases tóxicos em substâncias menos prejudiciais.",
        dificuldade: "medio"
    },
    {
        pergunta: "O que fazer se presenciar um acidente com feridos?",
        opcoes: ["Passar direto", "Parar em local seguro, chamar socorro e prestar primeiros socorros se possível", "Tirar fotos", "Apenas informar depois"],
        respostaCorreta: 1,
        categoria: "primeiros_socorros",
        explicacao: "Deve-se chamar socorro imediatamente e prestar ajuda se seguro.",
        dificuldade: "facil"
    },
    {
        pergunta: "Qual é a penalidade para transportar passageiros em local perigoso do veículo?",
        opcoes: ["Nenhuma", "Multa média e adição de pontos", "Apenas advertência", "Sem importância"],
        respostaCorreta: 1,
        categoria: "legislacao",
        explicacao: "Transportar passageiros em local inseguro é infração que gera multa e pontos.",
        dificuldade: "facil"
    },
    {
        pergunta: "O que indica uma placa retangular com figura de pedestres?",
        opcoes: ["Proibição", "Zona com pedestres - reduzir velocidade", "Permitido parar", "Sem importância"],
        respostaCorreta: 1,
        categoria: "sinalizacao",
        explicacao: "Placa indica zona com circulação de pedestres - atenção redobrada necessária.",
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
        console.log(`\nAdicionando últimas ${ultimasQuestoes.length} questões para atingir 100...\n`);
        
        let adicionadas = 0;
        
        for (const q of ultimasQuestoes) {
            const opcoesJSON = JSON.stringify(q.opcoes);
            
            const [result] = await conn.query(`
                INSERT INTO questoes (enunciado, pergunta, opcoes_array, resposta_correta, categoria, explicacao, dificuldade, ativa)
                VALUES (?, ?, ?, ?, ?, ?, ?, 1)
            `, [q.pergunta, q.pergunta, opcoesJSON, q.respostaCorreta, q.categoria, q.explicacao, q.dificuldade]);
            
            if (result.affectedRows > 0) {
                adicionadas++;
            }
        }
        
        console.log(`✅ ${adicionadas} questões adicionadas!\n`);
        
        // Mostrar estatísticas finais
        const [total] = await conn.query('SELECT COUNT(*) as total FROM questoes');
        console.log(`🎉 TOTAL FINAL: ${total[0].total} questões no banco!\n`);
        
        const [porCategoria] = await conn.query(`
            SELECT categoria, COUNT(*) as qtd FROM questoes 
            GROUP BY categoria ORDER BY categoria ASC
        `);
        
        console.log('📂 Distribuição por categoria:');
        porCategoria.forEach(c => {
            console.log(`   ${c.categoria.padEnd(20)} ${String(c.qtd).padStart(3)} questões`);
        });
        
        const [porDificuldade] = await conn.query(`
            SELECT dificuldade, COUNT(*) as qtd FROM questoes 
            GROUP BY dificuldade ORDER BY 
              CASE WHEN dificuldade='facil' THEN 1
                   WHEN dificuldade='medio' THEN 2
                   WHEN dificuldade='dificil' THEN 3 END ASC
        `);
        
        console.log('\n⭐ Distribuição por dificuldade:');
        porDificuldade.forEach(d => {
            const emoji = d.dificuldade === 'facil' ? '🟢' : d.dificuldade === 'medio' ? '🟡' : '🔴';
            console.log(`   ${emoji} ${d.dificuldade.padEnd(15)} ${String(d.qtd).padStart(3)} questões`);
        });
        
        console.log('\n✨ Banco de dados de questões completamente enriquecido!');
        console.log('🚀 Simulados agora com muito mais conteúdo de qualidade!\n');
        
    } catch (err) {
        console.error('❌ Erro:', err.message);
    } finally {
        conn.release();
        pool.end();
    }
})();
