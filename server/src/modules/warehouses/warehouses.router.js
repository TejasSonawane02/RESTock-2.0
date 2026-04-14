import express from 'express';
import {
  getWarehouses,
  createWarehouse,
  deleteWarehouse,
  updateWarehouse
} from "./warehouses.controller.js";

const router = express.Router();

router.get("/", getWarehouses);
router.post("/", createWarehouse);
router.delete("/:warehouse_id", deleteWarehouse);
router.put("/:warehouse_id", updateWarehouse);

export default router;          
