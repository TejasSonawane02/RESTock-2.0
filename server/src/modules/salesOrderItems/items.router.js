import express from "express";
import {
  getOrderItems,
  createOrderItem,
  deleteOrderItem,
  updateOrderItem
} from "./items.controller.js";

const router = express.Router();

router.get("/", getOrderItems);
router.post("/", createOrderItem);
router.delete("/:id", deleteOrderItem);
router.put("/:id", updateOrderItem);

export default router;