const mysql = require('mysql2/promise');

(async () => {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'cnhlivre1234*',
        database: 'cnh_livre'
    });

    const conn = await pool.getConnection();

    try {
        console.log('1. Atualizando estrutura da tabela questoes...\n');
        
        // Adicionar colunas faltantes
        try {
            await conn.query(`
                ALTER TABLE questoes 
                ADD COLUMN pergunta TEXT AFTER enunciado
            `);
            console.log('  ✓ Coluna pergunta adicionada');
        } catch (e) {
            if (e.code === 'ER_DUP_FIELDNAME') {
                console.log('  • Coluna pergunta já existe');
            } else {
                throw e;
            }
        }
        
        try {
            await conn.query(`
                ALTER TABLE questoes 
                ADD COLUMN opcoes_array JSON AFTER pergunta
            `);
            console.log('  ✓ Coluna opcoes_array adicionada');
        } catch (e) {
            if (e.code === 'ER_DUP_FIELDNAME') {
                console.log('  • Coluna opcoes_array já existe');
            } else {
                throw e;
            }
        }
        
        try {
            await conn.query(`
                ALTER TABLE questoes 
                ADD COLUMN resposta_correta INT AFTER opcoes_array
            `);
            console.log('  ✓ Coluna resposta_correta adicionada');
        } catch (e) {
            if (e.code === 'ER_DUP_FIELDNAME') {
                console.log('  • Coluna resposta_correta já existe');
            } else {
                throw e;
            }
        }
        
        console.log('\n2. Preenchendo dados de pergunta a partir de enunciado...');
        const [result] = await conn.query(`
            UPDATE questoes 
            SET pergunta = enunciado 
            WHERE (pergunta IS NULL OR pergunta = '')
        `);
        console.log(`  ✓ ${result.affectedRows} linhas atualizadas`);
        
        console.log('\n3. Estrutura atual da tabela questoes:');
        const [columns] = await conn.query('DESCRIBE questoes');
        columns.forEach(col => {
            console.log(`  • ${col.Field} (${col.Type})`);
        });
        
        console.log('\n4. Amostra de questões no banco:');
        const [sample] = await conn.query('SELECT id, pergunta, categoria FROM questoes LIMIT 3');
        sample.forEach((q, i) => {
            console.log(`  ${i+1}. ID: ${q.id} | ${q.pergunta.substring(0, 50)}... | ${q.categoria}`);
        });
        
        console.log('\n✅ Estrutura da tabela questoes atualizada com sucesso!');
        
    } catch (err) {
        console.error('❌ Erro:', err.message);
    } finally {
        conn.release();
        pool.end();
    }
})();
