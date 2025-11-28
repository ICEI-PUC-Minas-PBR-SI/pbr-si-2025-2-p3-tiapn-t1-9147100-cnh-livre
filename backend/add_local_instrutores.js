// Script: adiciona coluna `local` em instrutores (se não existir) e popula com valores de exemplo
// Uso: node add_local_instrutores.js

process.env.DB_HOST = process.env.DB_HOST || 'localhost';
process.env.DB_PORT = process.env.DB_PORT || '3306';
process.env.DB_USER = process.env.DB_USER || 'root';
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 'cnhlivre1234*';
process.env.DB_NAME = process.env.DB_NAME || 'cnh_livre';

const db = require('./db');
(async () => {
  const exemploCidades = [
    'Belo Horizonte, MG', 'Contagem, MG', 'Betim, MG', 'São Paulo, SP', 'Rio de Janeiro, RJ',
    'Juiz de Fora, MG', 'Campinas, SP', 'Salvador, BA', 'Brasília, DF', 'Curitiba, PR',
    'Belém, PA', 'Porto Alegre, RS', 'Recife, PE', 'Manaus, AM', 'Fortaleza, CE',
    'São Luís, MA', 'Aracaju, SE', 'Goiânia, GO', 'Natal, RN', 'Cuiabá, MT'
  ];

  try {
    console.log('Verificando/alterando tabela `instrutores`...');
    // Adiciona coluna `local` se não existir - verificar por information_schema
    const [cols] = await db.pool.query(
      `SELECT COUNT(*) as cnt FROM information_schema.columns WHERE table_schema = ? AND table_name = 'instrutores' AND column_name = 'local'`,
      [process.env.DB_NAME]
    );
    if (cols[0].cnt === 0) {
      await db.pool.query(`ALTER TABLE instrutores ADD COLUMN local VARCHAR(100) NULL`);
      console.log('Coluna `local` criada.');
    } else {
      console.log('Coluna `local` já existe.');
    }

    // Buscar instrutores existentes
    const [rows] = await db.pool.query('SELECT id, usuario_id FROM instrutores ORDER BY id');
    if (!rows || rows.length === 0) {
      console.log('Nenhum instrutor encontrado na tabela. Nada a popular.');
      process.exit(0);
    }

    console.log(`Encontrados ${rows.length} instrutores. Populando campo local com valores de exemplo...`);
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const cidade = exemploCidades[i % exemploCidades.length];
      await db.pool.query('UPDATE instrutores SET local = ? WHERE id = ?', [cidade, r.id]);
      console.log(`Instrutor id=${r.id} usuario_id=${r.usuario_id} -> local='${cidade}'`);
    }

    console.log('População concluída.');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao adicionar/popular coluna local:', err.message || err);
    process.exit(1);
  }
})();
