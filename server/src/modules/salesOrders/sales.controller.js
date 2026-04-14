import * as salesService from "./sales.service.js";

export const getSalesOrders = async (req, res) => {
  try {
    const sales = await salesService.getSalesOrders();
    res.json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const createSalesOrder = async (req, res) => {
  try {
    const { customer_person_id, sale_date } = req.body;

    await salesService.createSalesOrder(
      customer_person_id,
      sale_date
    );

    res.json({
      message: "Sales order created"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteSalesOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await salesService.deleteSalesOrder(id);

    res.json({
      message: "Sales order deleted"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateSalesOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { customer_person_id, sale_date } = req.body;
    if (customer_person_id == null || !sale_date) {
      return res.status(400).json({ error: "customer_person_id and sale_date are required" });
    }

    const result = await salesService.updateSalesOrder(
      id,
      customer_person_id,
      sale_date
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Sales order not found" });
    }

    res.json({
      message: "Sales order updated",
      affectedRows: result.affectedRows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};