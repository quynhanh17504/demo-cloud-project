const { pool } = require("../config/db");

async function findAll() {
  const result = await pool.query(
    "SELECT id, name, description, price, created_at FROM foods ORDER BY id ASC"
  );

  return result.rows;
}

async function findById(id) {
  const result = await pool.query(
    "SELECT id, name, description, price, created_at FROM foods WHERE id = $1",
    [id]
  );

  return result.rows[0] || null;
}

async function create({ name, description, price }) {
  const result = await pool.query(
    `
      INSERT INTO foods (name, description, price)
      VALUES ($1, $2, $3)
      RETURNING id, name, description, price, created_at
    `,
    [name, description, price]
  );

  return result.rows[0];
}

async function update(id, { name, description, price }) {
  const result = await pool.query(
    `
      UPDATE foods
      SET name = $1, description = $2, price = $3
      WHERE id = $4
      RETURNING id, name, description, price, created_at
    `,
    [name, description, price, id]
  );

  return result.rows[0] || null;
}

async function remove(id) {
  const result = await pool.query(
    "DELETE FROM foods WHERE id = $1 RETURNING id",
    [id]
  );

  return result.rows[0] || null;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};
