import express from "express";
import {
  getInventory,
  createInventory,
  deleteInventory,
  updateInventory
} from "./inventory.controller.js";

const router = express.Router();

router.get("/", getInventory);
router.post("/", createInventory);
router.delete("/:product_id/:warehouse_id", deleteInventory);
router.put("/:product_id/:warehouse_id", updateInventory);

export default router;