import express from "express";
import {
  getCustomers,
  createCustomer,
  deleteCustomer
} from "./customer.controller.js";

const router = express.Router();

router.get("/", getCustomers);
router.post("/", createCustomer);
router.delete("/:id", deleteCustomer);

export default router;