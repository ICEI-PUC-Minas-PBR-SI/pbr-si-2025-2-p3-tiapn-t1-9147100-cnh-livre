// Temporary script that forces DB credentials from environment values (root) for admin queries
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '3306';
process.env.DB_USER = 'root';
process.env.DB_PASSWORD = 'cnhlivre1234*';
process.env.DB_NAME = 'cnh_livre';

const email = process.argv[2];
if (!email) {
  console.error('Usage: node query_user_root.js <email>');
  process.exit(1);
}
const db = require('./db');
(async () => {
  try {
    const [rows] = await db.pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    console.log(JSON.stringify(rows, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
