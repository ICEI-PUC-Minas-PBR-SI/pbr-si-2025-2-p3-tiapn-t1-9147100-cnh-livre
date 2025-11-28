const mysql = require('mysql2/promise');

// Questões com opções (baseado no arquivo questoes.js original)
const questoesComOpcoes = [
    {
        id: 1,
        opcoes: ["80 km/h", "90 km/h", "110 km/h", "120 km/h"],
        respostaCorreta: 2 // 110 km/h é a resposta correta
    },
    {
        id: 2,
        opcoes: ["Interseção em Y", "Interseção em T", "Semáforo", "Parada obrigatória"],
        respostaCorreta: 1 // Interseção em T
    },
    {
        id: 3,
        opcoes: ["Aumentar a velocidade", "Diminuir a velocidade", "Manter a velocidade", "Frear bruscamente"],
        respostaCorreta: 1 // Diminuir a velocidade
    },
    {
        id: 4,
        opcoes: ["Sinalizar o local e chamar socorro", "Remover a vítima do veículo", "Oferecer água", "Verificar documentos"],
        respostaCorreta: 0 // Sinalizar e chamar socorro
    },
    {
        id: 5,
        opcoes: ["CO2", "CO", "NO2", "N2"],
        respostaCorreta: 1 // Monóxido de Carbono (CO)
    },
    {
        id: 6,
        opcoes: ["Dê a preferência", "Parada obrigatória", "Sentido proibido", "Proibido estacionar"],
        respostaCorreta: 1 // Parada obrigatória
    },
    {
        id: 7,
        opcoes: ["CRV", "CNH", "CRLV", "Comprovante de residência"],
        respostaCorreta: 2 // CRLV
    },
    {
        id: 8,
        opcoes: ["Desliza em óleo", "Perda de contato do pneu com o solo", "Desliza em areia", "Perde o freio"],
        respostaCorreta: 1 // Perda de contato do pneu
    },
    {
        id: 9,
        opcoes: ["Manobra de Heimlich", "Massagem cardíaca", "Respiração boca a boca", "Posição lateral de segurança"],
        respostaCorreta: 0 // Manobra de Heimlich
    },
    {
        id: 10,
        opcoes: ["Em qualquer situação", "Apenas entre 6h e 22h", "Apenas para alertar pedestres", "É proibido"],
        respostaCorreta: 1 // Apenas entre 6h e 22h
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
        console.log('Populando opções nas questões...\n');
        
        let atualizadas = 0;
        
        for (const q of questoesComOpcoes) {
            const opcoesJSON = JSON.stringify(q.opcoes);
            
            const [result] = await conn.query(`
                UPDATE questoes 
                SET opcoes_array = ?, resposta_correta = ?
                WHERE id = ?
            `, [opcoesJSON, q.respostaCorreta, q.id]);
            
            if (result.affectedRows > 0) {
                atualizadas++;
                console.log(`  ✓ ID ${q.id}: ${q.opcoes.length} opções + resposta ${q.respostaCorreta}`);
            }
        }
        
        console.log(`\n✅ ${atualizadas} questões atualizadas com sucesso!`);
        
        // Verificar dados
        console.log('\nAmostra de questão com opções:');
        const [sample] = await conn.query(`
            SELECT id, pergunta, opcoes_array, resposta_correta FROM questoes LIMIT 1
        `);
        
        if (sample.length > 0) {
            const q = sample[0];
            console.log(`\nID: ${q.id}`);
            console.log(`Pergunta: ${q.pergunta}`);
            console.log(`Opções:`, q.opcoes_array);
            console.log(`Resposta Correta: ${q.resposta_correta} (${q.opcoes_array[q.resposta_correta]})`);
        }
        
    } catch (err) {
        console.error('❌ Erro:', err.message);
    } finally {
        conn.release();
        pool.end();
    }
})();
