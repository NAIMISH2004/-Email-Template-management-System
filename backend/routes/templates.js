import express from "express";

import {
  createTemplate,
  getTemplates,
  getTemplate,
  updateTemplate,
  deleteTemplate,
  renderTemplate
} from "../controller/templateController.js";

const router = express.Router();

router.post("/", createTemplate);
router.get("/", getTemplates);
router.get("/:id", getTemplate);
router.put("/:id", updateTemplate);
router.delete("/:id", deleteTemplate);

router.post("/:id/render", renderTemplate);

export default router;
