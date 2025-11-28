const mysql = require('mysql2/promise');

(async () => {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'cnhlivre1234*',
        database: 'cnh_livre'
    });

    const conn = await pool.getConnection();

    console.log('=== ÚLTIMOS INSTRUTORES EM USUARIOS ===');
    const [instrutores] = await conn.query("SELECT id, nome_completo, email, tipo FROM usuarios WHERE tipo='instrutor' ORDER BY id DESC LIMIT 5");
    console.log(JSON.stringify(instrutores, null, 2));

    console.log('\n=== ÚLTIMOS REGISTROS NA TABELA INSTRUTORES ===');
    const [instrutoresTab] = await conn.query('SELECT usuario_id FROM instrutores ORDER BY id DESC LIMIT 5');
    console.log(JSON.stringify(instrutoresTab, null, 2));

    console.log('\n=== INSTRUTORES EM USUARIOS QUE NÃO ESTÃO EM INSTRUTORES ===');
    const [faltando] = await conn.query(`
        SELECT u.id, u.nome_completo, u.email 
        FROM usuarios u 
        WHERE u.tipo='instrutor' 
        AND u.id NOT IN (SELECT usuario_id FROM instrutores)
    `);
    console.log(JSON.stringify(faltando, null, 2));

    conn.release();
    pool.end();
})();
