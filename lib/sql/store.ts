import pool from "../db.js";


export async function createStore(data) {
  const { id, name, ownerId } = data;
  const [result]: any = await pool.query(
  "INSERT INTO stores (id, name, ownerId) VALUES (?, ?, ?)",
  [id, name, ownerId]
);
return result.insertId;

}

export async function getStoreByOwner(ownerId) {
  const [rows] = await pool.query(
    `SELECT * FROM store WHERE ownerId = ?`,
    [ownerId]
  );
  return rows;
}
