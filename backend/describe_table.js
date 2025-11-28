const table = process.argv[2];
if (!table) { console.error('Usage: node describe_table.js <table>'); process.exit(1); }
process.env.DB_HOST='localhost';
process.env.DB_PORT='3306';
process.env.DB_USER='root';
process.env.DB_PASSWORD='cnhlivre1234*';
process.env.DB_NAME='cnh_livre';
const db = require('./db');
(async () => {
  try {
    const [rows] = await db.pool.query(`DESCRIBE ${table}`);
    console.log(JSON.stringify(rows, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
