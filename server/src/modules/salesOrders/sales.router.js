import express from "express";
import {
  getSalesOrders,
  createSalesOrder,
  deleteSalesOrder
} from "./sales.controller.js";

const router = express.Router();

router.get("/", getSalesOrders);
router.post("/", createSalesOrder);
router.delete("/:id", deleteSalesOrder);

export default router;