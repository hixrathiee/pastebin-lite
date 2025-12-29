import express from "express";
import {viewPaste } from "../controller/pasteController.js";

const viewRouter = express.Router();

viewRouter.get("/p/:id",viewPaste); 

export default viewRouter;