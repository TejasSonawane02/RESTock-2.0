import * as staffService from "./staff.service.js";

export const getStaff = async (req, res) => {
  try {
    const staff = await staffService.getStaff();
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const createStaff = async (req, res) => {
  try {
    const { person_id, role_id, hire_date } = req.body;

    await staffService.createStaff(
      person_id,
      role_id,
      hire_date
    );

    res.json({
      message: "Staff created successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    await staffService.deleteStaff(id);

    res.json({
      message: "Staff deleted"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_id, hire_date } = req.body;
    if (role_id == null || !hire_date) {
      return res.status(400).json({ error: "role_id and hire_date are required" });
    }

    const result = await staffService.updateStaff(
      id,
      role_id,
      hire_date
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json({
      message: "Staff updated",
      affectedRows: result.affectedRows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};