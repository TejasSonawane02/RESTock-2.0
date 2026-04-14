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