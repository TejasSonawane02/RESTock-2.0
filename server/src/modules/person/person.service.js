import { pool } from "../../db/index.js";

// Refer to the SQL schema for the structure of the person table
/*
CREATE TABLE Person (
    person_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE
);
Customer depends on Person
Staff depends on Person

So this is foundation table.
*/

export const getPersons = async () => {
    const [rows] = await pool.query("SELECT * FROM Person");
    return rows;
};

export const createPerson = async (first_name, last_name, email) => {
    const [result] = await pool.query(
        "INSERT INTO Person (first_name, last_name, email) VALUES (?, ?, ?)",
        [first_name, last_name, email]
    );
    return result;
};

export const deletePerson = async (person_id) => {
    const [result] = await pool.query(
        "DELETE FROM Person WHERE person_id = ?",
        [person_id]
    );
    return result;
};