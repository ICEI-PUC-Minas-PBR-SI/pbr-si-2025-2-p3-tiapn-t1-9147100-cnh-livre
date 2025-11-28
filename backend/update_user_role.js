// Temporary admin script to update a user's tipo
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '3306';
process.env.DB_USER = 'root';
process.env.DB_PASSWORD = 'cnhlivre1234*';
process.env.DB_NAME = 'cnh_livre';

const email = process.argv[2];
const newTipo = process.argv[3];
if (!email || !newTipo) {
  console.error('Usage: node update_user_role.js <email> <tipo>');
  process.exit(1);
}
const db = require('./db');
(async () => {
  try {
    const [res] = await db.pool.query('UPDATE usuarios SET tipo = ? WHERE email = ?', [newTipo, email]);
    console.log('affectedRows:', res.affectedRows, 'changedRows:', res.changedRows);
    const [rows] = await db.pool.query('SELECT id, email, tipo FROM usuarios WHERE email = ?', [email]);
    console.log(JSON.stringify(rows, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
