import * as stockService from "./stock.service.js";

export const getStockMovements = async (req, res) => {
  try {
    const stock = await stockService.getStockMovements();
    res.json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const createStockMovement = async (req, res) => {
  try {
    const {
      product_id,
      warehouse_id,
      stock_in_qty,
      stock_out_qty,
      movement_date
    } = req.body;

    await stockService.createStockMovement(
      product_id,
      warehouse_id,
      stock_in_qty,
      stock_out_qty,
      movement_date
    );

    res.json({
      message: "Stock movement recorded"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteStockMovement = async (req, res) => {
  try {
    const { id } = req.params;

    await stockService.deleteStockMovement(id);

    res.json({
      message: "Stock movement deleted"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateStockMovement = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      product_id,
      warehouse_id,
      stock_in_qty,
      stock_out_qty,
      movement_date
    } = req.body;
    if (product_id == null || warehouse_id == null || stock_in_qty == null || stock_out_qty == null || !movement_date) {
      return res.status(400).json({ error: "product_id, warehouse_id, stock_in_qty, stock_out_qty, and movement_date are required" });
    }

    const result = await stockService.updateStockMovement(
      id,
      product_id,
      warehouse_id,
      stock_in_qty,
      stock_out_qty,
      movement_date
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Stock movement not found" });
    }

    res.json({
      message: "Stock movement updated",
      affectedRows: result.affectedRows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};