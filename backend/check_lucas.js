const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkLucas() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    console.log('=== Verificando Usuario ID 35 ===');
    const [usuarios] = await connection.query('SELECT * FROM usuarios WHERE id = 35');
    console.log('Usuarios:', usuarios);

    console.log('\n=== Verificando Aluno com usuario_id 35 ===');
    const [alunos] = await connection.query('SELECT * FROM alunos WHERE usuario_id = 35');
    console.log('Alunos:', alunos);

    if (alunos.length > 0) {
        const aluno_id = alunos[0].id;
        console.log(`\n=== Verificando Aulas para aluno_id ${aluno_id} ===`);
        const [aulas] = await connection.query('SELECT * FROM aulas WHERE aluno_id = ?', [aluno_id]);
        console.log('Aulas:', aulas);
    }

    await connection.end();
}

checkLucas().catch(console.error);
