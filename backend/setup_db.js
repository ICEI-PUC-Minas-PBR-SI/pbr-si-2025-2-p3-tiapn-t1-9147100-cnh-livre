const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
  const sqlPath = path.join(__dirname, 'init_db.sql');
  if (!fs.existsSync(sqlPath)) {
    console.error('Arquivo init_db.sql não encontrado em backend/');
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, 'utf8');

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
  });

  try {
    console.log('Executando script SQL...');
    await connection.query(sql);
    console.log('Banco e tabelas criados/atualizados com sucesso.');
  } catch (err) {
    console.error('Erro ao executar SQL:', err.message);
    process.exitCode = 1;
  } finally {
    await connection.end();
  }
}

run().catch(err => {
  console.error('Erro inesperado:', err);
  process.exit(1);
});
