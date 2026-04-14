import { pool } from "../../db/index.js";

export const getCustomers = async () => {
  const [rows] = await pool.query(`
    SELECT 
      c.person_id,
      p.first_name,
      p.last_name,
      p.email,
      c.join_date
    FROM Customer c
    JOIN Person p ON c.person_id = p.person_id
  `);

  return rows;
};

export const createCustomer = async (
  person_id,
  join_date
) => {
  const [result] = await pool.query(
    "INSERT INTO Customer (person_id, join_date) VALUES (?, ?)",
    [person_id, join_date]
  );

  return result;
};

export const deleteCustomer = async (id) => {
  await pool.query(
    "DELETE FROM Customer WHERE person_id = ?",
    [id]
  );
};