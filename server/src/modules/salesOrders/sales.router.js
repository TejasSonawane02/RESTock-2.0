import express from "express";
import {
  getSalesOrders,
  createSalesOrder,
  deleteSalesOrder,
  updateSalesOrder
} from "./sales.controller.js";

const router = express.Router();

router.get("/", getSalesOrders);
router.post("/", createSalesOrder);
router.delete("/:id", deleteSalesOrder);
router.put("/:id", updateSalesOrder);

export default router;