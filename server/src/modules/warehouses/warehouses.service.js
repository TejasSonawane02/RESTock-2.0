import { pool } from "../../db/index.js";

/**
 CREATE TABLE Warehouses (
    warehouse_id SERIAL PRIMARY KEY,
    location_name VARCHAR(255) NOT NULL,
    -- Composite address fields split into individual columns
    address_city VARCHAR(100) NOT NULL,
    address_pincode VARCHAR(20)
);
 */
//Refer to the above SQL schema for the structure of the warehouses table

export const getWarehouses = async () => {
  const [rows] = await pool.query("SELECT * FROM Warehouses");
  return rows;
};

export const createWarehouse = async (
  location_name,
  address_city,
  address_pincode
) => {
  const [result] = await pool.query(
    "INSERT INTO Warehouses (location_name, address_city, address_pincode) VALUES (?, ?, ?)",
    [location_name, address_city, address_pincode]
  );
  return result;
};

export const deleteWarehouse = async (warehouse_id) => {
  const [result] = await pool.query(
    "DELETE FROM Warehouses WHERE warehouse_id = ?",
    [warehouse_id]
  );
  return result;
}