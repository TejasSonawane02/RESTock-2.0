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