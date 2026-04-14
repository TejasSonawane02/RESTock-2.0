import express from "express";
import {
  getRoles,
  createRole,
  deleteRole,
  updateRole
} from "./roles.controller.js";

const router = express.Router();

router.get("/", getRoles);
router.post("/", createRole);
router.delete("/:role_id", deleteRole);
router.put("/:role_id", updateRole);

export default router;