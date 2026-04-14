import express from "express";
import {
  getStaff,
  createStaff,
  deleteStaff
} from "./staff.controller.js";

const router = express.Router();

router.get("/", getStaff);
router.post("/", createStaff);
router.delete("/:id", deleteStaff);

export default router;