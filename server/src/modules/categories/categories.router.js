import express from 'express';

import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory
} from "./categories.controller.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);

export default router;