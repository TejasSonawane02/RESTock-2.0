import express from "express";
import {
  getStockMovements,
  createStockMovement,
  deleteStockMovement
} from "./stock.controller.js";

const router = express.Router();

router.get("/", getStockMovements);
router.post("/", createStockMovement);
router.delete("/:id", deleteStockMovement);

export default router;