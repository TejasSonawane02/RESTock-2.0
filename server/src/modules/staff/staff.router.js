import express from "express";
import {
  getStaff,
  createStaff,
  deleteStaff,
  updateStaff
} from "./staff.controller.js";

const router = express.Router();

router.get("/", getStaff);
router.post("/", createStaff);
router.delete("/:id", deleteStaff);
router.put("/:id", updateStaff);

export default router;