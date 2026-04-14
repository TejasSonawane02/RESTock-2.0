import express from 'express';
import {
  getWarehouses,
  createWarehouse,
  deleteWarehouse
} from "./warehouses.controller.js";

const router = express.Router();

router.get("/", getWarehouses);
router.post("/", createWarehouse);
router.delete("/:warehouse_id", deleteWarehouse);

export default router;          
