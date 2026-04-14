import { pool } from "../../db/index.js";

export const getSuppliers = async () => {
    const [rows] = await pool.query("SELECT * FROM Suppliers");
    return rows;
};

export const createSupplier = async (company_name, contact_person) => {
    const [result] = await pool.query(
        "INSERT INTO Suppliers (company_name, contact_person) VALUES (?, ?)",
        [company_name, contact_person]
    );
    return result;
};

export const deleteSupplier = async (id) => {
    await pool.query(
        "DELETE FROM Suppliers WHERE supplier_id = ?",
        [id]
    );
};

export const updateSupplier = async (id, company_name, contact_person) => {
    const [result] = await pool.query(
        "UPDATE Suppliers SET company_name = ?, contact_person = ? WHERE supplier_id = ?",
        [company_name, contact_person, id]
    );
    return result;
};

