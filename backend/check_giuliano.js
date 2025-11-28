const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkGiuliano() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    console.log('=== Usuario Giuliano (ID 38) ===');
    const [usuario] = await connection.query('SELECT * FROM usuarios WHERE id = 38');
    console.log(usuario);

    console.log('\n=== Procurando Giuliano na tabela instrutores ===');
    const [instrutorByUser] = await connection.query('SELECT * FROM instrutores WHERE usuario_id = 38');
    console.log('Por usuario_id 38:', instrutorByUser);

    console.log('\n=== Instrutor ID 38 ===');
    const [instrutorById] = await connection.query('SELECT * FROM instrutores WHERE id = 38');
    console.log('Por id 38:', instrutorById);
    
    if (instrutorById.length > 0) {
        const real_usuario_id = instrutorById[0].usuario_id;
        console.log(`\n=== Usuario do instrutor_id 38 (usuario_id ${real_usuario_id}) ===`);
        const [realUsuario] = await connection.query('SELECT * FROM usuarios WHERE id = ?', [real_usuario_id]);
        console.log(realUsuario);
    }

    await connection.end();
}

checkGiuliano().catch(console.error);
