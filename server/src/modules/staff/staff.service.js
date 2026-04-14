/*
Staff depends on:
Person
Roles

So Staff will:
Reference person_id
Reference role_id
*/
//Below is the sql schema for the staff table, which includes foreign keys to the person and roles tables.
/*
CREATE TABLE Staff (
    person_id BIGINT UNSIGNED PRIMARY KEY, 
    role_id BIGINT UNSIGNED NOT NULL, -- CHANGED from INT to BIGINT UNSIGNED to match Roles.role_id
    hire_date DATE NOT NULL,
    
    -- When a Person is deleted, their Staff record should also be deleted (Cascade)
    FOREIGN KEY (person_id) REFERENCES Person(person_id) ON DELETE CASCADE,
    
    -- Staff must be assigned a role
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);
*/
//we will reference this table in the staff service and controller to manage staff members, including their roles and associated person details.

import { pool } from "../../db/index.js";

export const getStaff = async () => {
  const [rows] = await pool.query(`
    SELECT 
      s.person_id,
      p.first_name,
      p.last_name,
      r.role_name,
      s.hire_date
    FROM Staff s
    JOIN Person p ON s.person_id = p.person_id
    JOIN Roles r ON s.role_id = r.role_id
  `);

  return rows;
};

export const createStaff = async (
  person_id,
  role_id,
  hire_date
) => {
  const [result] = await pool.query(
    "INSERT INTO Staff (person_id, role_id, hire_date) VALUES (?, ?, ?)",
    [person_id, role_id, hire_date]
  );

  return result;
};

export const deleteStaff = async (id) => {
  await pool.query(
    "DELETE FROM Staff WHERE person_id = ?",
    [id]
  );
};
