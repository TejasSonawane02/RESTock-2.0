import express from "express";
import {
  getOrderItems,
  createOrderItem,
  deleteOrderItem
} from "./items.controller.js";

const router = express.Router();

router.get("/", getOrderItems);
router.post("/", createOrderItem);
router.delete("/:id", deleteOrderItem);

export default router;