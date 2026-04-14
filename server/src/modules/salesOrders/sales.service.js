import { pool } from "../../db/index.js";

export const getSalesOrders = async () => {
  const [rows] = await pool.query(`
    SELECT 
      so.sale_id,
      p.first_name,
      p.last_name,
      so.sale_date
    FROM SalesOrders so
    JOIN Customer c ON so.customer_person_id = c.person_id
    JOIN Person p ON c.person_id = p.person_id
  `);

  return rows;
};

export const createSalesOrder = async (
  customer_person_id,
  sale_date
) => {
  const [result] = await pool.query(
    `INSERT INTO SalesOrders 
    (customer_person_id, sale_date)
    VALUES (?, ?)`,
    [customer_person_id, sale_date]
  );

  return result;
};

export const deleteSalesOrder = async (id) => {
  await pool.query(
    "DELETE FROM SalesOrders WHERE sale_id = ?",
    [id]
  );
};