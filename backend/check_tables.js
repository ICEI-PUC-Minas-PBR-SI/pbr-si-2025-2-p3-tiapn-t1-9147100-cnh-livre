const mysql = require('mysql2/promise');

(async () => {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'cnhlivre1234*',
        database: 'cnh_livre'
    });

    const conn = await pool.getConnection();

    console.log('=== TABELA INSTRUTORES ===');
    const [instrutores] = await conn.query('DESCRIBE instrutores');
    instrutores.forEach(f => console.log(`${f.Field}: ${f.Type} (${f.Null === 'NO' ? 'NOT NULL' : 'NULL'})`));

    console.log('\n=== TABELA USUARIOS ===');
    const [usuarios] = await conn.query('DESCRIBE usuarios');
    usuarios.forEach(f => console.log(`${f.Field}: ${f.Type} (${f.Null === 'NO' ? 'NOT NULL' : 'NULL'})`));

    console.log('\n=== TABELA ALUNOS ===');
    const [alunos] = await conn.query('DESCRIBE alunos');
    alunos.forEach(f => console.log(`${f.Field}: ${f.Type} (${f.Null === 'NO' ? 'NOT NULL' : 'NULL'})`));

    console.log('\n=== AMOSTRA: Instrutores ===');
    const [instrutoresSample] = await conn.query('SELECT id, usuario_id, bio, preco_aula FROM instrutores LIMIT 3');
    console.log(JSON.stringify(instrutoresSample, null, 2));

    console.log('\n=== AMOSTRA: Usuarios tipo instrutor ===');
    const [usuariosInstrutor] = await conn.query("SELECT id, nome_completo, tipo, email FROM usuarios WHERE tipo='instrutor' LIMIT 3");
    console.log(JSON.stringify(usuariosInstrutor, null, 2));

    conn.release();
    pool.end();
})();
