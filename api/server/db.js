const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Postgres Connected:', res.rows);
  } catch (err) {
    console.error('DB Error:', err);
  }
})();

module.exports = { pool };
