import express from 'express';
import { getSuppliers, createSupplier, deleteSupplier } from './suppliers.controller.js';

const router = express.Router();

router.get("/", getSuppliers);
router.post("/", createSupplier);
router.delete("/:id", deleteSupplier);

export default router;