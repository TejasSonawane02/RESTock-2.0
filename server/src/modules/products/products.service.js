import { pool } from "../../db/index.js";

export const getProducts = async () => {
  const [rows] = await pool.query(`
    SELECT 
      p.product_id,
      p.name,
      p.cost_price,
      p.sale_price,
      c.name AS category,
      s.company_name AS supplier
    FROM Products p
    JOIN Categories c ON p.category_id = c.category_id
    JOIN Suppliers s ON p.supplier_id = s.supplier_id
  `);

  return rows;
};

export const createProduct = async (
  category_id,
  supplier_id,
  name,
  cost_price,
  sale_price
) => {
  const [result] = await pool.query(
    `INSERT INTO Products 
    (category_id, supplier_id, name, cost_price, sale_price) 
    VALUES (?, ?, ?, ?, ?)`,
    [category_id, supplier_id, name, cost_price, sale_price]
  );

  return result;
};

export const deleteProduct = async (id) => {
  await pool.query(
    "DELETE FROM Products WHERE product_id = ?",
    [id]
  );
};