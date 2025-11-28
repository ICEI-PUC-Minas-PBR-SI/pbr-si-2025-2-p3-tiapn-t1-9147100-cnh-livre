const email = process.argv[2];
if (!email) {
  console.error('Usage: node query_user.js <email>');
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
