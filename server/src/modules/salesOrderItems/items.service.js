import { pool } from "../../db/index.js";

export const getOrderItems = async () => {
  const [rows] = await pool.query(`
    SELECT 
      soi.sale_item_id,
      so.sale_id,
      p.name AS product,
      soi.quantity_sold
    FROM SalesOrderItems soi
    JOIN SalesOrders so ON soi.sale_id = so.sale_id
    JOIN Products p ON soi.product_id = p.product_id
  `);

  return rows;
};

export const createOrderItem = async (
  sale_id,
  product_id,
  quantity_sold
) => {
  const [result] = await pool.query(
    `INSERT INTO SalesOrderItems 
    (sale_id, product_id, quantity_sold)
    VALUES (?, ?, ?)`,
    [sale_id, product_id, quantity_sold]
  );

  return result;
};

export const deleteOrderItem = async (id) => {
  await pool.query(
    "DELETE FROM SalesOrderItems WHERE sale_item_id = ?",
    [id]
  );
};

export const updateOrderItem = async (id, sale_id, product_id, quantity_sold) => {
  const [result] = await pool.query(
    "UPDATE SalesOrderItems SET sale_id = ?, product_id = ?, quantity_sold = ? WHERE sale_item_id = ?",
    [sale_id, product_id, quantity_sold, id]
  );

  return result;
};