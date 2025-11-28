const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'cnh_user',
  password: process.env.DB_PASSWORD || 'cnh_password',
  database: process.env.DB_NAME || 'cnh_livre',
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONN_LIMIT, 10) || 10,
  queueLimit: 0
});

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    return true;
  } catch (err) {
    console.error('Erro no teste de conexão ao banco:', err.message);
    return false;
  }
}

module.exports = {
  pool,
  testConnection
};
