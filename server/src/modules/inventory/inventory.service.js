import { pool } from "../../db/index.js";

export const getInventory = async () => {
  const [rows] = await pool.query(`
    SELECT 
      p.name AS product,
      w.location_name AS warehouse,
      i.quantity,
      i.stock_value,
      i.total_cost
    FROM Inventory i
    JOIN Products p ON i.product_id = p.product_id
    JOIN Warehouses w ON i.warehouse_id = w.warehouse_id
  `);

  return rows;
};

export const createInventory = async (
  product_id,
  warehouse_id,
  quantity,
  stock_value,
  total_cost
) => {
  const [result] = await pool.query(
    `INSERT INTO Inventory 
    (product_id, warehouse_id, quantity, stock_value, total_cost)
    VALUES (?, ?, ?, ?, ?)`,
    [product_id, warehouse_id, quantity, stock_value, total_cost]
  );

  return result;
};

export const deleteInventory = async (product_id, warehouse_id) => {
  await pool.query(
    `DELETE FROM Inventory 
     WHERE product_id = ? AND warehouse_id = ?`,
    [product_id, warehouse_id]
  );
};