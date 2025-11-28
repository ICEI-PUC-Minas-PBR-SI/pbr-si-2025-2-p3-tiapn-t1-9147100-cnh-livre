process.env.DB_HOST='localhost';
process.env.DB_PORT='3306';
process.env.DB_USER='root';
process.env.DB_PASSWORD='cnhlivre1234*';
process.env.DB_NAME='cnh_livre';
const db = require('./db');
(async ()=>{
  try{
    const local = null;
    const categoria = 'B';
    const ordem = 'avaliacao';
    let sql = 'SELECT * FROM instrutores WHERE 1=1';
    const params = [];
    if(local){ sql += ' AND local LIKE ?'; params.push(`%${local}%`); }
    if(categoria){ sql += ' AND JSON_CONTAINS(categorias_ensina, ?)'; params.push(`"${categoria}"`); }
    if(ordem==='avaliacao'){ sql += ' ORDER BY avaliacao_media DESC'; } else if(ordem==='preco'){ sql += ' ORDER BY preco_aula ASC'; }
    console.log('SQL:', sql, 'params:', params);
    const [rows] = await db.pool.query(sql, params);
    console.log('ROWS:', rows.length);
    console.log(rows[0]);
    process.exit(0);
  }catch(e){ console.error('ERR', e); process.exit(1);} 
})();
