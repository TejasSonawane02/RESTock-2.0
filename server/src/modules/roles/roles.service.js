import { pool } from "../../db/index.js";

// Refer to the SQL schema for the structure of the roles table
/*
CREATE TABLE Roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL UNIQUE
);
*/

/*This module is important because:

Later:

Staff will use Roles
Auth system will use Roles
Permissions will depend on Roles

So this is foundation for authentication.
*/

export const getRoles = async () => {
  const [rows] = await pool.query("SELECT * FROM Roles");
  return rows;
};

export const createRole = async (role_name) => {
    const [result] = await pool.query(
        "INSERT INTO Roles (role_name) VALUES (?)",
        [role_name]
    );
    return result;
};

export const deleteRole = async (role_id) => {
    const [result] = await pool.query(
        "DELETE FROM Roles WHERE role_id = ?",
        [role_id]
    );
    return result;
};

export const updateRole = async (role_id, role_name) => {
    const [result] = await pool.query(
        "UPDATE Roles SET role_name = ? WHERE role_id = ?",
        [role_name, role_id]
    );
    return result;
};