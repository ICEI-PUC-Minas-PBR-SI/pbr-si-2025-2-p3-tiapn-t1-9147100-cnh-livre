const mysql = require('mysql2/promise');
require('dotenv').config();
(async () => {
  const conn = await mysql.createConnection({host: process.env.DB_HOST||'localhost', user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME});
  const [rows1] = await conn.query('SELECT i.id, i.usuario_id FROM instrutores i WHERE i.id = ?', [21]);
  console.log('instrutores by id=21:', rows1);
  const [rows2] = await conn.query('SELECT i.id, i.usuario_id FROM instrutores i WHERE i.usuario_id = ?', [21]);
  console.log('instrutores by usuario_id=21:', rows2);
  await conn.end();
})();