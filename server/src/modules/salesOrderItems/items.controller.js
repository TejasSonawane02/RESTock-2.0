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