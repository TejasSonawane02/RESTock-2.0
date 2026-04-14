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