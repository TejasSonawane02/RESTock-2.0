import express from "express";
import {
  getStockMovements,
  createStockMovement,
  deleteStockMovement,
  updateStockMovement
} from "./stock.controller.js";

const router = express.Router();

router.get("/", getStockMovements);
router.post("/", createStockMovement);
router.delete("/:id", deleteStockMovement);
router.put("/:id", updateStockMovement);

export default router;