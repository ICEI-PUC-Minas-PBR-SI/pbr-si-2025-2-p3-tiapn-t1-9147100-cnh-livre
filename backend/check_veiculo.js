const mysql = require('mysql2/promise');
require('dotenv').config();

(async () => {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  console.log('=== Todas as tabelas do banco ===');
  const [tables] = await conn.query('SHOW TABLES');
  console.log(tables.map(t => Object.values(t)[0]));

  console.log('\n=== Estrutura da tabela aulas (para ver se há veiculo_id) ===');
  const [aulasDesc] = await conn.query('DESCRIBE aulas');
  console.log('Colunas de aulas:', aulasDesc.map(c => c.Field));

  console.log('\n=== Estrutura da tabela veiculos ===');
  const [veicDesc] = await conn.query('DESCRIBE veiculos');
  console.log(veicDesc);

  console.log('\n=== Primeiros veículos (se existirem) ===');
  const [veicRows] = await conn.query('SELECT * FROM veiculos LIMIT 5');
  console.log(veicRows);

  console.log('\n=== Contagem de instrutores e veículos ===');
  const [count1] = await conn.query('SELECT COUNT(*) as total FROM instrutores');
  const [count2] = await conn.query('SELECT COUNT(*) as total FROM veiculos');
  console.log('Instrutores:', count1[0].total);
  console.log('Veículos:', count2[0].total);

  await conn.end();
})();
