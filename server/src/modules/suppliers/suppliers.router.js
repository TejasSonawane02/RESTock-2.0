import express from 'express';
import { getSuppliers, createSupplier, deleteSupplier, updateSupplier } from './suppliers.controller.js';

const router = express.Router();

router.get("/", getSuppliers);
router.post("/", createSupplier);
router.delete("/:id", deleteSupplier);
router.put("/:id", updateSupplier);

export default router;