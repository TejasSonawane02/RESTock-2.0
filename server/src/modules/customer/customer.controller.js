import * as customerService from "./customer.service.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await customerService.getCustomers();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const { person_id, join_date } = req.body;

    await customerService.createCustomer(
      person_id,
      join_date
    );

    res.json({
      message: "Customer created successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    await customerService.deleteCustomer(id);

    res.json({
      message: "Customer deleted"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { join_date } = req.body;
    if (!join_date) {
      return res.status(400).json({ error: "join_date is required" });
    }

    const result = await customerService.updateCustomer(
      id,
      join_date
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({
      message: "Customer updated",
      affectedRows: result.affectedRows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};