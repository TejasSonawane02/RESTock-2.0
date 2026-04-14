import express from "express";
import {
  getPersons,
  createPerson,
  deletePerson,
  updatePerson
} from "./person.controller.js";

const router = express.Router();

router.get("/", getPersons);
router.post("/", createPerson);
router.delete("/:person_id", deletePerson);
router.put("/:person_id", updatePerson);

export default router;