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