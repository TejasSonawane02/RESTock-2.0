import { pool } from "../../db/index.js";

export const getStockMovements = async () => {
  const [rows] = await pool.query(`
    SELECT 
      sm.movement_id,
      p.name AS product,
      w.location_name AS warehouse,
      sm.stock_in_qty,
      sm.stock_out_qty,
      sm.movement_date
    FROM StockMovements sm
    JOIN Products p ON sm.product_id = p.product_id
    JOIN Warehouses w ON sm.warehouse_id = w.warehouse_id
  `);

  return rows;
};

export const createStockMovement = async (
  product_id,
  warehouse_id,
  stock_in_qty,
  stock_out_qty,
  movement_date
) => {
  const [result] = await pool.query(
    `INSERT INTO StockMovements
    (product_id, warehouse_id, stock_in_qty, stock_out_qty, movement_date)
    VALUES (?, ?, ?, ?, ?)`,
    [product_id, warehouse_id, stock_in_qty, stock_out_qty, movement_date]
  );

  return result;
};

export const deleteStockMovement = async (id) => {
  await pool.query(
    "DELETE FROM StockMovements WHERE movement_id = ?",
    [id]
  );
};

export const updateStockMovement = async (
  id,
  product_id,
  warehouse_id,
  stock_in_qty,
  stock_out_qty,
  movement_date
) => {
  const [result] = await pool.query(
    `UPDATE StockMovements
     SET product_id = ?, warehouse_id = ?, stock_in_qty = ?, stock_out_qty = ?, movement_date = ?
     WHERE movement_id = ?`,
    [product_id, warehouse_id, stock_in_qty, stock_out_qty, movement_date, id]
  );

  return result;
};