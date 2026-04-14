import express from "express";
import {
  getRoles,
  createRole,
  deleteRole
} from "./roles.controller.js";

const router = express.Router();

router.get("/", getRoles);
router.post("/", createRole);
router.delete("/:role_id", deleteRole);

export default router;