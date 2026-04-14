import express from "express";
import {
  getInventory,
  createInventory,
  deleteInventory
} from "./inventory.controller.js";

const router = express.Router();

router.get("/", getInventory);
router.post("/", createInventory);
router.delete("/:product_id/:warehouse_id", deleteInventory);

export default router;