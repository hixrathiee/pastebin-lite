import express from "express";
import { createPaste, getPaste, healthCheck } from "../controller/pasteController.js";

const pasteRouter = express.Router();

pasteRouter.get("/healthz", healthCheck);

pasteRouter.post("/pastes",createPaste);
pasteRouter.get("/pastes/:id",getPaste);

export default pasteRouter;