import * as itemService from "./items.service.js";

export const getOrderItems = async (req, res) => {
  try {
    const items = await itemService.getOrderItems();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const createOrderItem = async (req, res) => {
  try {
    const { sale_id, product_id, quantity_sold } = req.body;

    await itemService.createOrderItem(
      sale_id,
      product_id,
      quantity_sold
    );

    res.json({
      message: "Order item added"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;

    await itemService.deleteOrderItem(id);

    res.json({
      message: "Order item deleted"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { sale_id, product_id, quantity_sold } = req.body;
    if (sale_id == null || product_id == null || quantity_sold == null) {
      return res.status(400).json({ error: "sale_id, product_id, and quantity_sold are required" });
    }

    const result = await itemService.updateOrderItem(
      id,
      sale_id,
      product_id,
      quantity_sold
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order item not found" });
    }

    res.json({
      message: "Order item updated",
      affectedRows: result.affectedRows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};