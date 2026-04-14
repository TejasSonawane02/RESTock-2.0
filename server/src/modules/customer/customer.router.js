import express from "express";
import {
  getCustomers,
  createCustomer,
  deleteCustomer,
  updateCustomer
} from "./customer.controller.js";

const router = express.Router();

router.get("/", getCustomers);
router.post("/", createCustomer);
router.delete("/:id", deleteCustomer);
router.put("/:id", updateCustomer);

export default router;