import * as inventoryService from "./inventory.service.js";

export const getInventory = async (req, res) => {
  try {
    const inventory = await inventoryService.getInventory();
    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const createInventory = async (req, res) => {
  try {
    const {
      product_id,
      warehouse_id,
      quantity,
      stock_value,
      total_cost
    } = req.body;

    await inventoryService.createInventory(
      product_id,
      warehouse_id,
      quantity,
      stock_value,
      total_cost
    );

    res.json({
      message: "Inventory created successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteInventory = async (req, res) => {
  try {
    const { product_id, warehouse_id } = req.params;

    await inventoryService.deleteInventory(
      product_id,
      warehouse_id
    );

    res.json({
      message: "Inventory deleted"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};