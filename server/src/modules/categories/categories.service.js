import { pool } from "../../db/index.js";

export const getCategories = async () => {
  const [rows] = await pool.query("SELECT * FROM Categories");
  return rows;
};

export const createCategory = async (name, description) => {
  const [result] = await pool.query(
    "INSERT INTO Categories (name, description) VALUES (?, ?)",
    [name, description]
  );

  return result;
};

export const deleteCategory = async (id) => {
  await pool.query(
    "DELETE FROM Categories WHERE category_id = ?",
    [id]
  );
};

export const updateCategory = async (id, name, description) => {
  const [result] = await pool.query(
    "UPDATE Categories SET name = ?, description = ? WHERE category_id = ?",
    [name, description, id]
  );

  return result;
};